"use client";

import { Product } from "@/data/data";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
  index: number;
  discount?: number;
  originalPrice: number;
}

export default function ProductCard({
  product,
  index,
  discount,
  originalPrice,
}: Props) {
  const handleAddToCart = (productName: string) => {
    window.alert(`${productName} added to cart`);
  };

  const formatPrice = (price: number) =>
    price.toLocaleString("en-BD", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-[#dedede] bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-md">
      {/* Product image */}
      <div className="relative">
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
            className="object-contain p-1.5 transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:p-2"
          />
        </Link>

        {/* Discount badge */}
        {typeof discount === "number" && discount > 0 && (
          <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-[#ffbd00] px-2.5 py-1.5 text-[10px] font-bold leading-none text-gray-950 sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
            -{discount}%
          </span>
        )}
      </div>

      {/* Product details */}
      <div className="flex flex-1 flex-col border-t border-[#e5e5e5] p-3 sm:p-4">
        {/* Product name */}
        <Link href={`/products/${product.sku}`}>
          <h2 className="line-clamp-2 text-base leading-5.5 font-medium text-gray-950 transition-colors hover:text-[#087f8c]">
            {product.name}
          </h2>
        </Link>

        {/* Price */}
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 sm:mt-1.5">
          <p className="text-lg font-bold tracking-tight text-[#087f8c] sm:text-xl">
            ৳ {formatPrice(product.price)}
          </p>

          {originalPrice > product.price && (
            <p className="text-xs text-gray-500 line-through sm:text-sm">
              ৳ {formatPrice(originalPrice)}
            </p>
          )}
        </div>

        {/* Add to cart */}
        <div className="mt-auto pt-3 sm:pt-3">
          <button
            type="button"
            onClick={() => handleAddToCart(product.name)}
            className="flex min-h-8 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#eaf4f5] px-3 py-2 text-xs font-medium text-gray-950 transition-colors duration-300 hover:bg-[#d7ebed] sm:min-h-9 sm:gap-2 sm:text-sm"
          >
            <ShoppingCart size={16} strokeWidth={2} className="shrink-0" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
}
