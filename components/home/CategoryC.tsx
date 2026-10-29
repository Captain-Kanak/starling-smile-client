import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories, products } from "@/data/data";

export default function CategoryC() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Explore collections
          </p>

          <h2 className="text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
            Shop by category
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            Find everything you need, all in one place.
          </p>

          <Link
            href="/products"
            className="group mt-4 inline-flex items-center gap-2 border-b border-gray-300 pb-1 text-sm font-medium text-gray-900 transition-colors hover:border-indigo-600 hover:text-indigo-600"
          >
            All products
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Category grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-2 justify-items-center gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4">
          {categories.map((category) => {
            const productCount = products.filter(
              (product) => product.category === category.name,
            ).length;

            return (
              <Link
                key={category.id}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="group flex w-full flex-col items-center rounded-2xl px-2 py-3 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Category image */}
                <div className="relative aspect-square w-32 overflow-hidden rounded-full border border-gray-100 bg-gray-50 shadow-sm transition-all duration-300 group-hover:border-indigo-200 group-hover:shadow-lg group-hover:shadow-indigo-100/60 sm:w-36 md:w-44">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 176px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                {/* Category name and product count */}
                <div className="mt-4 flex flex-col items-center gap-2 text-center">
                  <h3 className="text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600 sm:text-base">
                    {category.name}
                  </h3>

                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-500 transition-colors duration-300 group-hover:bg-indigo-50 group-hover:text-indigo-600">
                    {productCount} {productCount === 1 ? "product" : "products"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
