"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ArrowDownUp, ShoppingCart } from "lucide-react";
import { Product } from "@/data/data";

interface Props {
  params: {
    category: string;
    sort?: string;
  };
  newProducts: Product[];
}

const demoReviews = [
  { rating: 4.7, count: 7 },
  { rating: 4.3, count: 80 },
  { rating: 4.5, count: 403 },
  { rating: 4.8, count: 24 },
  { rating: 4.4, count: 56 },
];

function RatingStars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center justify-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.min(Math.max(rating - index, 0), 1);

        return (
          <span key={index} className="relative inline-flex">
            <Star
              size={19}
              strokeWidth={1.5}
              className="fill-[#f3d9a0] text-[#f3d9a0]"
            />

            {fill > 0 && (
              <span
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  size={19}
                  strokeWidth={1.5}
                  className="max-w-none fill-[#ffb629] text-[#ffb629]"
                />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function ProductsClientC({
  params: { category, sort },
  newProducts,
}: Props) {
  const handleWishlist = (productName: string) => {
    window.alert(`${productName} added to wishlist`);
  };

  const handleAddToCart = (productName: string) => {
    window.alert(`${productName} added to cart`);
  };

  const handleOrderNow = (productName: string) => {
    window.alert(`Ordering ${productName}`);
  };

  const decodedCategory = category ? decodeURIComponent(category) : "";

  return (
    <section className="bg-[#faf9f6] py-8 sm:py-10">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Heading */}
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5">
          <div>
            <h1 className="text-2xl font-bold capitalize tracking-tight text-gray-900 sm:text-3xl">
              {decodedCategory || "Baby Products"}
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              {newProducts.length} items
            </p>
          </div>

          <Link
            href="/products"
            className="text-sm font-medium text-gray-600 underline underline-offset-4 transition hover:text-orange-600"
          >
            View all
          </Link>
        </div>

        {/* Sorting */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-gray-500 sm:text-sm">
            Showing {newProducts.length} products
          </p>

          <form
            action="/products"
            method="GET"
            className="flex items-center gap-2"
          >
            {decodedCategory && (
              <input type="hidden" name="category" value={decodedCategory} />
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
              className="max-w-43.75 cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs text-gray-700 outline-none focus:border-orange-400 sm:max-w-none sm:text-sm"
            >
              <option value="newest">Newest first</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>

            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-gray-900 px-3.5 py-2.5 text-xs font-medium text-white transition hover:bg-orange-600 sm:text-sm"
            >
              Apply
            </button>
          </form>
        </div>

        {/* Product cards */}
        {newProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {newProducts.map((product, index) => {
              const review = demoReviews[index % demoReviews.length];

              // Optional brand field; category is the fallback.
              const brand =
                "brand" in product &&
                typeof product.brand === "string" &&
                product.brand.trim()
                  ? product.brand
                  : product.category;

              // Demo discount: replace with actual product data later.
              const originalPrice = Math.round(product.price * 1.15);

              const formatPrice = (price: number) =>
                `৳ ${price.toLocaleString("en-BD")}`;

              return (
                <article
                  key={product.id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200/80 bg-white transition-shadow duration-300 hover:shadow-md sm:rounded-2xl"
                >
                  {/* Product image: no padding or overlay buttons */}
                  <Link
                    href={`/products/${product.sku}`}
                    aria-label={`View ${product.name}`}
                    className="relative block aspect-square w-full overflow-hidden bg-white"
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 639px) 48vw, (max-width: 1023px) 31vw, (max-width: 1279px) 23vw, 18vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </Link>

                  {/* Product details */}
                  <div className="flex flex-1 flex-col px-3 pb-3 pt-2 sm:px-3.5 sm:pb-4">
                    {/* Brand + wishlist */}
                    <div className="flex items-center justify-between gap-1.5">
                      <p className="truncate text-xs font-semibold text-gray-800 sm:text-sm">
                        {brand}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleWishlist(product.name)}
                        aria-label={`Add ${product.name} to wishlist`}
                        className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 transition hover:bg-rose-50 hover:text-rose-500 sm:size-8"
                      >
                        <Heart size={17} strokeWidth={1.7} />
                      </button>
                    </div>

                    {/* Product name */}
                    <Link href={`/products/${product.sku}`}>
                      <h2 className="mt-0.5 line-clamp-2 min-h-10 text-sm leading-5 text-gray-700 sm:text-[15px]">
                        {product.name}
                      </h2>
                    </Link>

                    {/* Static demo rating */}
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
                      <RatingStars rating={review.rating} />

                      <span className="text-xs text-gray-700">
                        {review.rating.toFixed(1)} ({review.count})
                      </span>
                    </div>

                    {/* Price + demo original price */}
                    <div className="mt-1.5 flex flex-wrap items-baseline justify-center gap-x-1.5 gap-y-0.5">
                      <span className="text-base font-bold text-[#ff5038] sm:text-lg">
                        {formatPrice(product.price)}
                      </span>

                      <span className="text-xs text-gray-500 line-through sm:text-sm">
                        {formatPrice(originalPrice)}
                      </span>
                    </div>

                    {/* Add to cart */}
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product.name)}
                      className="mt-3 flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-md bg-linear-to-r from-[#ff4935] to-[#ff6035] px-2 py-2 text-xs font-semibold uppercase text-white shadow-[0_3px_8px_rgba(255,80,53,0.16)] transition hover:brightness-95 active:scale-[0.98] sm:min-h-10.75 sm:text-sm"
                    >
                      <ShoppingCart size={17} strokeWidth={2.3} />
                      Add to Cart
                    </button>

                    {/* Order now */}
                    <button
                      type="button"
                      onClick={() => handleOrderNow(product.name)}
                      className="mt-2.5 flex min-h-10 w-full cursor-pointer items-center justify-center rounded-md bg-[#2870d7] px-2 py-2 text-xs font-semibold uppercase text-white transition hover:bg-[#1e5fbd] active:scale-[0.98] 
                      sm:min-h-10.75 sm:text-sm"
                    >
                      Order Now
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              No products found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Try exploring our other baby essentials.
            </p>

            <Link
              href="/products"
              className="mt-5 inline-flex rounded-lg bg-[#ff5038] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ed412b]"
            >
              View all products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
