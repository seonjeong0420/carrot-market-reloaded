"use server";
import { z } from "zod";
import {
  PASSWORD_MIN_LENNGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constans";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

// username validation check
const checkUsername = (username: string) => {
  // return username.includes("tomato") ? false : true;
  return !username.includes("tomato");
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
      .refine(checkUsername, "no tomato alllowed."),
    email: z.string().email(),
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

  const result = formSchema.safeParse(data); // .parse 대신에 safeParse 사용 -> 데이터를 검증하는건 둘 다 동일하지만, validation에 관한 정보가 담긴 object 를 return 한다.
  if (!result.success) {
    return result.error.flatten(); // flatten() : 에러를 명확하게 object로 표현해준다.
  } else {
    console.log(result.data);
  }

  /**
   * .parse() = throw를 뱉어내므로 try & catch 문 안에 있어야 한다.
  try {
    formSchema.parse(data);
  } catch (e) {
    console.log(e);
  } */
}
