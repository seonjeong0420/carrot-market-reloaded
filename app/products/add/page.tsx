"use client";

import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { uploadProduct } from "./actions";
import { useFormState } from "react-dom";

const ProductAdd = () => {
  const [preview, setPreview] = useState("");
  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    console.log(files, files[0].type);

    const file = files[0];
    const url = URL.createObjectURL(file); // URL을 생성해주는 API
    setPreview(url);
  };

  const [state, action] = useFormState(uploadProduct, null);
  return (
    <div>
      <form action={action} className="flex gap-5 flex-col p-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {preview === "" && (
            <>
              <PhotoIcon className="w-20" />
              <p className="text-neutral-400 text-sm">
                사진을 추가해주세요.
                <br />
                {state?.fieldErrors.photo}
              </p>
            </>
          )}
        </label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
          onChange={onImageChange}
        />
        <Input
          type="text"
          name="title"
          placeholder="제목"
          isRequired
          errors={state?.fieldErrors.title}
        />
        <Input
          type="number"
          name="price"
          placeholder="가격"
          isRequired
          errors={state?.fieldErrors.price}
        />
        <Input
          type="text"
          name="description"
          placeholder="자세한 설명"
          isRequired
          errors={state?.fieldErrors.description}
        />
        <button className="flex justify-center items-center w-full p-3 bg-orange-500 text-white">
          작성 완료
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
