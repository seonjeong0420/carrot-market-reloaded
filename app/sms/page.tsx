import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import React from "react";
import { useFormState } from "react-dom";
import { smsLogin } from "./actions";

type Props = {};

const SMSLogin = (props: Props) => {
  const [state, dispatch] = useFormState(smsLogin, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl ">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number</h2>
      </div>
      <form className="flex flex-col gap-3" action={dispatch}>
        <Input
          type="number"
          name="phone"
          isRequired
          placeholder="Phone number"
        />
        <Input
          type="number"
          name="token"
          isRequired
          placeholder="Verification code"
        />
        <Button text="Verify" />
      </form>
    </div>
  );
};

export default SMSLogin;
