"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import React from "react";
import { useFormState } from "react-dom";
import { startStream } from "./actions";

type Props = {};

const AddStreams = (props: Props) => {
  const [state, action] = useFormState(startStream, null);

  return (
    <form className="flex flex-col gap-2 p-5">
      <Input name="title" isRequired placeholder="Title or your stream." errors={state?.formErrors} />
      <Button text="Start streaming" />
    </form>
  );
};

export default AddStreams;
