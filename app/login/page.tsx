import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import React from "react";

type Props = {};

const Login = (props: Props) => {
  /** 
   * // Server Action이 나오기 전에 사용하던 Route Handler 방식
  const onClickTestPost = async () => {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username: "nico",
        password: "1234",
      }),
    }); 

    console.log(await response.json());
  }; */

  const handleFormSubmit = async (formData: FormData) => {
    "use server"; // POST Action이 발생한다.
    console.log("I run in the server");
    console.log(formData.get("email"), formData.get("password"));
  };

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl ">안녕하세요!</h1>
        <h2 className="text-xl">Login with eamil and password!</h2>
      </div>
      <form className="flex flex-col gap-3" action={handleFormSubmit}>
        <FormInput
          type="email"
          name="email"
          isRequired
          placeholder="Email"
          errors={[""]}
        />
        <FormInput
          type="password"
          name="password"
          isRequired
          placeholder="Password"
          errors={[""]}
        />
        <FormBtn text="Login" isLoading={false} />
      </form>
      {/* <span onClick={onClickTestPost}>
        <FormBtn text="Login" isLoading={false} />
      </span> */}
      <SocialLogin />
    </div>
  );
};

export default Login;
