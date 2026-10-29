"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
];

export default function Navbar() {
  const { itemCount, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-1.5"
          aria-label="Starling Smile home"
        >
          <span className="rounded-full bg-[#2874D0] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs">
            baby
          </span>
          <span className="font-semibold text-gray-900 sm:text-lg tracking-tight">
            Starling Smile
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-[#2874D0] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/products"
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-900 transition-all hover:border-[#2874D0] hover:bg-[#2874D0] hover:text-white sm:px-4"
          >
            <ShoppingCart size={14} />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2874D0] px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open menu"
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open cart"
            className="relative p-2 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart size={18} />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 h-3 w-3 shrink-0 rounded-full bg-[#2874D0] text-[9px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 bg-white">
            <div className="px-4 py-4 sm:px-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
