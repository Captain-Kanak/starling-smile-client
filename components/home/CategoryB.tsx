import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, products } from "@/data/data";

export default function CategoryB() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-10 flex items-end justify-between gap-4 sm:mb-12">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Find your favorites
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
              Shop by category
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              Explore our curated collections and find something you love.
            </p>
          </div>

          <Link
            href="/products"
            className="hidden shrink-0 items-center gap-2 text-sm font-medium text-gray-900 transition-colors hover:text-indigo-600 sm:inline-flex"
          >
            View all
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {categories.map((category, index) => {
            const productCount = products.filter(
              (product) => product.category === category.name,
            ).length;

            return (
              <Link
                key={category.id}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="group relative block overflow-hidden rounded-2xl bg-gray-100"
              >
                <div className="relative aspect-3/4 w-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

                  {/* Category information */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <h3 className="text-base font-semibold text-white sm:text-lg">
                          {category.name}
                        </h3>

                        <p className="mt-1 text-xs text-white/75">
                          {productCount}{" "}
                          {productCount === 1 ? "product" : "products"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile view all link */}
        <div className="mt-7 text-center sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900"
          >
            View all products
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
