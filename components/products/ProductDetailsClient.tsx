"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Minus,
  Plus,
  ChevronRight,
  ChevronLeft,
  Truck,
  ShieldCheck,
  RotateCcw,
  X,
} from "lucide-react";

import { products } from "@/data/products";
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
  const [lensPos, setLensPos] = useState<{ x: number; y: number } | null>(null);
  const [isLensVisible, setIsLensVisible] = useState(false);
  const [containerSize, setContainerSize] = useState<{
    w: number;
    h: number;
  } | null>(null);
  const [imgNaturalSize, setImgNaturalSize] = useState<{
    w: number;
    h: number;
  } | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [reviewImagesVisible, setReviewImagesVisible] = useState(6);
  const imageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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

  // Real production screenshots used for the customer review section,
  // one representative screenshot per review category.
  const productImageByCategory: Record<string, string> = {};
  for (const p of products) {
    if (!productImageByCategory[p.categoryId] && p.images?.[0]) {
      productImageByCategory[p.categoryId] = p.images[0];
    }
  }

  const reviewCatToCategoryId: Record<string, string> = {
    care: "cat-baby-care",
    cleaning: "cat-cleaning",
    clothing: "cat-clothing",
    diapering: "cat-diapering",
    feeding: "cat-feeding",
    foods: "cat-baby-foods",
    nursery: "cat-nursery",
    toys: "cat-toys",
  };

  const reviewImageFor = (cat: string) =>
    productImageByCategory[reviewCatToCategoryId[cat]] ??
    "/images/pro-placeholder.png";

  const baseReviewCats = [
    "care",
    "cleaning",
    "clothing",
    "diapering",
    "feeding",
    "foods",
    "nursery",
    "toys",
  ];

  const reviewImageEntries = (() => {
    const repeats = Math.ceil(
      Math.max(reviewImagesVisible, baseReviewCats.length) /
        baseReviewCats.length,
    );
    const entries: { cat: string; image: string }[] = [];
    for (let r = 0; r < repeats; r++) {
      for (const cat of baseReviewCats) {
        entries.push({ cat, image: reviewImageFor(cat) });
      }
    }
    return entries;
  })();

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

  const getZoomStyles = () => {
    if (!lensPos || !containerSize || !imgNaturalSize) return {};

    const containerAspect = containerSize.w / containerSize.h;
    const imageAspect = imgNaturalSize.w / imgNaturalSize.h;

    let renderW: number;
    let renderH: number;

    if (containerAspect > imageAspect) {
      renderH = containerSize.h;
      renderW = containerSize.h * imageAspect;
    } else {
      renderW = containerSize.w;
      renderH = containerSize.w / imageAspect;
    }

    const offsetX = (containerSize.w - renderW) / 2;
    const offsetY = (containerSize.h - renderH) / 2;

    const imgX = (lensPos.x - offsetX) / renderW;
    const imgY = (lensPos.y - offsetY) / renderH;

    return {
      backgroundImage: `url(${image})`,
      backgroundSize: `${renderW * 2}px ${renderH * 2}px`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: `${Math.max(0, Math.min(100, imgX * 100))}% ${Math.max(0, Math.min(100, imgY * 100))}%`,
      opacity: 0.85,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLensPos({ x, y });
    if (!containerSize) {
      setContainerSize({ w: rect.width, h: rect.height });
    }
  };

  const handleMouseEnter = () => {
    setIsLensVisible(true);
    if (containerSize) {
      setLensPos({ x: containerSize.w / 2, y: containerSize.h / 2 });
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9f6] text-[#242b29]">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:py-10 sm:px-6 lg:px-8">
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
            <div
              ref={imageRef}
              className="relative h-79 w-full mx-auto sm:h-99 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setIsLensVisible(false)}
            >
              <Image
                ref={imgRef}
                key={image}
                src={image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 480px"
                className={`object-cover w-full h-full ${
                  isLensVisible ? "opacity-0" : ""
                }`}
                onLoad={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  if (img.naturalWidth && img.naturalHeight) {
                    setImgNaturalSize({
                      w: img.naturalWidth,
                      h: img.naturalHeight,
                    });
                  }
                }}
              />
              {isLensVisible && lensPos && containerSize && imgNaturalSize && (
                <div
                  className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
                  style={getZoomStyles()}
                />
              )}
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

                  <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/85 backdrop-blur px-2.5 py-1 text-[10px] font-medium text-gray-600 shadow-sm sm:px-3 sm:py-1.5 sm:text-xs">
                    {selectedImage + 1} / {galleryImages.length}
                  </span>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-2 mt-2">
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
          <section className="min-w-0 flex flex-col justify-between">
            {/* Essential product info */}
            <div className="flex-1 space-y-3">
              {/* Product title */}
              <h1 className="text-xl font-bold leading-none tracking-tight text-[#252c29] sm:text-2xl">
                {product.name}
              </h1>

              {/* Product code */}
              <p className="mt-1 text-[10px] text-gray-400">
                Product code:{" "}
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

              {/* PURCHASING CONTROLS: Quantity Selector & Horizontal Action Buttons */}
              <div className="mt-5 space-y-3">
                {/* Quantity selector row */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-36 items-center justify-between rounded-lg border border-gray-200 bg-white px-2 shadow-sm">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((current) => Math.max(1, current - 1))
                      }
                      disabled={!isInStock || quantity <= 1}
                      aria-label="Decrease quantity"
                      className="cursor-pointer flex size-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-[#087f8c] disabled:opacity-30 transition"
                    >
                      <Minus size={12} />
                    </button>

                    <span className="text-xs font-semibold text-gray-700">
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
                      className="cursor-pointer flex size-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-[#087f8c] disabled:opacity-30 transition"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {isInStock && availableStock > 0 && (
                    <span className="text-xs font-medium text-gray-500">
                      {availableStock} items available
                    </span>
                  )}
                </div>

                {/* Buy Now & Add to Cart flex row */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    disabled={!isInStock}
                    className="cursor-pointer flex-1 flex h-10 items-center justify-center rounded-lg bg-[#087f8c] text-xs font-bold text-white shadow-sm transition hover:bg-[#066b82] disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    Buy Now
                  </button>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!isInStock}
                    className="cursor-pointer flex-1 flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white text-xs font-bold text-[#242b29] shadow-sm transition hover:bg-gray-50 hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ShoppingCart size={14} />
                    {isInStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>

                {/* Benefits stats */}
                <div className="grid grid-cols-3 gap-2 rounded-lg bg-[#f7f8f6] p-3 border border-gray-100">
                  <div className="flex flex-col items-center justify-center gap-1 text-center">
                    <Truck size={16} className="text-[#087f8c]" />
                    <span className="text-[10px] font-medium text-gray-600 sm:text-[11px]">
                      Fast Delivery
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 text-center border-x border-gray-200">
                    <ShieldCheck size={16} className="text-[#087f8c]" />
                    <span className="text-[10px] font-medium text-gray-600 sm:text-[11px]">
                      Quality Assured
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 text-center">
                    <RotateCcw size={16} className="text-[#087f8c]" />
                    <span className="text-[10px] font-medium text-gray-600 sm:text-[11px]">
                      Easy Returns
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* PRODUCT DESCRIPTION */}
        <section className="mt-10 border-t border-gray-200 pt-6 sm:mt-12 sm:pt-8">
          <div className="flex flex-wrap gap-5 border-b border-gray-200 mb-5 sm:mb-6">
            <div className="relative pb-2 text-[10px] font-bold text-[#087f8c] uppercase tracking-wider">
              Product Details
              <span className="absolute bottom-0 left-0 h-px w-full bg-[#087f8c]" />
            </div>
          </div>

          <div className="px-6 py-6 sm:py-7">
            <h2 className="text-sm font-bold text-gray-800 mb-3">
              Description
            </h2>
            <p className="whitespace-pre-line text-xs leading-7 text-gray-500 sm:text-[13px]">
              {product.description || "No description available."}
            </p>
          </div>
        </section>

        {/* CUSTOMER REVIEW IMAGES */}
        <section className="mt-10 border-t border-gray-200 pt-6 sm:mt-12 sm:pt-8">
          <div className="flex flex-wrap gap-5 border-b border-gray-200 mb-5 sm:mb-6">
            <div className="relative pb-2 text-[10px] font-bold text-[#087f8c] uppercase tracking-wider">
              Customer Reviews
              <span className="absolute bottom-0 left-0 h-px w-full bg-[#087f8c]" />
            </div>
          </div>

          <div className="px-6 py-6 sm:py-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {reviewImageEntries
                .slice(0, reviewImagesVisible)
                .map(({ cat, image }, i) => (
                  <div key={`${cat}-${i}`} className="relative group">
                    <button
                      type="button"
                      onClick={() => setPreviewImage(image)}
                      className="block overflow-hidden rounded-xl border border-gray-200 bg-white w-full h-52 sm:h-70 items-center justify-center cursor-pointer transition hover:border-[#087f8c]"
                    >
                      <Image
                        src={image}
                        alt={`Customer review ${cat}`}
                        fill
                        sizes="(max-width: 1023px) 100vw, 120px"
                        className="object-cover w-full h-full"
                      />
                    </button>
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-[#f8f9f6] px-2 py-0.5 rounded-full border border-gray-200 text-[10px] font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition">
                      {cat}
                    </span>
                  </div>
                ))}
            </div>

            <button
              type="button"
              onClick={() => setReviewImagesVisible((current) => current + 5)}
              className="mt-6 inline-flex items-center gap-1.5 cursor-pointer text-[11px] font-semibold text-[#087f8c] hover:text-[#066b8c] transition"
            >
              Load More <span className="text-xs">+</span>
            </button>

            {/* Preview Modal */}
            {previewImage && (
              <div
                className="fixed inset-0 z-60 flex items-center justify-center"
                role="dialog"
                aria-modal="true"
                onClick={() => setPreviewImage(null)}
              >
                <div
                  className="fixed inset-0 bg-black/75 backdrop-blur-md"
                  onClick={() => setPreviewImage(null)}
                />
                <div
                  className="relative bg-white rounded-3xl shadow-2xl max-w-180 max-h-[82vh] flex flex-col items-center justify-center p-2 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setPreviewImage(null)}
                    className="absolute top-6 right-6 z-10 cursor-pointer text-gray-400 hover:text-black bg-white rounded-full p-2 shadow-lg transition"
                    aria-label="Close preview"
                  >
                    <X size={22} strokeWidth={2.5} className="text-black" />
                  </button>

                  <div className="relative w-full max-w-160 max-h-[70vh] flex items-center justify-center overflow-hidden bg-transparent p-0">
                  <Image
                    src={previewImage}
                    alt="Preview"
                    className="object-contain w-auto h-auto max-w-full max-h-[64vh] rounded-xl"
                    fill
                    sizes="(max-width: 160px) 160px, 160px"
                  />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
