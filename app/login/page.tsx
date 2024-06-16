"use client";
import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { redirect } from "next/navigation";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { handleFormSubmit } from "./actions";

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

  /**
   * useFormState Hook
   * 결과를 앍로 싶은 action을 인자로 넘겨주어야 하고, 초기값을 설정해주어야 한다.
   * state : action의 return 값
   * dispatch : action을 실행시킨다. (현 예제에서는 handleFormSubmit을 실행시킨다.)
   */
  const [state, dispatch] = useFormState(handleFormSubmit, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl ">안녕하세요!</h1>
        <h2 className="text-xl">Login with eamil and password!</h2>
      </div>
      <form className="flex flex-col gap-3" action={dispatch}>
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
          errors={state?.errors ?? []}
        />
        <FormBtn text="Login" />
      </form>
      {/* <span onClick={onClickTestPost}>
        <FormBtn text="Login" isLoading={false} />
      </span> */}
      <SocialLogin />
    </div>
  );
};

export default Login;
