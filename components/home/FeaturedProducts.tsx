"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { products } from "@/data/data";
import ProductCard from "../products/ProductCard";

// Static demo discounts until discount data is available in the database
const demoDiscounts = [47, 31, 8, 25, 20];

export default function FeaturedProducts() {
  const featuredProducts = products.slice(0, 10);

  return (
    <section className="bg-white py-9 sm:py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading */}
        <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <Sparkles size={17} className="text-[#087f8c]" />
              <h2 className="text-lg font-semibold tracking-tight text-gray-950 sm:text-xl">
                Featured Products
              </h2>
            </div>

            <p className="text-xs text-gray-500 sm:text-sm">
              Our top picks for your little one
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 px-3.5 py-2 text-xs font-medium text-gray-700 transition-all duration-300 hover:border-[#087f8c] hover:bg-[#087f8c] hover:text-white sm:px-4 sm:text-sm"
          >
            View All
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Featured product grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-5">
          {featuredProducts.map((product, index) => {
            const discount = demoDiscounts[index % demoDiscounts.length];

            // Demo original price calculated from the discount percentage
            const originalPrice = Math.round(
              product.price / (1 - discount / 100),
            );

            return (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                discount={discount}
                originalPrice={originalPrice}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
