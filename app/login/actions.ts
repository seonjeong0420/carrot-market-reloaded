"use server";

import { z } from "zod";
import {
  PASSWORD_MIN_LENNGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constans";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

/**
 * login page는 클라이언트 컴포넌트이므로, 'use server' 사용이 불가능 하다.
 * 따라서 action.ts 파일을 새로 만들어주고 Server Action 함수를 이 파일에 정의해준다.
 */
export const login = async (prevData: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const checkEmailExists = async (email: string) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    return Boolean(user);
  };

  const loginFormSchema = z.object({
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(checkEmailExists, "An account with this email dost not exist"),
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

  const result = await loginFormSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // console.log(result.data);
    // 1. find user sith the email -> checkEmailExists (zod 활용)
    // 2. if the user is found, check password hash
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? ""); // Password가 null 이라면, 빈 값과 비교하겠다 라는 의미
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong Password"],
          email: [""],
        },
      };
    }

    // 3. log the user in
    // 4. redirect '/profile'
  }
  // return {
  //   errors: ["wrong password", "password is too short"],
  // };

  console.log(formData.get("email"), formData.get("password"));
  console.log("Logged IN!!");
};
