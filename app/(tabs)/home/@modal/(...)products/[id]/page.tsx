import React from "react";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Button from "@/components/button";
import db from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct } from "@/app/products/actions";

type Props = {
  params: {
    id: string;
  };
};

const Modal = async ({ params }: Props) => {
  const product = await getProduct(Number(params.id));
  if (!product) {
    return notFound();
  }

  return (
    <div className="absolute w-full h-full z-50 left-0 top-0 flex justify-center items-center bg-black bg-opacity-60 ">
      <Button uiType="modal">
        <XMarkIcon className="size-10" />
      </Button>
      <div className="max-w-screen-sm flex flex-col justify-center w-full h-1/2">
        <div className="relative aspect-square bg-neutral-700 rounded-md flex justify-center items-center text-neutral-200">
          <Image
            src={product.photo}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex gap-3 items-center p-5 border-b border-neutral-600">
          <div className="size-10 rounded-full overflow-hidden">
            {product.user.avatar !== null ? (
              <Image
                src={product.user.avatar}
                width={40}
                height={40}
                alt={product.user.username}
                className="object-cover"
              />
            ) : (
              <UserIcon />
            )}
          </div>
          <h3>{product.user.username}</h3>
        </div>
        <div className="flex flex-col gap-3 p-5">
          <span className="text-2xl font-semibold">{product.title}</span>
          <span>{product.description}</span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
