import React from "react";

interface FormInputProps {
  type: string;
  name: string;
  placeholder: string;
  isRequired: boolean;
  errors: string[];
}

const FormInput = ({
  type,
  placeholder,
  name,
  isRequired,
  errors,
}: FormInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type={type}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 px-3"
        name={name}
        placeholder={placeholder}
        required={isRequired}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium ">
          {error}
        </span>
      ))}
    </div>
  );
};

export default FormInput;
