"use client";

import Link from "next/link";
import { ArrowDownUp, ChevronRight } from "lucide-react";
import { Product } from "@/data/data";
import ProductCard from "./ProductCard";

interface Props {
  params: {
    category: string;
    sort?: string;
  };
  newProducts: Product[];
}

// Static demo discounts until discount data is available in the database
const demoDiscounts = [47, 31, 8, 25, 20];

export default function ProductsClientB({
  params: { category, sort },
  newProducts,
}: Props) {
  const normalizedCategory = category ? decodeURIComponent(category) : "";

  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-gray-500 sm:mb-8 sm:text-sm"
        >
          <Link href="/" className="transition-colors hover:text-[#087f8c]">
            Home
          </Link>

          <ChevronRight size={14} />

          <Link
            href="/products"
            className="transition-colors hover:text-[#087f8c]"
          >
            Products
          </Link>
        </nav>

        {/* Page heading */}
        <div className="border-b border-gray-100 pb-5 sm:pb-7">
          <h1 className="text-2xl font-semibold capitalize tracking-tight text-gray-950 sm:text-3xl">
            {normalizedCategory || "All products"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {newProducts.length} items
          </p>
        </div>

        {/* Sorting */}
        <div className="flex items-center justify-between gap-3 py-5 sm:py-7">
          <p className="text-xs text-gray-500 sm:text-sm">
            Showing {newProducts.length} items
          </p>

          <form
            action="/products"
            method="GET"
            className="flex items-center gap-2"
          >
            {normalizedCategory && (
              <input type="hidden" name="category" value={normalizedCategory} />
            )}

            <label
              htmlFor="sort"
              className="hidden items-center gap-1.5 text-sm text-gray-600 sm:flex"
            >
              <ArrowDownUp size={15} />
              Sort by
            </label>

            <select
              id="sort"
              name="sort"
              defaultValue={sort || "newest"}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs text-gray-800 outline-none transition hover:border-gray-400 focus:border-teal-600 sm:text-sm"
            >
              <option value="newest">Newest first</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>

            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-gray-950 px-3.5 py-2.5 text-xs font-medium text-white transition hover:bg-teal-700 sm:px-4 sm:text-sm"
            >
              Apply
            </button>
          </form>
        </div>

        {/* Products grid */}
        {newProducts.length > 0 ? (
          <div className="max-w-7xl mx-auto grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
            {newProducts.map((product, index) => {
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
        ) : (
          /* Empty state */
          <div className="py-20 text-center">
            <h2 className="text-lg font-semibold text-gray-950">
              No products found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Explore our other collections to find your baby essentials.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex rounded-lg bg-teal-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-800"
            >
              View all products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
