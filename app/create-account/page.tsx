"use client";
import React from "react";
import FormInput from "@/components/form-input";
import FormBtn from "@/components/form-btn";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

type Props = {};

const CreateAccount = (props: Props) => {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl ">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3 ">
        <FormInput
          type="text"
          name="username"
          placeholder="Username"
          isRequired
          errors={state?.fieldErrors.username}
        />
        <FormInput
          type="email"
          name="email"
          isRequired
          placeholder="Email"
          errors={state?.fieldErrors.email}
        />
        <FormInput
          type="password"
          name="paasword"
          isRequired
          placeholder="Password"
          errors={state?.fieldErrors.password}
        />
        <FormInput
          type="password"
          name="confirmPW"
          isRequired
          placeholder="Confirm Password"
          errors={state?.fieldErrors.confirmPW}
        />
        <FormBtn text="Create Account" />
      </form>
      <SocialLogin />
    </div>
  );
};

export default CreateAccount;
