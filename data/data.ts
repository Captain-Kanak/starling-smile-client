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
    name: "Baby Care",
    image: "/images/products/baby_bib_dress/fx5l3w6tcsg020reyta7_4_11zon.webp",
  },
  {
    id: 2,
    name: "Toys",
    image:
      "/images/products/baby_carrier_bag/asysiwvfwpz8khyadx3o_2_11zon.webp",
  },
  {
    id: 3,
    name: "Feeding",
    image: "/images/products/baby_comb/gdjwryecsyisy1nt4xvq.webp",
  },
  {
    id: 4,
    name: "Clothing",
    image: "/images/products/baby_giraffe_teether/bnrattgujnhzewkl7yoa.webp",
  },
  {
    id: 5,
    name: "Diapering",
    image:
      "/images/products/baby_mosquito_net/dsw0rdhqgodx1swqpv07_11_11zon.webp",
  },
  {
    id: 6,
    name: "Nursery",
    image:
      "/images/products/baby_one_sided_sling_carrier_bag/blvhirtag8g5ibzgi3hq_2_11zon.webp",
  },
  {
    id: 7,
    name: "Bath & Skin",
    image:
      "/images/products/baby_shower_mug/aemsfy23s8jpsemonqrp_35_11zon.webp",
  },
  {
    id: 8,
    name: "Health & Safety",
    image:
      "/images/products/baby_silicon_feeding_set/ecanzw8yicjarbngxgpq_41_11zon.webp",
  },
  {
    id: 9,
    name: "Cleaning",
    image: "/images/products/cap_towel/iy5dfx6ftiqghtek2zmn_50_11zon.webp",
  },
];

export const products: Product[] = [
  {
    id: 1,
    sku: "BC-001",
    name: "Gentle Baby Lotion with Natural Extracts",
    images: [
      "/images/products/baby_bib_dress/fx5l3w6tcsg020reyta7_4_11zon.webp",
      "/images/products/baby_bib_dress/nrcoovcdr3f9qpty7fve_5_11zon.webp",
    ],
    price: 12.99,
    category: categories[0].name,
  },
  {
    id: 2,
    sku: "BC-002",
    name: "Baby Shampoo & Wash Tear-Free Formula",
    images: [
      "/images/products/baby_carrier_bag/asysiwvfwpz8khyadx3o_2_11zon.webp",
      "/images/products/baby_carrier_bag/gtmwpjte9tfcdelbmgsj_3_11zon.webp",
    ],
    price: 14.99,
    category: categories[0].name,
  },
  {
    id: 3,
    sku: "TY-001",
    name: "Soft Plush Bunny Toy for Infants",
    images: [
      "/images/products/baby_comb/gdjwryecsyisy1nt4xvq.webp",
      "/images/products/baby_comb/m3iru5edrm3pz6wqo17y.webp",
    ],
    price: 24.99,
    category: categories[1].name,
  },
  {
    id: 4,
    sku: "TY-002",
    name: "Wooden Activity Gym with Hanging Toys",
    images: [
      "/images/products/baby_giraffe_teether/bnrattgujnhzewkl7yoa.webp",
      "/images/products/baby_giraffe_teether/vpd5wxsj8vkqyi0cgjt7.webp",
    ],
    price: 49.99,
    category: categories[1].name,
  },
  {
    id: 5,
    sku: "FD-001",
    name: "Baby Feeding Bottle Set Anti-Colic",
    images: [
      "/images/products/baby_mosquito_net/dsw0rdhqgodx1swqpv07_11_11zon.webp",
      "/images/products/baby_mosquito_net/eav5klvuyxs3auvpjgva_12_11zon.webp",
    ],
    price: 19.99,
    category: categories[2].name,
  },
  {
    id: 6,
    sku: "FD-002",
    name: "Silicone Bibs Waterproof 3-Pack Set",
    images: [
      "/images/products/baby_one_sided_sling_carrier_bag/blvhirtag8g5ibzgi3hq_2_11zon.webp",
      "/images/products/baby_one_sided_sling_carrier_bag/c4f9c8gqcpvertjlidho_3_11zon.webp",
    ],
    price: 15.99,
    category: categories[2].name,
  },
  {
    id: 7,
    sku: "CL-001",
    name: "Organic Cotton Onesies Newborn Pack",
    images: [
      "/images/products/baby_shower_mug/aemsfy23s8jpsemonqrp_35_11zon.webp",
      "/images/products/baby_shower_mug/qsk8tqvylqfcbikqjzui_38_11zon.webp",
    ],
    price: 29.99,
    category: categories[3].name,
  },
  {
    id: 8,
    sku: "CL-002",
    name: "Baby Knit Hat Soft Winter Cap",
    images: [
      "/images/products/baby_silicon_feeding_set/ecanzw8yicjarbngxgpq_41_11zon.webp",
      "/images/products/baby_silicon_feeding_set/f2ggtrgwf0tqwqrprnwm_42_11zon.webp",
    ],
    price: 11.99,
    category: categories[3].name,
  },
  {
    id: 9,
    sku: "DP-001",
    name: "Eco Baby Diapers Newborn Size Pack",
    images: [
      "/images/products/cap_towel/iy5dfx6ftiqghtek2zmn_50_11zon.webp",
      "/images/products/cap_towel/xjjlyuo8znopcmr2qrb0_59_11zon.webp",
    ],
    price: 34.99,
    category: categories[4].name,
  },
  {
    id: 10,
    sku: "DP-002",
    name: "Diaper Rash Cream Sensitive Skin",
    images: [
      "/images/products/feeder_cleaning_box/IMG_1623_11zon.webp",
      "/images/products/feeder_cleaning_box/IMG_1625_11zon.webp",
    ],
    price: 13.99,
    category: categories[4].name,
  },
  {
    id: 11,
    sku: "NR-001",
    name: "Baby Mobile Musical Nursery Crib Toy",
    images: ["/images/products/sudocrem.webp"],
    price: 39.99,
    category: categories[5].name,
  },
  {
    id: 12,
    sku: "NR-002",
    name: "Sound Machine White Noise Baby Sleep",
    images: ["/images/products/sudocrem.webp"],
    price: 44.99,
    category: categories[5].name,
  },
  {
    id: 13,
    sku: "BS-001",
    name: "Baby Bathtub Non-Slip Newborn Bath",
    images: ["/images/products/sudocrem.webp"],
    price: 29.99,
    category: categories[6].name,
  },
  {
    id: 14,
    sku: "BS-002",
    name: "Hooded Towels Soft Absorbent 2-Pack",
    images: ["/images/products/sudocrem.webp"],
    price: 22.99,
    category: categories[6].name,
  },
  {
    id: 15,
    sku: "HS-001",
    name: "Baby Thermometer Digital Accurate Reading",
    images: ["/images/products/sudocrem.webp"],
    price: 27.99,
    category: categories[7].name,
  },
  {
    id: 16,
    sku: "HS-002",
    name: "Baby First Aid Kit Complete Essentials",
    images: ["/images/products/sudocrem.webp"],
    price: 38.99,
    category: categories[7].name,
  },
];
