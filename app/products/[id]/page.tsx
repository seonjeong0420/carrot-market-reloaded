import React from "react";

type Props = {};

async function getProduct() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
}
const ProductDetail = async ({}: Props) => {
  const product = await getProduct();
  return <div>ProductDetail</div>;
};

export default ProductDetail;
