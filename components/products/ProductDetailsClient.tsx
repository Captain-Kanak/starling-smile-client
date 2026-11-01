"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Minus, Plus, ChevronRight } from "lucide-react";
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

  const galleryImages = images.length > 0 ? images : ["/images/pro-placeholder.png"];
  const image = galleryImages[selectedImage] ?? galleryImages[0];

  const variant = selectedVariant ?? product.variants[0] ?? null;
  const category = categories.find((c) => c.id === product.categoryId);

  const price = Number(variant?.price) || 0;
  const compareAtPrice = variant?.compareAtPrice;
  const stock = variant?.inventory;
  const isInStock = Boolean(stock && stock.available > 0);
  const isLowStock = Boolean(stock && stock.available > 0 && stock.available <= 5);

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
    product.variants.find((v) => v.attributes.Size === size && v.attributes.Color === color);

  const currentSize = variant?.attributes.Size;
  const availableColors = getAvailableColors(currentSize);

  const handleAddToCart = () => {
    if (!isInStock) return;
    console.log("Add to cart:", { product, variant, quantity, total: price * quantity });
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-1.5 text-[11px] text-gray-400 uppercase tracking-widest sm:mb-10 sm:text-xs"
        >
          <Link href="/" className="transition-colors hover:text-[#087f8c]">
            Home
          </Link>

          <ChevronRight size={10} />

          <Link
            href="/products"
            className="transition-colors hover:text-[#087f8c]"
          >
            Products
          </Link>

          <ChevronRight size={10} />

          <span className="max-w-[320px] truncate font-medium text-gray-700">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Image gallery */}
          <section className="flex flex-col gap-6">
            <div className="relative w-full overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-sm sm:rounded-[32px]">
              <div className="relative aspect-square overflow-hidden sm:aspect-[4/5]">
                <Image
                  key={image}
                  src={image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1023px) 100vw, 45vw"
                  className="object-cover w-full h-full"
                />
              </div>
              {galleryImages.length > 1 && (
                <span className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/70 backdrop-blur-md px-3 py-1 text-[10px] font-semibold text-gray-700 shadow-sm sm:px-4 sm:py-2 sm:text-xs">
                  {selectedImage + 1} / {galleryImages.length}
                </span>
              )}
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {galleryImages.map((thumbnail, index) => (
                <button
                  key={`${thumbnail}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-pressed={selectedImage === index}
                  className={`relative size-16 shrink-0 cursor-pointer rounded-xl border overflow-hidden bg-white transition-all duration-200 ${
                    selectedImage === index
                      ? "border-[#087f8c] ring-2 ring-[#087f8c]/20 shadow-md"
                      : "border-transparent hover:border-gray-200 hover:shadow-sm"
                  }`}
                >
                  <Image
                    src={thumbnail}
                    alt={`View ${index + 1}`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Right: Product info + buy bar */}
          <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Link
                href={`/products?category=${encodeURIComponent(category?.name || product.categoryId)}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-3.5 sm:py-1.5 sm:text-xs hover:border-[#087f8c]/50 hover:text-[#087f8c] transition-all"
              >
                {category?.name || product.categoryId}
              </Link>

              <h1 className="text-2xl font-bold leading-none tracking-tight text-gray-950 sm:text-3xl xl:text-[38px]">
                {product.name}
              </h1>

              <p className="text-xs text-gray-400 sm:text-sm">
                Product code:{""}
                <span className="font-medium text-gray-800">{variant?.sku}</span>
              </p>
            </div>

            {/* Stock */}
            <div className="inline-flex items-center gap-1.5">
              {!isInStock ? (
                <span className="rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-[10px] font-semibold text-rose-600 sm:px-3.5 sm:py-1.5 sm:text-xs">
                  Out of stock
                </span>
              ) : isLowStock ? (
                <span className="rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-[10px] font-semibold text-amber-600 sm:px-3.5 sm:py-1.5 sm:text-xs">
                  Only {stock?.available} left
                </span>
              ) : (
                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-600 sm:px-3.5 sm:py-1.5 sm:text-xs">
                  In stock
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
                ৳{formatPrice(price)}
              </span>
              {compareAtPrice && compareAtPrice > price && (
                <span className="text-xs font-medium line-through text-gray-400 sm:text-sm">
                  ৳{formatPrice(compareAtPrice)}
                </span>
              )}
              {compareAtPrice && compareAtPrice > price && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded sm:text-sm">
                  Save {Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Variants */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Choose options
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {getAvailableSizes().map((v) => {
                      const active = variant?.attributes.Size === v.attributes.Size;
                      return (
                        <button
                          key={v.attributes.Size}
                          type="button"
                          onClick={() => handleSelectVariant(v)}
                          aria-pressed={active}
                          className={`min-w-[48px] cursor-pointer items-center justify-center rounded-lg border px-2 py-1.5 text-[10px] font-medium transition-all duration-200 ${
                            active
                              ? "border-[#087f8c] bg-[#087f8c] text-white shadow-sm"
                              : "border-gray-100 bg-white text-gray-600 hover:border-[#087f8c]/50 hover:text-[#087f8c]"
                          } sm:px-3 sm:py-2 sm:text-xs`}
                        >
                          {v.attributes.Size}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {availableColors.map((v) => {
                      const active = variant?.attributes.Color === v.attributes.Color;
                      const matched = getVariantBySizeColor(
                        currentSize ?? "",
                        v.attributes.Color,
                      );
                      const disabled = matched && matched.inventory.available <= 0;
                      return (
                        <button
                          key={v.attributes.Color}
                          type="button"
                          onClick={() => {
                            if (matched) handleSelectVariant(matched);
                          }}
                          disabled={disabled}
                          aria-pressed={active}
                          className={`min-w-[48px] cursor-pointer items-center justify-center rounded-lg border px-2 py-1.5 text-[10px] font-medium transition-all duration-200 ${
                            active
                              ? "border-[#087f8c] bg-[#087f8c] text-white shadow-sm"
                              : disabled
                                ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                                : "border-gray-100 bg-white text-gray-600 hover:border-[#087f8c]/50 hover:text-[#087f8c]"
                          } sm:px-3 sm:py-2 sm:text-xs`}
                        >
                          {v.attributes.Color}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                  Quantity
                </label>
                <span className="text-xs text-gray-400">
                  {stock?.available ?? 0} available
                </span>
              </div>
              <div className="flex h-10 w-32 items-center justify-between rounded-lg border border-gray-100 bg-white px-2 shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity((c) => Math.max(1, c - 1))}
                  disabled={quantity <= 1 || !isInStock}
                  aria-label="Decrease quantity"
                  className="flex size-8 cursor-pointer items-center justify-center rounded text-gray-500 transition-all duration-200 disabled:opacity-30 hover:bg-gray-50 disabled:cursor-not-allowed"
                >
                  <Minus size={12} strokeWidth={2} />
                </button>
                <span className="min-w-6 text-center text-xs font-semibold text-gray-900 sm:text-sm">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((c) => c + 1)}
                  disabled={!isInStock}
                  aria-label="Increase quantity"
                  className="flex size-8 cursor-pointer items-center justify-center rounded text-gray-500 transition-all duration-200 disabled:opacity-50 hover:bg-gray-50 disabled:cursor-not-allowed"
                >
                  <Plus size={12} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Buy bar */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!isInStock}
              className={`mt-2 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold tracking-tight uppercase transition-all duration-200 active:scale-[0.98] ${
                isInStock
                  ? "border border-[#087f8c] bg-[#087f8c] text-white shadow-lg shadow-[#087f8c]/25 hover:bg-[#066b82] hover:shadow-xl"
                  : "border border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
              } sm:min-h-14 sm:py-3 sm:text-sm`}
            >
              <ShoppingCart size={16} strokeWidth={2} />
              {isInStock ? "Add to Cart" : "Out of Stock"}
            </button>

            {!isInStock && (
              <div className="mt-2 flex items-center justify-between gap-2 px-1 text-[10px] text-gray-400 sm:mt-3 sm:text-xs">
                <span>Subtotal ({quantity} {quantity === 1 ? "item" : "items"})</span>
                <span className="font-bold text-gray-900">
                  ৳{formatPrice(price * quantity)}
                </span>
              </div>
            )}
          </section>
        </div>

        {/* Description */}
        {product.description && (
          <section className="mt-14 sm:mt-20">
            <div className="rounded-[20px] border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-5 sm:px-8 sm:py-6">
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">Product details</h2>
                <p className="mt-3 text-gray-600 leading-relaxed sm:text-sm">
                  {product.description}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <section className="mt-10 sm:mt-14">
            <div className="rounded-[20px] border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50 px-6 py-4 sm:px-8 sm:py-5">
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">Specifications</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="px-6 py-4 sm:px-8 sm:py-5">
                    <div className="flex justify-between items-start">
                      <dt className="text-sm text-gray-400">{key}</dt>
                      <dd className="text-sm font-medium text-gray-900">{value}</dd>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
