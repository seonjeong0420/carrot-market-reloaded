"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

/**
 * TODO.
 * name='phone'을 먼저 유효성 검사한 후에
 * name='token'을 작성하는 UI 로직 제작
 *
 * coerce(=강제) : user가 입력한 string을 number로 변환을 시도
 */

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "Wrong phone format"
  ); //한국 전화번호만 받게 하고 싶은 경우
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
}

export const smsLogin = async (prevState: ActionState, formdata: FormData) => {
  const phone = formdata.get("phone");
  const token = formdata.get("token");

  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      return {
        token: true,
      };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      // token 정보가 맞는 경우 redirect 넘기기
      redirect("/");
    }
  }
  console.log(typeof tokenSchema.parse(formdata.get("token")));
};
