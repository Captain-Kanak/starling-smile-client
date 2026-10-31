"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  WalletCards,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  Check,
  ShieldCheck,
  Heart,
  ChevronRight,
} from "lucide-react";
import type { Product } from "@/data/products";
import { categories } from "@/data/categories";

export default function ProductDetailsClient({
  product,
}: {
  product: Product;
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const images =
    product.images?.filter(
      (image): image is string =>
        typeof image === "string" && image.trim().length > 0,
    ) ?? [];

  const galleryImages =
    images.length > 0 ? images : ["/images/pro-placeholder.png"];

  const productName = product.name || "Baby product";
  const price = Number(product.variants[0]?.price) || 0;
  const image = galleryImages[selectedImage] ?? galleryImages[0];

  const formatPrice = (value: number) =>
    value.toLocaleString("en-BD", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

  const handleAddToCart = () => {
    console.log("Add to cart:", {
      product,
      quantity,
      total: price * quantity,
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
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

          <ChevronRight size={14} />

          <span className="max-w-55 truncate font-medium text-gray-800">
            {productName}
          </span>
        </nav>

        {/* Main product layout */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Product gallery */}
          <section className="min-w-0">
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {/* Main image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#e2e2e2] bg-white sm:rounded-[28px]">
                <Image
                  key={image}
                  src={image}
                  alt={productName}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-contain transition-transform duration-300 hover:scale-[1.02]"
                />

                {/* Product label */}
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#eaf4f5] px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#087f8c] sm:left-5 sm:top-5 sm:text-xs">
                  <Check size={13} />
                  Baby essentials
                </span>

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={() => setIsWishlisted((current) => !current)}
                  aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                  aria-pressed={isWishlisted}
                  className={`absolute right-3 top-3 flex size-10 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white/95 shadow-sm transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 sm:right-5 sm:top-5 ${
                    isWishlisted ? "text-rose-500" : "text-gray-600"
                  }`}
                >
                  <Heart
                    size={19}
                    strokeWidth={1.8}
                    fill={isWishlisted ? "currentColor" : "none"}
                  />
                </button>

                {/* Image counter */}
                {galleryImages.length > 1 && (
                  <span className="absolute bottom-3 right-3 rounded-full border border-gray-100 bg-white/95 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm sm:bottom-5 sm:right-5">
                    {selectedImage + 1} / {galleryImages.length}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((thumbnail, index) => (
                    <button
                      key={`${thumbnail}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      aria-label={`View image ${index + 1}`}
                      aria-pressed={selectedImage === index}
                      className={`relative size-19 shrink-0 cursor-pointer overflow-hidden rounded-xl border bg-white transition sm:size-23 ${
                        selectedImage === index
                          ? "border-[#087f8c] ring-2 ring-[#087f8c]/15"
                          : "border-gray-200 hover:border-[#087f8c]/50"
                      }`}
                    >
                      <Image
                        src={thumbnail}
                        alt={`${productName} view ${index + 1}`}
                        fill
                        sizes="92px"
                        className="object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Product information */}
          <section className="flex min-w-0 flex-col lg:sticky lg:top-8">
            {/* Category */}
            <Link
              href={`/products?category=${encodeURIComponent(
                categories.find((c) => c.id === product.categoryId)?.name ||
                  product.categoryId
              )}`}
              className="w-fit rounded-full bg-[#eaf4f5] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#087f8c] transition-colors hover:bg-[#d9edef]"
            >
              {categories.find((c) => c.id === product.categoryId)?.name ||
                product.categoryId}
            </Link>

            {/* Product name */}
            <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-3xl xl:text-[38px] xl:leading-[1.2]">
              {productName}
            </h1>

            {/* SKU */}
            <p className="mt-3 text-xs text-gray-500 sm:text-sm">
              Product code:{" "}
              <span className="font-medium text-gray-800">{product.variants[0]?.sku}</span>
            </p>

            {/* Price */}
            <div className="mt-6 rounded-2xl border border-[#e2e2e2] bg-white p-4 sm:p-5">
              <p className="text-xs font-medium text-gray-500 sm:text-sm">
                Price
              </p>

              <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="text-3xl font-bold tracking-tight text-[#087f8c] sm:text-4xl">
                  ৳{formatPrice(price)}
                </p>

                <span className="text-xs text-gray-500 sm:text-sm">
                  Inclusive of listed price
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
                <Check size={15} className="text-[#087f8c]" />
                <span>Ready for your little one</span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-gray-100 sm:my-7" />

            {/* Quantity */}
            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <label className="text-sm font-semibold text-gray-900 sm:text-base">
                  Quantity
                </label>

                <span className="text-xs text-gray-500 sm:text-sm">
                  Choose how many you need
                </span>
              </div>

              <div className="flex h-12 w-36 items-center justify-between rounded-full border border-gray-200 bg-white px-2 sm:h-14">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="flex size-9 cursor-pointer items-center justify-center rounded-full text-gray-600 transition hover:bg-[#eaf4f5] hover:text-[#087f8c] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Minus size={16} />
                </button>

                <span
                  aria-live="polite"
                  className="min-w-6 text-center text-sm font-semibold text-gray-950"
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  aria-label="Increase quantity"
                  className="flex size-9 cursor-pointer items-center justify-center rounded-full text-gray-600 transition hover:bg-[#eaf4f5] hover:text-[#087f8c]"
                >
                  <Plus size={17} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-5 flex min-h-14 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#eaf4f5] px-6 py-4 text-sm font-semibold text-gray-950 transition-colors duration-300 hover:bg-[#d7ebed] active:scale-[0.99] sm:text-base"
            >
              <ShoppingCart size={20} strokeWidth={2} />
              Add to Cart
            </button>

            {/* Order summary */}
            <div className="mt-3 flex items-center justify-between gap-3 px-1 text-xs text-gray-500 sm:text-sm">
              <span>
                Subtotal ({quantity} {quantity === 1 ? "item" : "items"})
              </span>

              <span className="font-semibold text-[#087f8c]">
                ৳{formatPrice(price * quantity)}
              </span>
            </div>

            {/* Delivery and benefits */}
            <div className="mt-7 overflow-hidden rounded-2xl border border-[#e2e2e2] bg-white sm:mt-8 sm:rounded-3xl">
              <div className="flex items-center gap-3 border-b border-gray-100 p-4 sm:p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#eaf4f5] text-[#087f8c]">
                  <WalletCards size={21} strokeWidth={1.7} />
                </span>

                <div>
                  <h2 className="text-sm font-semibold text-gray-950">
                    Cash on delivery
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Pay when your order arrives
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-b border-gray-100 p-4 sm:p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#eaf4f5] text-[#087f8c]">
                  <Truck size={21} strokeWidth={1.7} />
                </span>

                <div>
                  <h2 className="text-sm font-semibold text-gray-950">
                    Nationwide delivery
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Delivery across Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-b border-gray-100 p-4 sm:p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#eaf4f5] text-[#087f8c]">
                  <RotateCcw size={21} strokeWidth={1.7} />
                </span>

                <div>
                  <h2 className="text-sm font-semibold text-gray-950">
                    Easy returns
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Shop with added peace of mind
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 sm:p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#eaf4f5] text-[#087f8c]">
                  <ShieldCheck size={21} strokeWidth={1.7} />
                </span>

                <div>
                  <h2 className="text-sm font-semibold text-gray-950">
                    Shopping you can trust
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    A little more peace of mind for your family
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
