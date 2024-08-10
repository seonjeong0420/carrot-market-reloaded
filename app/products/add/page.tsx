"use client";

import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

const ProductAdd = () => {
  const [preview, setPreview] = useState("");
  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file); // URL을 생성해주는 API
    setPreview(url);
  };

  return (
    <div>
      <form action="" className="flex gap-5 flex-col p-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {preview === "" && (
            <>
              <PhotoIcon className="w-20" />
              <p className="text-neutral-400 text-sm">사진을 추가해주세요.</p>
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
        <Input type="text" name="title" placeholder="제목" isRequired />
        <Input type="number" name="price" placeholder="가격" isRequired />
        <Input
          type="text"
          name="description"
          placeholder="자세한 설명"
          isRequired
        />
        <button className="flex justify-center items-center w-full p-3 bg-orange-500 text-white">
          작성 완료
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
