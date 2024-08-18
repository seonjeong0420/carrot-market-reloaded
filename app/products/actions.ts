"use server";
import db from "@/lib/db";

export async function getProduct(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const product = await db.product.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}
