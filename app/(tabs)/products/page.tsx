import ListProduct from "@/components/list-product";
import db from "@/lib/db";
import React from "react";

type Props = {};

async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
  });
  return products;
}

const Products = async (props: Props) => {
  const products = await getProducts();
  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Products;
