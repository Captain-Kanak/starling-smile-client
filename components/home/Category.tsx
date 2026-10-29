import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/data";

const backgrounds = [
  "bg-[#EAF3F8]",
  "bg-[#FFF0E8]",
  "bg-[#F0ECFA]",
  "bg-[#EAF5EC]",
  "bg-[#FFF1F4]",
  "bg-[#FFF5DF]",
  "bg-[#E9F5F5]",
  "bg-[#F5EDF8]",
  "bg-[#FCEEF0]",
];

export default function Category() {
  const newCategories = categories.slice(0, 9);

  return (
    <section className="bg-white py-9 sm:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-gray-950 sm:text-xl">
              Categories
            </h2>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Everything your little one needs
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3.5 py-2 text-xs font-medium text-gray-700 transition-all duration-300 hover:border-[#2874D0] hover:bg-[#2874D0] hover:text-white sm:px-4 sm:text-sm"
          >
            View All
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-5 sm:gap-x-5 sm:gap-y-8 md:grid-cols-7 lg:grid-cols-9 lg:gap-x-6">
          {newCategories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="group flex min-w-0 flex-col items-center text-center"
            >
              {/* Category image */}
              <div
                className={`relative flex w-full items-center justify-center overflow-hidden rounded-md ${backgrounds[index % backgrounds.length]} transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_8px_20px_rgba(40,116,208,0.12)] p-2`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={104}
                  height={104}
                  className="size-30 rounded-lg object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>

              {/* Category name */}
              <h3 className="mt-2.5 max-w-full text-[11px] font-medium leading-4 text-gray-700 transition-colors duration-300 group-hover:text-[#2874D0] sm:mt-3 sm:text-xs">
                {category.name}
              </h3>

              {/* Hover accent */}
              <span className="mt-1.5 h-0.5 w-0 rounded-full bg-[#2874D0] transition-all duration-300 group-hover:w-5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
