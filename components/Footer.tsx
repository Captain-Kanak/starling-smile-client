"use client";

import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const aboutLinks = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Brands", href: "/brands" },
  { label: "Return & Refund Policy", href: "/returns" },
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cashback Terms & Conditions", href: "/cashback" },
  { label: "Dashboard", href: "/dashboard" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: FaFacebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: FaInstagram,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/",
    icon: FaTwitter,
  },
];

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Contact Us */}
          <section className="lg:col-span-4">
            <h2 className="mb-7 text-xl font-medium tracking-tight text-gray-950 sm:text-2xl">
              Contact Us
            </h2>

            <div className="space-y-5">
              {/* Phone */}
              <a
                href="tel:09614332211"
                className="flex min-h-25.5 items-center gap-5 rounded-[20px] border border-[#dedede] p-4 transition-colors hover:border-[#087f8c]/40 sm:p-5"
              >
                <span className="flex size-17.5 shrink-0 items-center justify-center rounded-full bg-[#edf5f6] text-gray-950">
                  <Phone size={25} strokeWidth={2} />
                </span>

                <span className="min-w-0">
                  <span className="block text-base text-gray-700">
                    Hotline:
                  </span>
                  <span className="mt-0.5 block wrap-break-word text-lg font-medium text-gray-950 sm:text-xl">
                    09614332211
                  </span>
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:info@babycare.com.bd"
                className="flex min-h-25.5 items-center gap-5 rounded-[20px] border border-[#dedede] p-4 transition-colors hover:border-[#087f8c]/40 sm:p-5"
              >
                <span className="flex size-17.5 shrink-0 items-center justify-center rounded-full bg-[#edf5f6] text-gray-950">
                  <Mail size={27} strokeWidth={2} />
                </span>

                <span className="min-w-0">
                  <span className="block text-base text-gray-700">
                    Support:
                  </span>
                  <span className="mt-0.5 block wrap-break-word text-base font-medium text-gray-950 sm:text-lg">
                    info@babycare.com.bd
                  </span>
                </span>
              </a>
            </div>
          </section>

          {/* About Us */}
          <section className="lg:col-span-5">
            <h2 className="mb-7 text-xl font-medium tracking-tight text-gray-950 sm:text-2xl">
              About Us
            </h2>

            <div className="grid grid-cols-2 gap-x-5 gap-y-6">
              {aboutLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm leading-6 text-gray-700 transition-colors hover:text-[#087f8c] sm:text-base"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          {/* Connect Us */}
          <section className="lg:col-span-3">
            <h2 className="mb-7 text-xl font-medium tracking-tight text-gray-950 sm:text-2xl">
              Follow Us
            </h2>

            <div className="flex flex-wrap items-center gap-3.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-15 items-center justify-center rounded-full border border-[#e5e5e5] text-gray-950 transition-all duration-300 hover:border-[#087f8c] hover:bg-[#edf5f6] hover:text-[#087f8c]"
                >
                  <Icon size={29} strokeWidth={2} />
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Starling Smile. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 transition-colors hover:text-[#087f8c]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-sm text-gray-500 transition-colors hover:text-[#087f8c]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
