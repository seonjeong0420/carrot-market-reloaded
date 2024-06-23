"use server";
import { z } from "zod";

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
      .min(3, "way too short")
      .max(10, "that is to loong")
      .refine(checkUsername, "no tomato alllowed."),
    email: z.string().email(),
    password: z.string().min(10),
    confirmPW: z.string().min(10),
  })
  .refine(checkPassword, {
    message: "Both paswords should be the same.",
    path: ["confirmPW"],
  }); // object 안에 있는 데이터를 validation 체크하고 싶을 때 사용

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    paasword: formData.get("paasword"),
    confirmPW: formData.get("confirmPW"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }

  /**
   * .parse() = throw를 뱉어내므로 try & catch 문 안에 있어야 한다.
  try {
    formSchema.parse(data);
  } catch (e) {
    console.log(e);
  } */
}
