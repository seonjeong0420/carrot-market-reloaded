"use server";
import db from "@/lib/db";

/**
 * 페이지가 10개씩 show 하는 기능을 구현하고 싶다면, 아래와 같이 수정하면 된다.
 * skip : page * 10
 * take: 10
 */
export async function getMoreProducts(page: number) {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });

  return products;
}
