export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "cat-baby-care",
    name: "Baby Care",
    slug: "baby-care",
    image: "/images/categories/care.webp",
    description: "Gentle lotions, oils, and skincare for your little one.",
  },
  {
    id: "cat-toys",
    name: "Toys",
    slug: "toys",
    image: "/images/categories/toys.webp",
    description: "Soft plush toys, rattles, and activity gyms for infants.",
  },
  {
    id: "cat-feeding",
    name: "Feeding",
    slug: "feeding",
    image: "/images/categories/feeding.webp",
    description: "Bottles, bibs, sippy cups, and feeding essentials.",
  },
  {
    id: "cat-clothing",
    name: "Clothing",
    slug: "clothing",
    image: "/images/categories/clothing.webp",
    description: "Organic cotton onesies, hats, socks, and newborn wear.",
  },
  {
    id: "cat-diapering",
    name: "Diapering",
    slug: "diapering",
    image: "/images/categories/diapering.webp",
    description: "Eco diapers, rash cream, wipes, and changing essentials.",
  },
  {
    id: "cat-nursery",
    name: "Nursery",
    slug: "nursery",
    image: "/images/categories/nursery.webp",
    description: "Baby mobiles, sound machines, and night lights.",
  },
  {
    id: "cat-bath-skin",
    name: "Bath & Skin",
    slug: "bath-skin",
    image: "/images/categories/cleaning.webp",
    description: "Bathtubs, hooded towels, and bath accessories.",
  },
  {
    id: "cat-health-safety",
    name: "Health & Safety",
    slug: "health-safety",
    image: "/images/categories/care.webp",
    description: "Thermometers, first aid kits, and safety essentials.",
  },
  {
    id: "cat-cleaning",
    name: "Cleaning",
    slug: "cleaning",
    image: "/images/categories/cleaning.webp",
    description: "Bottle brushes, sterilizer bags, and cleaning supplies.",
  },
  {
    id: "cat-baby-foods",
    name: "Baby Foods",
    slug: "baby-foods",
    image: "/images/categories/foods.webp",
    description: "Rice cereal, organic pouches, and first foods.",
  },
];

export const categoryMap: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.id, c]),
);

export const categoryMapBySlug: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
);

export const categoryNames: string[] = categories.map((c) => c.name);
