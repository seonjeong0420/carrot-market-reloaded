"use server";
import { z } from "zod";
import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LENNGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constans";
import db from "@/lib/db";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

// username validation check
const checkUsername = async (username: string) => {
  // return username.includes("tomato") ? false : true;
  return !username.includes("tomato");
};

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      // database에게 user 데이터를 찾지만, id 값만 전달해달라고 요청하는 것
      id: true,
    },
  });
  // if (user) {
  //   return false;
  // } else {
  //   return true;
  // }
  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const userEmail = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(userEmail) === false;
};

// password, confirmPW 같은지 check
const checkPassword = ({
  password,
  confirmPW,
}: {
  password: string;
  confirmPW: string;
}) => {
  return password === confirmPW;
};

/**username을 필수값이 아닌 값으로 변경하고 싶은 경우 optionaal을 사용하면 된다. 
  username: z.string().min(3).max(10).optional, */
const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "username must be a string.",
        required_error: "where is my username?",
      })
      .toLowerCase()
      .trim()
      .transform((username) => `🔥${username}🔥`) // transform은 무조건 return이 있어야 한다.
      .refine(checkUsername, "no tomato alllowed.")
      .refine(checkUniqueUsername, "This uername is already taken"),
    email: z
      .string()
      .email()
      .refine(
        checkUniqueEmail,
        "There is an account already registered with that email"
      ),
    password: z
      .string()
      .min(PASSWORD_MIN_LENNGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPW: z.string().min(PASSWORD_MIN_LENNGTH),
  })
  .refine(checkPassword, {
    message: "Both paswords should be the same.",
    path: ["confirmPW"],
  }); // object 안에 있는 데이터를 validation 체크하고 싶을 때 사용

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPW: formData.get("confirmPW"),
  };

  const result = await formSchema.safeParseAsync(data); // .parse 대신에 safeParse 사용 -> 데이터를 검증하는건 둘 다 동일하지만, validation에 관한 정보가 담긴 object 를 return 한다.
  if (!result.success) {
    return result.error.flatten(); // flatten() : 에러를 명확하게 object로 표현해준다.
  } else {
    // 1. check username, email -> zod에서 refine으로 정합성 check (checkUniqueUsername & checkUniqueEmail)
    // 2. hash password
    const hashedPasswrd = await bcrypt.hash(result.data.password, 12); // 12 : 알고리즘을 얼마나 실행할 지 결정하는 것

    // 3. save the user to db
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPasswrd,
      },
      select: {
        id: true,
      },
    });
    // 4. log the user in

    // 5. redirect /home
  }

  /**
   * .parse() = throw를 뱉어내므로 try & catch 문 안에 있어야 한다.
  try {
    formSchema.parse(data);
  } catch (e) {
    console.log(e);
  } */
}
