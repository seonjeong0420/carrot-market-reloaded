import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { id: string };
};

// 사용자가 해당 상품 관리자인지 아닌지 check
async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export async function getProduct(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  fetch("https://api.com", {
    next: {
      revalidate: 60,
      tags: ["hello"],
    },
  });
  // const product = await db.product.findUnique({
  //   where: { id },
  //   include: {
  //     user: {
  //       select: {
  //         username: true,
  //         avatar: true,
  //       },
  //     },
  //   },
  // });
  // return product;
}

const getProductCached = nextCache(getProduct, ["product-detail"], {
  tags: ["product-detail", "hello"],
});

export async function getProductTitle(id: number) {
  const product = await db.product.findUnique({
    where: { id },
    select: {
      title: true,
    },
  });
  return product;
}

const getProductTitleCached = nextCache(getProductTitle, ["product-title"], {
  tags: ["product-title"],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProductTitleCached(Number(params.id));

  return {
    title: product?.title,
  };
}

const ProductDetail = async ({ params }: Props) => {
  const id = Number(params.id);
  const product = await getProductCached(id);
  if (isNaN(id) || !product) {
    return notFound();
  }

  const isOwner = await getIsOwner(product.userId);

  const revalidateTitle = async () => {
    "use server";
    revalidateTag("product-title");
  };

  return (
    <div>
      <div className="relative aspect-square">
        <Image
          src={product.photo}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-600">
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
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5 ">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-lg ">
          {formatToWon(product.price)}원
        </span>
        {isOwner && (
          <form action={revalidateTitle}>
            <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
              Revalidate Title
            </button>
          </form>
        )}
        <Link
          href={"/"}
          className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
        >
          채팅하기
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
