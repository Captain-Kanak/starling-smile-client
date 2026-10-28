import React from "react";
import { notFound } from "next/navigation";
import { products } from "../../../data/data";
import ProductDetailsClient from "@/components/ProductDetailsClient";

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

  return <ProductDetailsClient product={product} />;
}
