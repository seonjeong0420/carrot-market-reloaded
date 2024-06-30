"use client";
import React from "react";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import { PASSWORD_MIN_LENNGTH } from "../lib/constans";
import Button from "@/components/button";

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
        <Input
          type="text"
          name="username"
          placeholder="Username"
          isRequired
          errors={state?.fieldErrors.username}
        />
        <Input
          type="email"
          name="email"
          isRequired
          placeholder="Email"
          errors={state?.fieldErrors.email}
        />
        <Input
          type="password"
          name="password"
          isRequired
          placeholder="Password"
          errors={state?.fieldErrors.password}
          minLength={PASSWORD_MIN_LENNGTH}
        />
        <Input
          type="password"
          name="confirmPW"
          isRequired
          placeholder="Confirm Password"
          errors={state?.fieldErrors.confirmPW}
          minLength={PASSWORD_MIN_LENNGTH}
        />
        <Button text="Create Account" />
      </form>
      <SocialLogin />
    </div>
  );
};

export default CreateAccount;
