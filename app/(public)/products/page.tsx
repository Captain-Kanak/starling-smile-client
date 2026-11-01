import React from "react";

import { products, categories } from "@/data/data";
import ProductsClient from "@/components/products/ProductsClient";

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ category: string; sort?: string }>;
}) {
  const params = await searchParams;

  const category = params.category;
  const sort = params.sort;

  const categoryItem =
    category &&
    categories.find((c) => c.name.toLowerCase() === category.toLowerCase());
  const categoryId = typeof categoryItem === "object" ? categoryItem?.id : undefined;

  const categoryProducts = categoryId
    ? products.filter((product) => product.categoryId === categoryId)
    : [];

  const newProducts =
    categoryProducts.length > 0 ? [...categoryProducts] : products;

  return (
    <>
      <ProductsClient params={{ category, sort }} newProducts={newProducts} />
    </>
  );
}
