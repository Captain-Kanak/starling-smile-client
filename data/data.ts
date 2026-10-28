interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  images: string[];
  price: number;
  category: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "category1",
    image: "/images/cat-placeholder.jpg",
  },
  {
    id: 2,
    name: "category2",
    image: "/images/cat-placeholder.jpg",
  },
  {
    id: 3,
    name: "category3",
    image: "/images/cat-placeholder.jpg",
  },
  {
    id: 4,
    name: "category4",
    image: "/images/cat-placeholder.jpg",
  },
  {
    id: 5,
    name: "category5",
    image: "/images/cat-placeholder.jpg",
  },
  {
    id: 6,
    name: "category6",
    image: "/images/cat-placeholder.jpg",
  },
  {
    id: 7,
    name: "category7",
    image: "/images/cat-placeholder.jpg",
  },
  {
    id: 8,
    name: "category8",
    image: "/images/cat-placeholder.jpg",
  },
];

export const products: Product[] = [
  {
    id: 1,
    sku: "sku-1",
    name: "product1",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 9.99,
    category: categories[0].name,
  },
  {
    id: 2,
    sku: "sku-2",
    name: "product2",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 19.99,
    category: categories[1].name,
  },
  {
    id: 3,
    sku: "sku-3",
    name: "product3",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 29.99,
    category: categories[2].name,
  },
  {
    id: 4,
    sku: "sku-4",
    name: "product4",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 39.99,
    category: categories[3].name,
  },
  {
    id: 5,
    sku: "sku-5",
    name: "product5",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 49.99,
    category: categories[4].name,
  },
  {
    id: 6,
    sku: "sku-6",
    name: "product6",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 59.99,
    category: categories[5].name,
  },
  {
    id: 7,
    sku: "sku-7",
    name: "product7",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 69.99,
    category: categories[6].name,
  },
  {
    id: 8,
    sku: "sku-8",
    name: "product8",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 79.99,
    category: categories[7].name,
  },
  {
    id: 9,
    sku: "sku-9",
    name: "product9",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 89.99,
    category: categories[0].name,
  },
  {
    id: 10,
    sku: "sku-10",
    name: "product10",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 99.99,
    category: categories[0].name,
  },
  {
    id: 11,
    sku: "sku-11",
    name: "product11",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 109.99,
    category: categories[0].name,
  },
  {
    id: 12,
    sku: "sku-12",
    name: "product12",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 119.99,
    category: categories[0].name,
  },
  {
    id: 13,
    sku: "sku-13",
    name: "product13",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 129.99,
    category: categories[0].name,
  },
  {
    id: 14,
    sku: "sku-14",
    name: "product14",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 139.99,
    category: categories[0].name,
  },
  {
    id: 15,
    sku: "sku-15",
    name: "product15",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 149.99,
    category: categories[0].name,
  },
  {
    id: 16,
    sku: "sku-16",
    name: "product16",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 159.99,
    category: categories[0].name,
  },
  {
    id: 17,
    sku: "sku-17",
    name: "product17",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 169.99,
    category: categories[0].name,
  },
  {
    id: 18,
    sku: "sku-18",
    name: "product18",
    images: [
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
      "/images/pro-placeholder.png",
    ],
    price: 179.99,
    category: categories[0].name,
  },
];
