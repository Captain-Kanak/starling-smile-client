"use client";

import { Product } from "@/data/data";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  params: {
    category: string;
    sort?: string;
  };
  newProducts: Product[];
}

export default function ProductsClient({
  params: { category, sort },
  newProducts,
}: Props) {
  const handleWishlist = () => {
    window.alert("Added to wishlist");
  };

  const handleAddToCart = (productName: string) => {
    window.alert(`${productName} added to cart`);
  };

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="container mx-auto px-4">
        {/* Category heading */}
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-semibold capitalize text-gray-950">
            {category}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {newProducts.length} products
          </p>
        </div>

        {/* Sorting */}
        <div className="flex justify-end py-6">
          <form>
            <label htmlFor="sort" className="mr-3 text-sm text-gray-600">
              Sort
            </label>

            <select
              id="sort"
              name="sort"
              defaultValue={sort}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-violet-500"
            >
              <option value="newest">Newest first</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </form>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {newProducts.map((product, index) => {
            // Static demo reviews until the database is connected
            const rating = [5, 4, 5, 4, 5][index % 5];
            const reviewCount = [20, 16, 24, 12, 18][index % 5];

            return (
              <article
                key={product.id}
                className="group min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative">
                  <Link
                    href={`/products/${product.sku}`}
                    className="relative block aspect-square overflow-hidden bg-white"
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-contain p-3 transition-transform duration-300 group-hover:scale-105 sm:p-4"
                    />
                  </Link>

                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={handleWishlist}
                    aria-label={`Add ${product.name} to wishlist`}
                    className="absolute right-2 top-2 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-colors hover:text-red-500 sm:right-3 sm:top-3"
                  >
                    <Heart size={15} strokeWidth={1.7} />
                  </button>
                </div>

                {/* Product details */}
                <div className="px-2.5 pb-2.5 pt-1.5 sm:px-3 sm:pb-3">
                  <Link href={`/products/${product.sku}`}>
                    <h2 className="line-clamp-2 min-h-8 text-[11px] font-semibold leading-4 text-gray-800 transition-colors hover:text-violet-700 sm:text-xs">
                      {product.name}
                    </h2>
                  </Link>

                  {/* Static star rating */}
                  <div
                    className="mt-1 flex items-center gap-1"
                    aria-label={`Rated ${rating} out of 5, ${reviewCount} reviews`}
                  >
                    <div className="flex items-center gap-px">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          size={11}
                          strokeWidth={1.5}
                          className={
                            starIndex < rating
                              ? "fill-red-500 text-red-500"
                              : "fill-gray-200 text-gray-200"
                          }
                        />
                      ))}
                    </div>

                    <span className="text-[9px] text-gray-500">
                      ({reviewCount})
                    </span>
                  </div>

                  {/* Cart and price */}
                  <div className="mt-2.5 flex items-center justify-between gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product.name)}
                      className="shrink-0 cursor-pointer rounded-full border border-gray-400 px-2.5 py-1 text-[9px] font-medium text-gray-800 transition-colors hover:border-violet-600 hover:bg-violet-600 hover:text-white sm:px-3 sm:text-[10px]"
                    >
                      Add to Cart
                    </button>

                    <p className="whitespace-nowrap text-[10px] font-semibold text-violet-600 sm:text-[11px]">
                      Tk{product.price}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
