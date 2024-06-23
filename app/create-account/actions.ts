"use server";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(3).max(10),
  email: z.string().email(),
  password: z.string().min(10),
  confirmPW: z.string().min(10),
});

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
