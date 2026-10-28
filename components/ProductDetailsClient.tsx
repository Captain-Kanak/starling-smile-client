"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  WalletCards,
  Truck,
  RotateCcw,
  Minus,
  Plus,
} from "lucide-react";
import type { Product } from "@/data/data";

export default function ProductDetailsClient({
  product,
}: {
  product: Product;
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const images =
    product.images?.filter(
      (image): image is string =>
        typeof image === "string" && image.trim().length > 0,
    ) ?? [];

  const galleryImages =
    images.length > 0 ? images : ["/images/pro-placeholder.png"];

  const productName = product.name || "Product";
  const price = Number(product.price) || 0;
  const image = galleryImages[selectedImage] ?? galleryImages[0];

  return (
    <main className="min-h-screen bg-white px-5 py-8 sm:px-8 lg:px-16 xl:px-24">
      <div className="mx-auto grid max-w-375 grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 xl:gap-24">
        {/* Product gallery */}
        <section className="min-w-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="order-2 flex gap-3 overflow-x-auto pb-2 sm:order-1 sm:w-23.5 sm:shrink-0 sm:flex-col sm:overflow-visible sm:pb-0">
                {galleryImages.map((thumbnail, index) => (
                  <button
                    key={`${thumbnail}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={selectedImage === index}
                    className={`relative h-19 w-19 shrink-0 overflow-hidden rounded-[18px] border bg-white p-1 transition sm:h-23.5 sm:w-23.5 ${
                      selectedImage === index
                        ? "border-2 border-[#3829a5]"
                        : "border-[#f0edf3] hover:border-[#b9b0e8]"
                    }`}
                  >
                    <Image
                      src={thumbnail}
                      alt={`${productName} view ${index + 1}`}
                      fill
                      sizes="94px"
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="relative order-1 min-h-85 flex-1 overflow-hidden rounded-2xl bg-[#faf9fc] sm:order-2 sm:min-h-132.5 lg:min-h-162.5">
              <Image
                key={image}
                src={image}
                alt={`${productName} - image ${selectedImage + 1}`}
                loading="eager"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="object-contain p-4 sm:p-6"
              />
            </div>
          </div>
        </section>

        {/* Product information */}
        <section className="pt-1 lg:pt-0">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7869bc]">
            {product.category}
          </p>

          <h1 className="mt-3 text-[24px] font-semibold uppercase leading-tight tracking-[-0.5px] text-[#25202a] sm:text-[27px]">
            {productName}
          </h1>

          <p className="mt-4 text-[24px] font-medium tracking-tight text-[#25202a]">
            ৳
            {price.toLocaleString("en-BD", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p className="mt-2 text-[13px] tracking-[0.7px] text-[#8c818d]">
            SKU: {product.sku}
          </p>

          {/* Quantity and cart */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="flex h-14 w-full items-center justify-between rounded-full border border-[#ded2dc] px-4 sm:w-33.25 sm:shrink-0">
              <button
                type="button"
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="p-1 text-[#554b59] disabled:opacity-40"
              >
                <Minus size={17} strokeWidth={1.8} />
              </button>

              <span
                aria-live="polite"
                className="min-w-6 text-center text-[17px] text-[#29232c]"
              >
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                aria-label="Increase quantity"
                className="p-1 text-[#554b59]"
              >
                <Plus size={18} strokeWidth={1.8} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                console.log("Add to cart:", {
                  product,
                  quantity,
                  total: price * quantity,
                });
              }}
              className="flex h-14 flex-1 items-center justify-center gap-3 rounded-full bg-[#3c2d9d] px-6 text-[16px] font-medium text-white transition hover:bg-[#30227f] active:scale-[0.99]"
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              Add to cart
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-8 border-t border-[#e9e0e7] pt-6">
            <div className="flex items-center gap-3 py-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0edfb] text-[#3c2d9d]">
                <WalletCards size={18} strokeWidth={1.7} />
              </span>
              <p className="text-[14px] text-[#625965]">
                Cash on delivery — check before you pay
              </p>
            </div>

            <div className="flex items-center gap-3 py-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0edfb] text-[#3c2d9d]">
                <Truck size={18} strokeWidth={1.7} />
              </span>
              <p className="text-[14px] text-[#625965]">Delivery nationwide</p>
            </div>

            <div className="flex items-center gap-3 py-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0edfb] text-[#3c2d9d]">
                <RotateCcw size={18} strokeWidth={1.7} />
              </span>
              <p className="text-[14px] text-[#625965]">Easy return policy</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
