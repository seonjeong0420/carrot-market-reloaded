"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import React from "react";
import { useFormState } from "react-dom";
import { smsLogin } from "./actions";

type Props = {};

const initialState = {
  token: false,
  error: undefined,
};

const SMSLogin = (props: Props) => {
  const [state, dispatch] = useFormState(smsLogin, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl ">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number</h2>
      </div>
      <form className="flex flex-col gap-3" action={dispatch}>
        <Input
          type="text"
          name="phone"
          isRequired
          placeholder="Phone number"
          errors={state.error?.formErrors}
        />
        {state.token ? (
          <Input
            type="number"
            name="token"
            isRequired
            placeholder="Verification code"
            minLength={100000}
            maxLength={999999}
          />
        ) : null}

        <Button text={state.token ? "Verify Token" : "Send Verification SMS"} />
      </form>
    </div>
  );
};

export default SMSLogin;
