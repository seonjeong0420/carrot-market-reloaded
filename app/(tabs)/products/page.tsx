import React from "react";

type Props = {};

async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
}

const Products = async (props: Props) => {
  const products = await getProducts();
  return <div>Products</div>;
};

export default Products;
