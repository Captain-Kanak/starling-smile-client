"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/banners/01.webp",
  "/images/banners/02.webp",
  "/images/banners/03.webp",
  "/images/banners/04.webp",
  "/images/banners/05.webp",
  "/images/banners/06.webp",
  "/images/banners/07.webp",
  "/images/banners/08.webp",
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((current) => (current + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white">
      <div>
        {/* Banner carousel */}
        <div className="group relative overflow-hidden bg-gray-50">
          {/* Banner images */}
          <div className="relative w-full">
            {images.map((src, index) => (
              <div
                key={src}
                className={`${
                  index === currentIndex
                    ? "relative opacity-100"
                    : "absolute inset-0 opacity-0"
                } transition-opacity duration-700`}
                aria-hidden={currentIndex !== index}
              >
                <Image
                  src={src}
                  alt={`Baby store promotional banner ${index + 1}`}
                  width={1920}
                  height={600}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 1280px"
                  className="block h-auto w-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Previous button */}
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous banner"
            className="absolute left-2 top-1/2 z-20 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/70 bg-white/90 text-gray-800 shadow-sm transition hover:bg-white sm:left-4 sm:size-10"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next banner"
            className="absolute right-2 top-1/2 z-20 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/70 bg-white/90 text-gray-800 shadow-sm transition hover:bg-white sm:right-4 sm:size-10"
          >
            <ChevronRight size={22} />
          </button>

          {/* Slide indicators */}
          <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/20 px-2.5 py-2 backdrop-blur-sm sm:bottom-3">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to banner ${index + 1}`}
                aria-current={currentIndex === index ? "true" : undefined}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
