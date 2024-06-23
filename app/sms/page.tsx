import FormBtn from "@/components/form-btn";
import FormInput from "@/components/input";
import SocialLogin from "@/components/social-login";
import React from "react";

type Props = {};

const SMSLogin = (props: Props) => {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl ">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number</h2>
      </div>
      <form className="flex flex-col gap-3 ">
        <FormInput
          type="number"
          isRequired
          placeholder="Phone number"
          errors={[""]}
        />
        <FormInput
          type="number"
          isRequired
          placeholder="Verification code"
          errors={[""]}
        />
        <FormBtn text="Verify" isLoading={false} />
      </form>
    </div>
  );
};

export default SMSLogin;
