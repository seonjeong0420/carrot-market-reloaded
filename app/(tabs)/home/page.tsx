import ListProduct from "@/components/list-product";
import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache";
import Link from "next/link";
import React from "react";

/**
 * 첫번째 argument : 비용이 많이 드는 계싼이나 데이터베이스 query를 가동시키는 함수
 * 두번째 argument = keyParts : 함수가 return하는 데이터를 cache 안에서 식별할 수 있게 해주는 것
 * 세번째 argument : revalidate = 함수가 호출된 후 60초가 지나지 않은 경우에 캐시 안에 있는 데이터 return
 */
const getCachedProducts = nextCache(getInitialProducts, ["home-products"], {
  revalidate: 60,
});

async function getInitialProducts() {
  console.log("test!!");

  await new Promise((resolve) => setTimeout(resolve, 2000));
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    // take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

const Products = async () => {
  const initialProducts = await getCachedProducts();
  return (
    <div className="p-5 flex flex-col gap-5">
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/products/add"
        className="bg-orange-500 items-center justify-center flex rounded-full size-10 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-7" />
      </Link>
    </div>
  );
};

export default Products;
