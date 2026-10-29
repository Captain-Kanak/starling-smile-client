"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowDownUp, ShoppingCart, ChevronRight } from "lucide-react";
import { Product } from "@/data/data";

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
  const handleWishlist = (productName: string) => {
    window.alert(`${productName} added to wishlist`);
  };

  const handleAddToCart = (productName: string) => {
    window.alert(`${productName} added to cart`);
  };

  const formatPrice = (price: number) =>
    price.toLocaleString("en-BD", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5">
            {newProducts.map((product, index) => {
              const discount = demoDiscounts[index % demoDiscounts.length];

              // Demo original price calculated from the discount percentage
              const originalPrice = Math.round(
                product.price / (1 - discount / 100),
              );

              return (
                <article
                  key={product.id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-[#dedede] bg-white transition-colors duration-300 hover:border-gray-300 sm:rounded-4xl"
                >
                  {/* Product image */}
                  <div className="relative border-b border-[#e5e5e5]">
                    <Link
                      href={`/products/${product.sku}`}
                      aria-label={`View ${product.name}`}
                      className="relative block aspect-square w-full overflow-hidden bg-white"
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        priority={index < 4}
                        sizes="(max-width: 639px) 48vw, (max-width: 1023px) 48vw, (max-width: 1279px) 32vw, 25vw"
                        className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:p-3"
                      />
                    </Link>

                    {/* Discount badge: top-left corner */}
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-[#ffbd00] px-3 py-1.5 text-[11px] font-bold leading-none text-gray-950 sm:left-4 sm:top-4 sm:px-3.5 sm:py-2 sm:text-xs">
                      -{discount}%
                    </span>

                    {/* Optional wishlist */}
                    <button
                      type="button"
                      onClick={() => handleWishlist(product.name)}
                      aria-label={`Add ${product.name} to wishlist`}
                      className="absolute right-3 top-3 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition-colors hover:bg-rose-50 hover:text-rose-500 sm:right-4 sm:top-4 sm:size-9"
                    >
                      <Heart size={17} strokeWidth={1.7} />
                    </button>
                  </div>

                  {/* Product details */}
                  <div className="flex flex-1 flex-col p-3.5 sm:p-5">
                    {/* Product name */}
                    <Link href={`/products/${product.sku}`}>
                      <h2 className="line-clamp-2 min-h-10 text-sm font-normal leading-5 text-gray-950 transition-colors hover:text-teal-700 sm:min-h-12 sm:text-base sm:leading-6">
                        {product.name}
                      </h2>
                    </Link>

                    {/* Price and discount */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 sm:mt-4">
                      <p className="text-base font-bold tracking-tight text-[#087f8c] sm:text-xl">
                        ৳ {formatPrice(product.price)}
                      </p>

                      <p className="text-xs text-gray-500 line-through sm:text-sm">
                        ৳ {formatPrice(originalPrice)}
                      </p>
                    </div>

                    {/* Add to cart */}
                    <div className="mt-auto pt-5 sm:pt-8">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product.name)}
                        className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#eaf4f5] px-3 py-3 text-xs font-medium text-gray-950 transition-colors duration-300 hover:bg-[#d7ebed] sm:min-h-15 sm:gap-3 sm:px-4 sm:text-base"
                      >
                        <ShoppingCart
                          size={19}
                          strokeWidth={2}
                          className="shrink-0"
                        />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </article>
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
