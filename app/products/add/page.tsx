"use client";

import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { uploadProduct } from "./actions";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductType } from "./schema";

const ProductAdd = () => {
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });

  const onImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file); // URL을 생성해주는 API
    setPreview(url);
    setFile(file);
    setValue("photo", url);
  };

  const onSubmit = handleSubmit(async (data: ProductType) => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price + "");
    formData.append("description", data.description);
    formData.append("photo", file);

    return uploadProduct(formData);
  });
  // const [state, action] = useFormState(interceptAction, null);
  const onValid = async () => {
    await onSubmit();
  };

  return (
    <div>
      <form action={onValid} className="flex gap-5 flex-col p-5">
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
                {errors.photo?.message}
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
          placeholder="제목"
          isRequired
          {...register("title")}
          errors={[errors.title?.message ?? ""]}
        />
        <Input
          type="number"
          placeholder="가격"
          isRequired
          {...register("price")}
          errors={[errors.price?.message ?? ""]}
        />
        <Input
          type="text"
          placeholder="자세한 설명"
          isRequired
          {...register("description")}
          errors={[errors.description?.message ?? ""]}
        />
        <button className="flex justify-center items-center w-full p-3 bg-orange-500 text-white">
          작성 완료
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
