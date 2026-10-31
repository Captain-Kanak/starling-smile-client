import React from "react";
import { notFound } from "next/navigation";
import ProductDetailsClient from "@/components/products/ProductDetailsClient";
import { products } from "@/data/data";
import ProductDetailsClientB from "@/components/products/ProductDetailsClientB";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = products.find((product) => product.sku === slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductDetailsClient product={product} />
      {/* <ProductDetailsClientB product={product} /> */}
    </>
  );
}
