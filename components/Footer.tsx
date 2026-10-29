import Link from "next/link";

const footerLinks = {
  shop: [
    { label: "All products", href: "/products" },
    { label: "New arrivals", href: "/products" },
    { label: "Baby care", href: "/products?category=Baby care" },
    { label: "Toys", href: "/products?category=Toys" },
    { label: "Feeding", href: "/products?category=Feeding" },
    { label: "Clothing", href: "/products?category=Clothing" },
  ],
  support: [
    { label: "Contact us", href: "/contact" },
    { label: "Shipping & delivery", href: "/shipping" },
    { label: "Returns & exchanges", href: "/returns" },
    { label: "Order tracking", href: "/track" },
    { label: "FAQs", href: "/faq" },
  ],
  company: [
    { label: "About us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-6 mb-12">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1.5 mb-6">
              <span className="rounded-full bg-[#2874D0] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                baby
              </span>
              <span className="font-semibold text-gray-900 text-lg tracking-tight">
                Starling Smile
              </span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Gentle essentials for your little one. Quality baby products
              delivered with care.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#2874D0] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Support
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#2874D0] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#2874D0] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Starling Smile. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-gray-500 hover:text-[#2874D0] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-gray-500 hover:text-[#2874D0] transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
