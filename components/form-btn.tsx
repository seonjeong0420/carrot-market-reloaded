import React from "react";

interface FormButtonProps {
  isLoading: boolean;
  text: string;
}

const FormBtn = ({ text, isLoading }: FormButtonProps) => {
  return (
    <button
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : text}
    </button>
  );
};

export default FormBtn;
