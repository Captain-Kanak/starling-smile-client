export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Baby Care",
    slug: "baby-care",
    image: "/images/products/categories/baby-care.webp",
    description: "Gentle lotions, oils, and skincare for your little one.",
  },
  {
    id: "2",
    name: "Toys",
    slug: "toys",
    image: "/images/products/categories/toys.webp",
    description: "Soft plush toys, rattles, and activity gyms for infants.",
  },
  {
    id: "3",
    name: "Feeding",
    slug: "feeding",
    image: "/images/products/categories/feeding.webp",
    description: "Bottles, bibs, sippy cups, and feeding essentials.",
  },
  {
    id: "4",
    name: "Clothing",
    slug: "clothing",
    image: "/images/products/categories/clothing.webp",
    description: "Organic cotton onesies, hats, socks, and newborn wear.",
  },
  {
    id: "5",
    name: "Diapering",
    slug: "diapering",
    image: "/images/products/categories/diapering.webp",
    description: "Eco diapers, rash cream, wipes, and changing essentials.",
  },
  {
    id: "6",
    name: "Nursery",
    slug: "nursery",
    image: "/images/products/categories/nursery.webp",
    description: "Baby mobiles, sound machines, and night lights.",
  },
  {
    id: "7",
    name: "Bath & Skin",
    slug: "bath-skin",
    image: "/images/products/categories/bath-skin.webp",
    description: "Bathtubs, hooded towels, and bath accessories.",
  },
  {
    id: "8",
    name: "Health & Safety",
    slug: "health-safety",
    image: "/images/products/categories/health-safety.webp",
    description: "Thermometers, first aid kits, and safety essentials.",
  },
  {
    id: "9",
    name: "Cleaning",
    slug: "cleaning",
    image: "/images/products/categories/cleaning.webp",
    description: "Bottle brushes, sterilizer bags, and cleaning supplies.",
  },
  {
    id: "10",
    name: "Baby Foods",
    slug: "baby-foods",
    image: "/images/products/categories/baby-foods.webp",
    description: "Rice cereal, organic pouches, and first foods.",
  },
];

export const categoryMap: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.slug, c])
);

export const categoryNames: string[] = categories.map((c) => c.name);
