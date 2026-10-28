import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories, products } from "../data/data";

export default function Category() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="mb-9 text-center">
          <p className="mb-3 text-sm font-medium text-indigo-700">Categories</p>

          <h2 className="text-xl font-semibold tracking-tight text-gray-950">
            Shop by category
          </h2>

          <Link
            href="/products"
            className="mt-4 inline-flex items-center gap-2 border-b border-gray-300 pb-1 text-sm text-gray-900 transition-colors hover:border-indigo-600 hover:text-indigo-700"
          >
            All products
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Category grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-2 justify-items-center gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4">
          {categories.map((category) => {
            const productCount = products.filter(
              (product) => product.category === category.name,
            ).length;

            return (
              <Link
                key={category.id}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="group flex w-full flex-col items-center"
              >
                {/* Category image */}
                <div className="relative aspect-square w-32 overflow-hidden rounded-full bg-gray-100 sm:w-36 md:w-40">
                  <Image
                    src={category.image}
                    alt={category.name}
                    loading="eager"
                    fill
                    sizes="(max-width: 640px) 128px, 160px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Category name and product count */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-center">
                  <h3 className="text-sm font-medium text-gray-950 sm:text-base">
                    {category.name}
                  </h3>

                  {productCount > 0 && (
                    <span className="text-xs text-gray-500">
                      {productCount}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
