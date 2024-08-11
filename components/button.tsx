"use client";
import React, { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

interface ButtonProps {
  uiType?: "page" | "modal";
  text?: string;
  children?: ReactNode;
}

const Button = ({ text, uiType = "page" }: ButtonProps) => {
  const { pending } = useFormStatus();
  const router = useRouter();
  const onCloseClick = () => {
    router.back();
  };
  const uiButton = {
    page: (
      <button
        className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
        disabled={pending}
      >
        {pending ? "Loading..." : text}
      </button>
    ),
    modal: (
      <button
        className="absolute right-5 top-5 text-neutral-200"
        onClick={onCloseClick}
      >
        <XMarkIcon className="size-10" />
      </button>
    ),
  };

  return <>{uiButton[uiType]}</>;
};

export default Button;
