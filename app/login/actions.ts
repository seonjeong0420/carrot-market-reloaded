"use server";

import { z } from "zod";
import {
  PASSWORD_MIN_LENNGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "../lib/constans";

/**
 * login page는 클라이언트 컴포넌트이므로, 'use server' 사용이 불가능 하다.
 * 따라서 action.ts 파일을 새로 만들어주고 Server Action 함수를 이 파일에 정의해준다.
 */
export const login = async (prevData: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const loginFormSchema = z.object({
    email: z.string().email().toLowerCase(),
    password: z
      .string({
        required_error: "Password is Required",
      })
      .min(PASSWORD_MIN_LENNGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  });

  // await new Promise((resolve) => {
  //   setTimeout(resolve, 5000);
  // });
  // redirect("/"); -> 로그인 성공 이후 다른 페이지로 redirect 시키는 방법

  const result = loginFormSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
  // return {
  //   errors: ["wrong password", "password is too short"],
  // };

  console.log(formData.get("email"), formData.get("password"));
  console.log("Logged IN!!");
};
