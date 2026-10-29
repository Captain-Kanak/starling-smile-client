import React from "react";

import { products } from "@/data/data";
import ProductsClient from "@/components/products/ProductsClient";
import ProductsClientB from "@/components/products/ProductsClientB";
import ProductsClientC from "@/components/products/ProductsClientC";

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ category: string; sort?: string }>;
}) {
  const params = await searchParams;

  const category = params.category;
  const sort = params.sort;

  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === category,
  );

  const newProducts =
    categoryProducts.length > 0 ? [...categoryProducts] : products;

  return (
    <>
      <ProductsClientB params={{ category, sort }} newProducts={newProducts} />
      {/* <ProductsClient params={{ category, sort }} newProducts={newProducts} />
      <ProductsClientC params={{ category, sort }} newProducts={newProducts} /> */}
    </>
  );
}
