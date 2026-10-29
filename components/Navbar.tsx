"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X, Search, Gift, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Diapering", href: "/products?category=Diapering" },
  { label: "Baby Foods", href: "/products?category=Baby%20Foods" },
  { label: "Feeding", href: "/products?category=Feeding" },
  { label: "School", href: "/products?category=School" },
  {
    label: "Grooming & Care",
    href: "/products?category=Grooming%20%26%20Care",
  },
  { label: "Toys", href: "/products?category=Toys" },
];

export default function Navbar() {
  const { itemCount, setIsOpen } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = searchQuery.trim();
    if (!query) return;

    window.location.href = `/products?search=${encodeURIComponent(query)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* Top navigation: collapses when scrolling down */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
          isScrolled
            ? "grid-rows-[0fr]"
            : "grid-rows-[1fr] border-b border-gray-100"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          {/* Main top row */}
          <div className="mx-auto flex h-19 max-w-7xl items-center justify-between gap-3 px-4 sm:h-22 sm:gap-4 sm:px-6">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Starling Smile home"
              className="flex shrink-0 items-center"
            >
              <span className="text-lg font-bold tracking-tight text-[#087f8c] sm:text-xl">
                <span className="block text-center text-[9px] font-medium uppercase tracking-[0.3em] text-[#f3a712]">
                  Baby
                </span>
                STARLING
                <span className="ml-1 font-light text-gray-800">SMILE</span>
              </span>
            </Link>

            {/* Desktop search */}
            <form
              onSubmit={handleSearch}
              className="mx-2 hidden max-w-140 flex-1 md:block"
              role="search"
            >
              <div className="flex h-12 items-center gap-3 rounded-full bg-[#f2f2f2] px-5 transition-all focus-within:ring-2 focus-within:ring-[#087f8c]/20">
                <Search size={21} className="shrink-0 text-gray-500" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Product, Brand or Category"
                  aria-label="Search products"
                  className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-500 sm:text-base"
                />
              </div>
            </form>

            {/* Desktop actions */}
            <div className="hidden shrink-0 items-center gap-2.5 md:flex">
              <Link
                href="/products"
                className="flex h-13 items-center gap-2 rounded-full bg-linear-to-r from-[#18a7b7] to-[#00545d] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:px-7 lg:text-base"
              >
                <Gift size={23} strokeWidth={2.5} />
                <span>Special Deal</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label={`Open cart, ${itemCount} items`}
                className="relative flex size-13 cursor-pointer items-center justify-center rounded-full bg-[#edf5f6] text-gray-950 transition-colors hover:bg-[#dcebed]"
              >
                <ShoppingCart size={25} strokeWidth={2} />
                <span className="absolute -right-0.5 -top-1 flex min-w-5 items-center justify-center rounded-full bg-[#00616b] px-1 py-0.5 text-xs font-bold text-white">
                  {itemCount}
                </span>
              </button>
            </div>

            {/* Mobile actions */}
            <div className="flex shrink-0 items-center gap-1.5 md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label={`Open cart, ${itemCount} items`}
                className="relative flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#edf5f6] text-gray-900"
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-[#00616b] text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full text-gray-900 transition-colors hover:bg-gray-100"
              >
                {menuOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="px-4 pb-3 md:hidden">
            <form onSubmit={handleSearch} role="search">
              <div className="flex h-10 items-center gap-2.5 rounded-full bg-[#f2f2f2] px-4">
                <Search size={18} className="shrink-0 text-gray-500" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, brands..."
                  aria-label="Search products"
                  className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-500"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Desktop category navigation stays at the top */}
      <nav
        aria-label="Product categories"
        className="sticky top-0 z-40 hidden bg-[#cbdfe2] md:block"
      >
        <div className="mx-auto flex h-13.5 max-w-7xl items-center justify-center gap-5 overflow-x-auto px-4 lg:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-medium text-gray-950 transition-colors hover:text-[#087f8c] lg:text-base"
            >
              {link.label}
              <ChevronDown
                size={16}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-gray-100 bg-white px-4 py-3 shadow-lg md:hidden">
          <Link
            href="/products"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg px-3 py-3 text-sm font-semibold text-[#087f8c] hover:bg-[#edf5f6]"
          >
            <Gift size={17} className="mr-2 inline-block" />
            Special Deal
          </Link>

          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-[#edf5f6] hover:text-[#087f8c]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
