"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Minus,
  Plus,
  ChevronRight,
  ChevronLeft,
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
  const [selectedVariant, setSelectedVariant] = useState<
    Product["variants"][number] | null
  >(null);

  const images =
    product.images?.filter(
      (image): image is string =>
        typeof image === "string" && image.trim().length > 0,
    ) ?? [];

  const galleryImages =
    images.length > 0 ? images : ["/images/pro-placeholder.png"];

  const image = galleryImages[selectedImage] ?? galleryImages[0];

  const variant = selectedVariant ?? product.variants[0] ?? null;

  const category = categories.find((c) => c.id === product.categoryId);

  const price = Number(variant?.price) || 0;
  const compareAtPrice = variant?.compareAtPrice;
  const availableStock = variant?.inventory?.available ?? 0;

  const isInStock = availableStock > 0;
  const isLowStock = isInStock && availableStock <= 5;

  const currentSize = variant?.attributes.Size;
  const currentColor = variant?.attributes.Color;

  const formatPrice = (value: number) =>
    value.toLocaleString("en-BD", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

  const handleSelectVariant = (v: Product["variants"][number]) => {
    setSelectedVariant(v);
    setQuantity(1);
  };

  const getAvailableSizes = () => {
    const seen = new Set<string>();
    return product.variants.filter((v) => {
      if (seen.has(v.attributes.Size)) return false;
      seen.add(v.attributes.Size);
      return true;
    });
  };

  const getAvailableColors = (size?: string) => {
    const seen = new Set<string>();
    return product.variants.filter((v) => {
      if (size && v.attributes.Size !== size) return false;
      if (seen.has(v.attributes.Color)) return false;
      seen.add(v.attributes.Color);
      return true;
    });
  };

  const getVariantBySizeColor = (size: string, color: string) =>
    product.variants.find(
      (v) => v.attributes.Size === size && v.attributes.Color === color,
    );

  const getColorCode = (color: string) => {
    const colors: Record<string, string> = {
      "olive green": "#556b45",
      olive: "#68784d",
      green: "#64865a",
      "forest green": "#315b43",
      "sage green": "#a2ad91",
      "sky blue": "#91bcd8",
      blue: "#5285bb",
      navy: "#263c5b",
      black: "#252525",
      white: "#ffffff",
      cream: "#f2e8d5",
      beige: "#d9c8ad",
      brown: "#8b6547",
      pink: "#e6a9b8",
      red: "#d76c68",
      grey: "#929292",
      gray: "#929292",
      yellow: "#e7c56c",
      purple: "#9479b6",
    };
    return (
      colors[color.toLowerCase()] || (color.startsWith("#") ? color : "#c4c4c4")
    );
  };

  const handleAddToCart = () => {
    if (!isInStock || !variant) return;
    console.log("Add to cart:", {
      product,
      variant,
      quantity,
      total: price * quantity,
    });
  };

  const handleBuyNow = () => {
    if (!isInStock || !variant) return;
    console.log("Buy now:", {
      product,
      variant,
      quantity,
      total: price * quantity,
    });
  };

  return (
    <main className="min-h-screen bg-[#f8f9f6] text-[#242b29]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-1.5 overflow-hidden text-[10px] text-gray-400 uppercase tracking-widest sm:mb-8"
        >
          <Link href="/" className="transition hover:text-[#087f8c]">
            Home
          </Link>

          <ChevronRight size={10} />

          <Link href="/products" className="transition hover:text-[#087f8c]">
            Products
          </Link>

          <ChevronRight size={10} />

          <Link
            href={`/products?category=${encodeURIComponent(
              category?.name || product.categoryId,
            )}`}
            className="transition hover:text-[#087f8c]"
          >
            {category?.name || product.categoryId}
          </Link>

          <ChevronRight size={10} />

          <span className="truncate font-medium text-gray-700">
            {product.name}
          </span>
        </nav>

        {/* PRODUCT LAYOUT */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
          {/* LEFT: PRODUCT GALLERY */}
          <section className="min-w-0 flex flex-col gap-4">
            {/* Main image */}
            <div className="relative h-65 w-full sm:h-85 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <Image
                key={image}
                src={image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 480px"
                className="object-contain w-full h-full"
              />
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImage(
                        (current) =>
                          (current - 1 + galleryImages.length) %
                          galleryImages.length,
                      )
                    }
                    aria-label="Previous image"
                    className="cursor-pointer absolute left-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm hover:bg-white transition"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImage(
                        (current) => (current + 1) % galleryImages.length,
                      )
                    }
                    aria-label="Next image"
                    className="cursor-pointer absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm hover:bg-white transition"
                  >
                    <ChevronRight size={16} />
                  </button>

                  <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/80 backdrop-blur px-2.5 py-1 text-[10px] font-medium text-gray-600 shadow-sm sm:px-3 sm:py-1.5 sm:text-xs">
                    {selectedImage + 1} / {galleryImages.length}
                  </span>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-2 mt-4">
                <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {galleryImages.map((thumbnail, index) => (
                    <button
                      key={`${thumbnail}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      aria-label={`View product image ${index + 1}`}
                      aria-pressed={selectedImage === index}
                      className={`relative aspect-square w-14 shrink-0 overflow-hidden rounded-lg border bg-[#f3f5f1] transition sm:w-16 ${
                        selectedImage === index
                          ? "border-2 border-[#087f8c] shadow-sm"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={thumbnail}
                        alt={`${product.name} view ${index + 1}`}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* RIGHT: PRODUCT INFORMATION */}
          <section className="min-w-0 flex h-65 sm:h-85 flex-col justify-between">
            {/* Essential product info */}
            <div className="flex-1 space-y-3">
              {/* Product title */}
              <h1 className="text-xl font-bold leading-none tracking-tight text-[#252c29] sm:text-2xl">
                {product.name}
              </h1>

              {/* Product code */}
              <p className="mt-1 text-[10px] text-gray-400">
                Product code:{""}
                <span className="font-medium text-gray-600">
                  {variant?.sku || "N/A"}
                </span>
              </p>

              {/* Stock */}
              <div className="mt-2 flex items-center gap-1.5">
                <span
                  className={`size-1.5 rounded-full ${
                    !isInStock
                      ? "bg-red-500"
                      : isLowStock
                        ? "bg-amber-500"
                        : "bg-green-500"
                  }`}
                />

                <span
                  className={`text-[11px] font-medium ${
                    !isInStock
                      ? "text-red-600"
                      : isLowStock
                        ? "text-amber-600"
                        : "text-green-600"
                  }`}
                >
                  {!isInStock
                    ? "Out of stock"
                    : isLowStock
                      ? `Only ${availableStock} left`
                      : "In stock"}
                </span>
              </div>

              {/* Price */}
              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                <span className="text-lg font-extrabold tracking-tight text-[#202925] sm:text-xl">
                  ৳{formatPrice(price)}
                </span>

                {compareAtPrice && compareAtPrice > price && (
                  <>
                    <span className="text-xs text-gray-400 line-through sm:text-sm">
                      ৳{formatPrice(compareAtPrice)}
                    </span>

                    <span className="rounded bg-[#edf5ef] px-2 py-0.5 text-[10px] font-bold text-green-700">
                      SAVE{" "}
                      {Math.round(
                        ((compareAtPrice - price) / compareAtPrice) * 100,
                      )}
                      %
                    </span>
                  </>
                )}
              </div>

              {/* Short description */}
              {product.description && (
                <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-gray-500 sm:text-[12px]">
                  {product.description}
                </p>
              )}

              {/* COLOR */}
              {getAvailableColors(currentSize).length > 0 && (
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center justify-between shrink-0">
                    <h2 className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                      Color:
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {getAvailableColors(currentSize).map((v) => {
                      const active = currentColor === v.attributes.Color;

                      const matched = getVariantBySizeColor(
                        currentSize ?? "",
                        v.attributes.Color,
                      );

                      const disabled =
                        !matched || matched.inventory.available <= 0;

                      return (
                        <button
                          key={v.attributes.Color}
                          type="button"
                          title={v.attributes.Color}
                          aria-label={`Select ${v.attributes.Color}`}
                          aria-pressed={active}
                          disabled={disabled}
                          onClick={() => {
                            if (matched && !disabled) {
                              handleSelectVariant(matched);
                            }
                          }}
                          className={`cursor-pointer flex size-5 shrink-0 items-center justify-center rounded-full border transition ${
                            active
                              ? "border-[#087f8c] ring-2 ring-[#087f8c]/20 ring-offset-2"
                              : "border-gray-200 hover:border-gray-400"
                          } disabled:cursor-not-allowed disabled:opacity-30`}
                        >
                          <span
                            className="size-4 rounded-full border border-black/5"
                            style={{
                              backgroundColor: getColorCode(v.attributes.Color),
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SIZE */}
              {getAvailableSizes().length > 0 && (
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center justify-between shrink-0">
                    <h2 className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                      Size:
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {getAvailableSizes().map((v) => {
                      const active = currentSize === v.attributes.Size;

                      return (
                        <button
                          key={v.attributes.Size}
                          type="button"
                          onClick={() => handleSelectVariant(v)}
                          aria-pressed={active}
                          className={`cursor-pointer flex h-7 min-w-7 items-center justify-center rounded-lg border px-2.5 text-[10px] font-medium transition ${
                            active
                              ? "border-[#087f8c] bg-[#087f8c] text-white shadow-sm"
                              : "border-gray-200 bg-white text-gray-600 hover:border-[#087f8c] hover:shadow-sm"
                          }`}
                        >
                          {v.attributes.Size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ADD TO CART */}
              <div className="mt-5">
                <div className="flex items-center gap-2">
                  {/* Quantity */}
                  <div className="flex h-8 shrink-0 items-center rounded-md border border-gray-200">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((current) => Math.max(1, current - 1))
                      }
                      disabled={!isInStock || quantity <= 1}
                      aria-label="Decrease quantity"
                      className="cursor-pointer flex size-6 items-center justify-center text-gray-500 hover:text-[#087f8c] disabled:opacity-30"
                    >
                      <Minus size={10} />
                    </button>

                    <span className="w-5 text-center text-[10px] font-semibold">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((current) =>
                          Math.min(availableStock, current + 1),
                        )
                      }
                      disabled={!isInStock || quantity >= availableStock}
                      aria-label="Increase quantity"
                      className="cursor-pointer flex size-6 items-center justify-center text-gray-500 hover:text-[#087f8c] disabled:opacity-30"
                    >
                      <Plus size={10} />
                    </button>
                  </div>

                  {/* Cart button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!isInStock}
                    className="cursor-pointer flex h-8 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-[#087f8c] px-3 text-[10px] font-bold text-white transition hover:bg-[#066b82] disabled:cursor-not-allowed disabled:bg-gray-300 sm:text-xs sm:px-4"
                  >
                    <ShoppingCart size={13} />
                    {isInStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>

                {/* Buy now */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={!isInStock}
                  className="cursor-pointer mt-2 h-7 w-full rounded-lg bg-[#eef3ec] text-[10px] font-bold text-[#087f8c] uppercase tracking-wider transition hover:bg-[#e2eadf] disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs sm:h-8"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* PRODUCT DESCRIPTION & SPECIFICATIONS */}
        <section className="mt-10 border-t border-gray-200 pt-6 sm:mt-12 sm:pt-8">
          <div className="flex flex-wrap gap-5 border-b border-gray-200 mb-5 sm:mb-6">
            <div className="relative pb-2 text-[10px] font-bold text-[#087f8c] uppercase tracking-wider">
              Product Details
              <span className="absolute bottom-0 left-0 h-px w-full bg-[#087f8c]" />
            </div>
          </div>

          <div className="grid gap-6 py-6 lg:grid-cols-2 sm:py-7">
            {/* Description */}
            <div>
              <h2 className="text-sm font-bold text-gray-800">Description</h2>

              <p className="mt-3 whitespace-pre-line text-xs leading-7 text-gray-500 sm:text-[13px]">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-sm font-bold text-gray-800">
                Specifications
              </h2>

              {product.specifications &&
              Object.keys(product.specifications).length > 0 ? (
                <div className="mt-3 divide-y divide-gray-100">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between gap-5 py-3 text-xs sm:text-sm"
                      >
                        <span className="text-gray-400">{key}</span>
                        <span className="text-right font-medium text-gray-700">
                          {value}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <p className="mt-3 text-xs text-gray-400">
                  No specifications available.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
