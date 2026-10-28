import React from "react";
import { products } from "../../data/data";
import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ category: string; sort?: string }>;
}) {
  const params = await searchParams;

  const category = params.category;
  const sort = params.sort;

  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === category,
  );

  const newProducts =
    categoryProducts.length > 0 ? [...categoryProducts] : products;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto">
        {/* Category heading */}
        <div className="border-b border-gray-200 pb-7">
          <h1 className="text-2xl font-semibold capitalize text-gray-950">
            {category}
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {newProducts.length} products
          </p>
        </div>

        {/* Sorting */}
        <div className="flex justify-end py-8">
          <form>
            <label htmlFor="sort" className="mr-3 text-sm">
              Sort
            </label>

            <select
              id="sort"
              name="sort"
              defaultValue={sort}
              className="rounded-full border border-gray-300 bg-white px-5 py-3 text-sm outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </form>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {newProducts.map((product) => (
            <article key={product.id} className="group min-w-0 cursor-pointer">
              <Link href={`/products/${product.sku}`}>
                {/* Product image */}
                <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-[#f5f3f8]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    loading="eager"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* New badge */}
                  <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-800 shadow-sm">
                    New
                  </span>

                  {/* Cart action */}
                  <div className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-gray-950 opacity-0 shadow-md transition-all duration-300 hover:bg-violet-600 hover:text-white group-hover:translate-y-0 group-hover:opacity-100">
                    <Heart size={18} />
                  </div>
                </div>

                {/* Product information */}
                <div className="px-1 pt-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500">
                    {product.category}
                  </p>

                  <h2 className="mt-2 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-gray-900 transition-colors group-hover:text-violet-700 sm:text-base">
                    {product.name}
                  </h2>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <p className="text-base font-semibold text-gray-950">
                      ৳{product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
