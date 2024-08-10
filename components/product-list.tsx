"use client";
import React, { useEffect, useRef, useState } from "react";
import ListProduct from "./list-product";
import { InitialProducts } from "@/app/(tabs)/products/page";
import { getMoreProducts } from "@/app/(tabs)/products/actions";

interface ProductListProps {
  initialProducts: InitialProducts;
}

const ProductList = ({ initialProducts }: ProductListProps) => {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newProducts = await getMoreProducts(page + 1);
    if (newProducts.length !== 0) {
      setPage((prev) => prev + 1);
      setProducts((prev) => [...prev, ...newProducts]);
    } else {
      setIsLastPage(true);
    }
    setIsLoading(false);
  };

  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    // trigger 감지하기
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newProducts = await getMoreProducts(page + 1);
          if (newProducts.length !== 0) {
            setPage((prev) => prev + 1);
            setProducts((prev) => [...prev, ...newProducts]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
        console.log(entries[0].isIntersecting);
      },
      {
        threshold: 1.0,
        rootMargin: "0px 0px -100px 0px", // observer의 크기를 조정할 수 있다.
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      {!isLastPage && (
        <span
          style={{ marginTop: `${page + 1 * 300}vh` }}
          className="mb-96 text-sm font-semibold w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
          ref={trigger}
        >
          {isLoading ? "로딩중" : "Load More"}
        </span>
      )}
      {!isLastPage && (
        <button
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
          onClick={onLoadMoreClick}
          disabled={isLoading}
        >
          {isLoading ? "로딩중" : "Load More"}
        </button>
      )}
    </div>
  );
};

export default ProductList;
