export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export interface ProductAttribute {
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  sku: string;
  attributes: Record<string, string>;
  price: number;
  compareAtPrice?: number;
  inventory: {
    quantity: number;
    reserved: number;
    available: number;
  };
  images: string[];
  status: "ACTIVE" | "INACTIVE";
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  brand?: string;
  images: string[];
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  specifications: Record<string, string>;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Gentle Baby Lotion with Natural Extracts",
    slug: "gentle-baby-lotion-natural-extracts",
    description:
      "Hypoallergenic baby lotion enriched with chamomile and calendula extracts. Dermatologist-tested and safe for sensitive newborn skin.",
    categoryId: "cat-baby-care",
    brand: "Starling Care",
    images: [
      "/images/products/baby_bib_dress/fx5l3w6tcsg020reyta7_4_11zon.webp",
      "/images/products/baby_bib_dress/nrcoovcdr3f9qpty7fve_5_11zon.webp",
    ],
    attributes: [
      { name: "Size", values: ["100ml", "200ml", "300ml"] },
      { name: "Color", values: ["White"] },
    ],
    variants: [
      {
        id: "v1-1",
        sku: "BC-001-100",
        attributes: { Size: "100ml", Color: "White" },
        price: 999,
        compareAtPrice: 1199,
        inventory: { quantity: 145, reserved: 0, available: 145 },
        images: [
          "/images/products/baby_bib_dress/fx5l3w6tcsg020reyta7_4_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v1-2",
        sku: "BC-001-200",
        attributes: { Size: "200ml", Color: "White" },
        price: 1299,
        compareAtPrice: 1499,
        inventory: { quantity: 145, reserved: 5, available: 140 },
        images: [
          "/images/products/baby_bib_dress/nrcoovcdr3f9qpty7fve_5_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v1-3",
        sku: "BC-001-300",
        attributes: { Size: "300ml", Color: "White" },
        price: 1699,
        compareAtPrice: 1899,
        inventory: { quantity: 98, reserved: 2, available: 96 },
        images: [
          "/images/products/baby_bib_dress/fx5l3w6tcsg020reyta7_4_11zon.webp",
        ],
        status: "ACTIVE",
      },
    ],
    specifications: {
      "Key Ingredients": "Chamomile, Calendula, Aloe Vera",
      "Skin Type": "Sensitive",
      "Age Range": "0M+",
      Certification: "Dermatologist-tested",
    },
    status: "ACTIVE",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-10-20T14:30:00Z",
  },
  {
    id: "p2",
    name: "Baby Shampoo & Wash Tear-Free Formula",
    slug: "baby-shampoo-wash-tear-free",
    description:
      "Tear-free 2-in-1 shampoo and body wash with aloe vera and vitamin E. No tears, no irritation.",
    categoryId: "cat-baby-care",
    brand: "Starling Care",
    images: [
      "/images/products/baby_shower_mug/aemsfy23s8jpsemonqrp_35_11zon.webp",
      "/images/products/baby_shower_mug/jgwn8vdrfflji3izspjb_36_11zon.webp",
    ],
    attributes: [
      { name: "Size", values: ["200ml", "300ml", "500ml"] },
      { name: "Color", values: ["White"] },
    ],
    variants: [
      {
        id: "v2-1",
        sku: "BC-002-200",
        attributes: { Size: "200ml", Color: "White" },
        price: 1099,
        compareAtPrice: 1299,
        inventory: { quantity: 89, reserved: 3, available: 86 },
        images: [
          "/images/products/baby_shower_mug/aemsfy23s8jpsemonqrp_35_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v2-2",
        sku: "BC-002-300",
        attributes: { Size: "300ml", Color: "White" },
        price: 1499,
        compareAtPrice: 1799,
        inventory: { quantity: 89, reserved: 6, available: 83 },
        images: [
          "/images/products/baby_shower_mug/jgwn8vdrfflji3izspjb_36_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v2-3",
        sku: "BC-002-500",
        attributes: { Size: "500ml", Color: "White" },
        price: 2199,
        compareAtPrice: 2599,
        inventory: { quantity: 62, reserved: 1, available: 61 },
        images: [
          "/images/products/baby_shower_mug/aemsfy23s8jpsemonqrp_35_11zon.webp",
        ],
        status: "ACTIVE",
      },
    ],
    specifications: {
      "Key Ingredients": "Aloe Vera, Vitamin E",
      "Skin Type": "All",
      "Age Range": "0M+",
      "Tear-Free": "Yes",
    },
    status: "ACTIVE",
    createdAt: "2026-01-16T10:00:00Z",
    updatedAt: "2026-10-21T09:15:00Z",
  },
  {
    id: "p3",
    name: "Soft Plush Bunny Toy for Infants",
    slug: "soft-plush-bunny-toy",
    description:
      "Ultra-soft plush bunny rattle toy made from organic cotton. Machine washable and BPA-free.",
    categoryId: "cat-toys",
    brand: "Starling Toys",
    images: [
      "/images/products/baby_giraffe_teether/bnrattgujnhzewkl7yoa.webp",
      "/images/products/baby_giraffe_teether/mf8nt2dosas5263hkvgu.webp",
    ],
    attributes: [
      { name: "Size", values: ["Small", "Medium"] },
      { name: "Color", values: ["Pink", "Blue"] },
    ],
    variants: [
      {
        id: "v3-1",
        sku: "TY-001-S-PK",
        attributes: { Size: "Small", Color: "Pink" },
        price: 1999,
        compareAtPrice: 2299,
        inventory: { quantity: 12, reserved: 2, available: 10 },
        images: [
          "/images/products/baby_giraffe_teether/bnrattgujnhzewkl7yoa.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v3-2",
        sku: "TY-001-S-BL",
        attributes: { Size: "Small", Color: "Blue" },
        price: 1999,
        inventory: { quantity: 8, reserved: 1, available: 7 },
        images: [
          "/images/products/baby_giraffe_teether/mf8nt2dosas5263hkvgu.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v3-3",
        sku: "TY-001-M-PK",
        attributes: { Size: "Medium", Color: "Pink" },
        price: 2499,
        compareAtPrice: 2899,
        inventory: { quantity: 6, reserved: 0, available: 6 },
        images: [
          "/images/products/baby_giraffe_teether/bnrattgujnhzewkl7yoa.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v3-4",
        sku: "TY-001-M-BL",
        attributes: { Size: "Medium", Color: "Blue" },
        price: 2499,
        inventory: { quantity: 4, reserved: 1, available: 3 },
        images: [
          "/images/products/baby_giraffe_teether/mf8nt2dosas5263hkvgu.webp",
        ],
        status: "INACTIVE",
      },
    ],
    specifications: {
      Material: "Organic Cotton",
      Care: "Machine washable",
      "Age Range": "0M+",
      Safety: "BPA-free",
    },
    status: "ACTIVE",
    createdAt: "2026-02-01T10:00:00Z",
    updatedAt: "2026-10-19T16:45:00Z",
  },
  {
    id: "p4",
    name: "Wooden Activity Gym with Hanging Toys",
    slug: "wooden-activity-gym",
    description:
      "Montessori-style wooden activity gym with detachable hanging toys. Encourages motor skills and sensory development.",
    categoryId: "cat-toys",
    brand: "Starling Toys",
    images: [
      "/images/products/magnetic_wooden_bed_toy/dngzsgo6wrsds1gbyi95_86_11zon.webp",
      "/images/products/magnetic_wooden_bed_toy/o7tmzbyfhjwfk2gktg2z_87_11zon.webp",
    ],
    attributes: [
      { name: "Size", values: ["Standard"] },
      { name: "Color", values: ["Natural Wood", "Pastel"] },
    ],
    variants: [
      {
        id: "v4-1",
        sku: "TY-002-NAT",
        attributes: { Size: "Standard", Color: "Natural Wood" },
        price: 4499,
        compareAtPrice: 4999,
        inventory: { quantity: 3, reserved: 0, available: 3 },
        images: [
          "/images/products/magnetic_wooden_bed_toy/dngzsgo6wrsds1gbyi95_86_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v4-2",
        sku: "TY-002-PST",
        attributes: { Size: "Standard", Color: "Pastel" },
        price: 4999,
        inventory: { quantity: 5, reserved: 1, available: 4 },
        images: [
          "/images/products/magnetic_wooden_bed_toy/o7tmzbyfhjwfk2gktg2z_87_11zon.webp",
        ],
        status: "ACTIVE",
      },
    ],
    specifications: {
      Material: "Beechwood",
      "Age Range": "0M+",
      Assembly: "Required",
      Safety: "Non-toxic finish",
    },
    status: "ACTIVE",
    createdAt: "2026-02-05T10:00:00Z",
    updatedAt: "2026-10-18T11:20:00Z",
  },
  {
    id: "p5",
    name: "Baby Feeding Bottle Set Anti-Colic",
    slug: "baby-feeding-bottle-set",
    description:
      "Anti-colic baby feeding bottle set with wide neck design and slow-flow nipples. BPA-free and dishwasher safe.",
    categoryId: "cat-feeding",
    brand: "Starling Feed",
    images: ["/images/products/avent_feeder/IMG_1595_11zon.webp"],
    attributes: [
      { name: "Size", values: ["3-pack", "6-pack"] },
      { name: "Color", values: ["Clear", "Pink", "Blue"] },
    ],
    variants: [
      {
        id: "v5-1",
        sku: "FD-001-3PK-CL",
        attributes: { Size: "3-pack", Color: "Clear" },
        price: 1699,
        compareAtPrice: 1999,
        inventory: { quantity: 0, reserved: 0, available: 0 },
        images: ["/images/products/avent_feeder/IMG_1595_11zon.webp"],
        status: "INACTIVE",
      },
      {
        id: "v5-2",
        sku: "FD-001-3PK-PK",
        attributes: { Size: "3-pack", Color: "Pink" },
        price: 1799,
        inventory: { quantity: 0, reserved: 0, available: 0 },
        images: ["/images/products/avent_feeder/IMG_1595_11zon.webp"],
        status: "INACTIVE",
      },
      {
        id: "v5-3",
        sku: "FD-001-6PK-CL",
        attributes: { Size: "6-pack", Color: "Clear" },
        price: 2999,
        compareAtPrice: 3499,
        inventory: { quantity: 0, reserved: 0, available: 0 },
        images: ["/images/products/avent_feeder/IMG_1595_11zon.webp"],
        status: "INACTIVE",
      },
      {
        id: "v5-4",
        sku: "FD-001-6PK-BL",
        attributes: { Size: "6-pack", Color: "Blue" },
        price: 2999,
        inventory: { quantity: 0, reserved: 0, available: 0 },
        images: ["/images/products/avent_feeder/IMG_1595_11zon.webp"],
        status: "INACTIVE",
      },
    ],
    specifications: {
      Material: "BPA-free Plastic",
      Nipple: "Slow-flow",
      Care: "Dishwasher safe",
      "Age Range": "0M+",
    },
    status: "ACTIVE",
    createdAt: "2026-02-10T10:00:00Z",
    updatedAt: "2026-10-22T08:00:00Z",
  },
  {
    id: "p6",
    name: "Silicone Bibs Waterproof 3-Pack Set",
    slug: "silicone-bibs-waterproof",
    description:
      "Waterproof silicone baby bibs with deep pocket to catch food spills. Soft, flexible, and easy to clean.",
    categoryId: "cat-feeding",
    brand: "Starling Feed",
    images: [
      "/images/products/baby_silicon_feeding_set/ecanzw8yicjarbngxgpq_41_11zon.webp",
      "/images/products/baby_silicon_feeding_set/f2ggtrgwf0tqwqrprnwm_42_11zon.webp",
    ],
    attributes: [
      { name: "Size", values: ["One Size"] },
      { name: "Color", values: ["Pink", "Blue", "Green", "Yellow"] },
    ],
    variants: [
      {
        id: "v6-1",
        sku: "FD-002-PK",
        attributes: { Size: "One Size", Color: "Pink" },
        price: 1399,
        inventory: { quantity: 200, reserved: 10, available: 190 },
        images: [
          "/images/products/baby_silicon_feeding_set/ecanzw8yicjarbngxgpq_41_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v6-2",
        sku: "FD-002-BL",
        attributes: { Size: "One Size", Color: "Blue" },
        price: 1399,
        inventory: { quantity: 200, reserved: 5, available: 195 },
        images: [
          "/images/products/baby_silicon_feeding_set/f2ggtrgwf0tqwqrprnwm_42_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v6-3",
        sku: "FD-002-GR",
        attributes: { Size: "One Size", Color: "Green" },
        price: 1399,
        inventory: { quantity: 150, reserved: 8, available: 142 },
        images: [
          "/images/products/baby_silicon_feeding_set/ecanzw8yicjarbngxgpq_41_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v6-4",
        sku: "FD-002-YL",
        attributes: { Size: "One Size", Color: "Yellow" },
        price: 1399,
        inventory: { quantity: 150, reserved: 3, available: 147 },
        images: [
          "/images/products/baby_silicon_feeding_set/f2ggtrgwf0tqwqrprnwm_42_11zon.webp",
        ],
        status: "ACTIVE",
      },
    ],
    specifications: {
      Material: "Silicone",
      Care: "Dishwasher safe",
      "Age Range": "4M+",
      BPA: "Free",
    },
    status: "ACTIVE",
    createdAt: "2026-02-12T10:00:00Z",
    updatedAt: "2026-10-21T15:30:00Z",
  },
  {
    id: "p7",
    name: "Organic Cotton Onesies Newborn Pack",
    slug: "organic-cotton-onesies",
    description:
      "5-pack organic cotton onesies with envelope neck and snap closures. Soft, breathable, and gentle on baby's skin.",
    categoryId: "cat-clothing",
    brand: "Starling Wear",
    images: [
      "/images/products/baby_carrier_bag/asysiwvfwpz8khyadx3o_2_11zon.webp",
      "/images/products/baby_carrier_bag/gtmwpjte9tfcdelbmgsj_3_11zon.webp",
    ],
    attributes: [
      { name: "Size", values: ["0-3M", "3-6M", "6-9M"] },
      { name: "Color", values: ["White", "Pink", "Blue"] },
    ],
    variants: [
      {
        id: "v7-1",
        sku: "CL-001-03M-WT",
        attributes: { Size: "0-3M", Color: "White" },
        price: 2499,
        inventory: { quantity: 67, reserved: 4, available: 63 },
        images: [
          "/images/products/baby_carrier_bag/asysiwvfwpz8khyadx3o_2_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v7-2",
        sku: "CL-001-03M-PK",
        attributes: { Size: "0-3M", Color: "Pink" },
        price: 2499,
        inventory: { quantity: 52, reserved: 2, available: 50 },
        images: [
          "/images/products/baby_carrier_bag/gtmwpjte9tfcdelbmgsj_3_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v7-3",
        sku: "CL-001-03M-BL",
        attributes: { Size: "0-3M", Color: "Blue" },
        price: 2499,
        inventory: { quantity: 48, reserved: 1, available: 47 },
        images: [
          "/images/products/baby_carrier_bag/asysiwvfwpz8khyadx3o_2_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v7-4",
        sku: "CL-001-36M-WT",
        attributes: { Size: "3-6M", Color: "White" },
        price: 2699,
        inventory: { quantity: 67, reserved: 3, available: 64 },
        images: [
          "/images/products/baby_carrier_bag/asysiwvfwpz8khyadx3o_2_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v7-5",
        sku: "CL-001-36M-PK",
        attributes: { Size: "3-6M", Color: "Pink" },
        price: 2699,
        inventory: { quantity: 41, reserved: 2, available: 39 },
        images: [
          "/images/products/baby_carrier_bag/gtmwpjte9tfcdelbmgsj_3_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v7-6",
        sku: "CL-001-36M-BL",
        attributes: { Size: "3-6M", Color: "Blue" },
        price: 2699,
        inventory: { quantity: 39, reserved: 1, available: 38 },
        images: [
          "/images/products/baby_carrier_bag/asysiwvfwpz8khyadx3o_2_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v7-7",
        sku: "CL-001-69M-WT",
        attributes: { Size: "6-9M", Color: "White" },
        price: 2899,
        inventory: { quantity: 55, reserved: 3, available: 52 },
        images: [
          "/images/products/baby_carrier_bag/asysiwvfwpz8khyadx3o_2_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v7-8",
        sku: "CL-001-69M-PK",
        attributes: { Size: "6-9M", Color: "Pink" },
        price: 2899,
        inventory: { quantity: 38, reserved: 2, available: 36 },
        images: [
          "/images/products/baby_carrier_bag/gtmwpjte9tfcdelbmgsj_3_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v7-9",
        sku: "CL-001-69M-BL",
        attributes: { Size: "6-9M", Color: "Blue" },
        price: 2899,
        inventory: { quantity: 35, reserved: 1, available: 34 },
        images: [
          "/images/products/baby_carrier_bag/asysiwvfwpz8khyadx3o_2_11zon.webp",
        ],
        status: "ACTIVE",
      },
    ],
    specifications: {
      Material: "100% Organic Cotton",
      Care: "Machine washable",
      "Age Range": "0-9M",
      Closure: "Snap buttons",
    },
    status: "ACTIVE",
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-10-20T12:10:00Z",
  },
  {
    id: "p8",
    name: "Baby Knit Hat Soft Winter Cap",
    slug: "baby-knit-hat-winter",
    description:
      "Soft knit winter cap for babies. Ribbed cuff for secure fit, available in pastel colors.",
    categoryId: "cat-clothing",
    brand: "Starling Wear",
    images: [
      "/images/products/baby_comb/gdjwryecsyisy1nt4xvq.webp",
      "/images/products/baby_comb/m3iru5edrm3pz6wqo17y.webp",
    ],
    attributes: [
      { name: "Size", values: ["0-3M", "3-6M", "6-12M"] },
      { name: "Color", values: ["Pink", "Blue", "Cream", "Grey"] },
    ],
    variants: [
      {
        id: "v8-1",
        sku: "CL-002-03M-PK",
        attributes: { Size: "0-3M", Color: "Pink" },
        price: 999,
        inventory: { quantity: 234, reserved: 12, available: 222 },
        images: ["/images/products/baby_comb/gdjwryecsyisy1nt4xvq.webp"],
        status: "ACTIVE",
      },
      {
        id: "v8-2",
        sku: "CL-002-03M-BL",
        attributes: { Size: "0-3M", Color: "Blue" },
        price: 999,
        inventory: { quantity: 234, reserved: 8, available: 226 },
        images: ["/images/products/baby_comb/m3iru5edrm3pz6wqo17y.webp"],
        status: "ACTIVE",
      },
      {
        id: "v8-3",
        sku: "CL-002-03M-CR",
        attributes: { Size: "0-3M", Color: "Cream" },
        price: 999,
        inventory: { quantity: 180, reserved: 5, available: 175 },
        images: ["/images/products/baby_comb/gdjwryecsyisy1nt4xvq.webp"],
        status: "ACTIVE",
      },
      {
        id: "v8-4",
        sku: "CL-002-36M-PK",
        attributes: { Size: "3-6M", Color: "Pink" },
        price: 1099,
        inventory: { quantity: 234, reserved: 10, available: 224 },
        images: ["/images/products/baby_comb/m3iru5edrm3pz6wqo17y.webp"],
        status: "ACTIVE",
      },
      {
        id: "v8-5",
        sku: "CL-002-36M-BL",
        attributes: { Size: "3-6M", Color: "Blue" },
        price: 1099,
        inventory: { quantity: 234, reserved: 7, available: 227 },
        images: ["/images/products/baby_comb/gdjwryecsyisy1nt4xvq.webp"],
        status: "ACTIVE",
      },
      {
        id: "v8-6",
        sku: "CL-002-36M-GY",
        attributes: { Size: "3-6M", Color: "Grey" },
        price: 1099,
        inventory: { quantity: 150, reserved: 4, available: 146 },
        images: ["/images/products/baby_comb/m3iru5edrm3pz6wqo17y.webp"],
        status: "ACTIVE",
      },
      {
        id: "v8-7",
        sku: "CL-002-612M-PK",
        attributes: { Size: "6-12M", Color: "Pink" },
        price: 1199,
        inventory: { quantity: 120, reserved: 6, available: 114 },
        images: ["/images/products/baby_comb/gdjwryecsyisy1nt4xvq.webp"],
        status: "ACTIVE",
      },
      {
        id: "v8-8",
        sku: "CL-002-612M-BL",
        attributes: { Size: "6-12M", Color: "Blue" },
        price: 1199,
        inventory: { quantity: 120, reserved: 5, available: 115 },
        images: ["/images/products/baby_comb/m3iru5edrm3pz6wqo17y.webp"],
        status: "ACTIVE",
      },
      {
        id: "v8-9",
        sku: "CL-002-612M-CR",
        attributes: { Size: "6-12M", Color: "Cream" },
        price: 1199,
        inventory: { quantity: 90, reserved: 3, available: 87 },
        images: ["/images/products/baby_comb/gdjwryecsyisy1nt4xvq.webp"],
        status: "ACTIVE",
      },
    ],
    specifications: {
      Material: "Cotton Blend",
      Care: "Hand wash recommended",
      "Age Range": "0-12M",
      Style: "Knit",
    },
    status: "ACTIVE",
    createdAt: "2026-03-05T10:00:00Z",
    updatedAt: "2026-10-19T14:00:00Z",
  },
  {
    id: "p9",
    name: "Eco Baby Diapers Newborn Size Pack",
    slug: "eco-baby-diapers-newborn",
    description:
      "Eco-friendly disposable diapers for newborns. Ultra-absorbent core with wetness indicator and breathable outer layer.",
    categoryId: "cat-diapering",
    brand: "Starling Dry",
    images: [
      "/images/products/cap_towel/iy5dfx6ftiqghtek2zmn_50_11zon.webp",
      "/images/products/cap_towel/xjjlyuo8znopcmr2qrb0_59_11zon.webp",
    ],
    attributes: [
      { name: "Size", values: ["Newborn", "Size 1", "Size 2"] },
      { name: "Color", values: ["White"] },
    ],
    variants: [
      {
        id: "v9-1",
        sku: "DP-001-NB-20",
        attributes: { Size: "Newborn", Color: "White" },
        price: 2499,
        compareAtPrice: 2799,
        inventory: { quantity: 45, reserved: 5, available: 40 },
        images: [
          "/images/products/cap_towel/iy5dfx6ftiqghtek2zmn_50_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v9-2",
        sku: "DP-001-NB-40",
        attributes: { Size: "Newborn", Color: "White" },
        price: 3499,
        compareAtPrice: 3999,
        inventory: { quantity: 45, reserved: 6, available: 39 },
        images: [
          "/images/products/cap_towel/xjjlyuo8znopcmr2qrb0_59_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v9-3",
        sku: "DP-001-S1-20",
        attributes: { Size: "Size 1", Color: "White" },
        price: 2699,
        compareAtPrice: 2999,
        inventory: { quantity: 38, reserved: 4, available: 34 },
        images: [
          "/images/products/cap_towel/iy5dfx6ftiqghtek2zmn_50_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v9-4",
        sku: "DP-001-S1-40",
        attributes: { Size: "Size 1", Color: "White" },
        price: 3799,
        inventory: { quantity: 38, reserved: 5, available: 33 },
        images: [
          "/images/products/cap_towel/xjjlyuo8znopcmr2qrb0_59_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v9-5",
        sku: "DP-001-S2-20",
        attributes: { Size: "Size 2", Color: "White" },
        price: 2899,
        compareAtPrice: 3199,
        inventory: { quantity: 32, reserved: 3, available: 29 },
        images: [
          "/images/products/cap_towel/iy5dfx6ftiqghtek2zmn_50_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v9-6",
        sku: "DP-001-S2-40",
        attributes: { Size: "Size 2", Color: "White" },
        price: 4099,
        inventory: { quantity: 32, reserved: 4, available: 28 },
        images: [
          "/images/products/cap_towel/xjjlyuo8znopcmr2qrb0_59_11zon.webp",
        ],
        status: "ACTIVE",
      },
    ],
    specifications: {
      Material: "Eco-friendly fluff pulp",
      "Size Range": "Newborn - Size 2",
      Feature: "Wetness indicator",
      Absorbency: "High",
    },
    status: "ACTIVE",
    createdAt: "2026-03-10T10:00:00Z",
    updatedAt: "2026-10-21T10:00:00Z",
  },
  {
    id: "p10",
    name: "Diaper Rash Cream Sensitive Skin",
    slug: "diaper-rash-cream-sensitive",
    description:
      "Zinc oxide diaper rash cream for sensitive skin. Clinically proven to treat and prevent diaper rash.",
    categoryId: "cat-diapering",
    brand: "Starling Care",
    images: ["/images/products/sudocrem.webp"],
    attributes: [
      { name: "Size", values: ["30g", "60g", "100g"] },
      { name: "Color", values: ["White"] },
    ],
    variants: [
      {
        id: "v10-1",
        sku: "DP-002-30G",
        attributes: { Size: "30g", Color: "White" },
        price: 899,
        compareAtPrice: 1099,
        inventory: { quantity: 8, reserved: 1, available: 7 },
        images: ["/images/products/sudocrem.webp"],
        status: "ACTIVE",
      },
      {
        id: "v10-2",
        sku: "DP-002-60G",
        attributes: { Size: "60g", Color: "White" },
        price: 1399,
        compareAtPrice: 1699,
        inventory: { quantity: 8, reserved: 2, available: 6 },
        images: ["/images/products/sudocrem.webp"],
        status: "ACTIVE",
      },
      {
        id: "v10-3",
        sku: "DP-002-100G",
        attributes: { Size: "100g", Color: "White" },
        price: 1999,
        compareAtPrice: 2399,
        inventory: { quantity: 6, reserved: 1, available: 5 },
        images: ["/images/products/sudocrem.webp"],
        status: "ACTIVE",
      },
    ],
    specifications: {
      "Active Ingredient": "Zinc Oxide",
      "Skin Type": "Sensitive",
      "Age Range": "0M+",
      "Clinically Proven": "Yes",
    },
    status: "ACTIVE",
    createdAt: "2026-03-12T10:00:00Z",
    updatedAt: "2026-10-18T16:00:00Z",
  },
  {
    id: "p11",
    name: "Baby Mobile Musical Nursery Crib Toy",
    slug: "baby-mobile-musical-crib",
    description:
      "Musical crib mobile with rotating plush characters and soft lullabies. Remote-controlled with timer function.",
    categoryId: "cat-nursery",
    brand: "Starling Nursery",
    images: [
      "/images/products/baby_mosquito_net/dsw0rdhqgodx1swqpv07_11_11zon.webp",
      "/images/products/baby_mosquito_net/eav5klvuyxs3auvpjgva_12_11zon.webp",
    ],
    attributes: [
      { name: "Size", values: ["Standard"] },
      { name: "Color", values: ["Pastel", "Bright"] },
    ],
    variants: [
      {
        id: "v11-1",
        sku: "NR-001-PST",
        attributes: { Size: "Standard", Color: "Pastel" },
        price: 3499,
        compareAtPrice: 3999,
        inventory: { quantity: 56, reserved: 4, available: 52 },
        images: [
          "/images/products/baby_mosquito_net/dsw0rdhqgodx1swqpv07_11_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v11-2",
        sku: "NR-001-BRT",
        attributes: { Size: "Standard", Color: "Bright" },
        price: 3999,
        inventory: { quantity: 56, reserved: 3, available: 53 },
        images: [
          "/images/products/baby_mosquito_net/eav5klvuyxs3auvpjgva_12_11zon.webp",
        ],
        status: "ACTIVE",
      },
    ],
    specifications: {
      Power: "Battery / USB",
      Sounds: "20 lullabies",
      "Age Range": "0-6M",
      Timer: "Yes",
    },
    status: "ACTIVE",
    createdAt: "2026-04-01T10:00:00Z",
    updatedAt: "2026-10-20T11:00:00Z",
  },
  {
    id: "p12",
    name: "Sound Machine White Noise Baby Sleep",
    slug: "sound-machine-white-noise",
    description:
      "White noise sound machine with 20 soothing sounds, night light, and timer. Helps babies fall asleep faster.",
    categoryId: "cat-nursery",
    brand: "Starling Nursery",
    images: [
      "/images/products/adult_sleeping_patch/641647637_917824620973001_6300082066059871225_n.webp",
    ],
    attributes: [
      { name: "Size", values: ["Standard"] },
      { name: "Color", values: ["White", "Pink", "Grey"] },
    ],
    variants: [
      {
        id: "v12-1",
        sku: "NR-002-WT",
        attributes: { Size: "Standard", Color: "White" },
        price: 3999,
        inventory: { quantity: 31, reserved: 2, available: 29 },
        images: [
          "/images/products/adult_sleeping_patch/641647637_917824620973001_6300082066059871225_n.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v12-2",
        sku: "NR-002-PK",
        attributes: { Size: "Standard", Color: "Pink" },
        price: 3999,
        inventory: { quantity: 31, reserved: 1, available: 30 },
        images: [
          "/images/products/adult_sleeping_patch/641647637_917824620973001_6300082066059871225_n.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v12-3",
        sku: "NR-002-GY",
        attributes: { Size: "Standard", Color: "Grey" },
        price: 3999,
        inventory: { quantity: 24, reserved: 1, available: 23 },
        images: [
          "/images/products/adult_sleeping_patch/641647637_917824620973001_6300082066059871225_n.webp",
        ],
        status: "ACTIVE",
      },
    ],
    specifications: {
      Sounds: "20 soothing sounds",
      Light: "Night light included",
      Timer: "Yes",
      Power: "USB / Battery",
    },
    status: "ACTIVE",
    createdAt: "2026-04-05T10:00:00Z",
    updatedAt: "2026-10-19T09:30:00Z",
  },
  {
    id: "p13",
    name: "Baby Bathtub Non-Slip Newborn Bath",
    slug: "baby-bathtub-non-slip",
    description:
      "Non-slip newborn baby bathtub with built-in temperature indicator and supportive head rest.",
    categoryId: "cat-bath-skin",
    brand: "Starling Bath",
    images: [
      "/images/products/baby_bathtub/615419620_887698430652287_579318626393640272_n.webp",
    ],
    attributes: [
      { name: "Size", values: ["Standard", "Large"] },
      { name: "Color", values: ["White", "Pink", "Blue"] },
    ],
    variants: [
      {
        id: "v13-1",
        sku: "BS-001-STD-WT",
        attributes: { Size: "Standard", Color: "White" },
        price: 2499,
        compareAtPrice: 2799,
        inventory: { quantity: 19, reserved: 2, available: 17 },
        images: [
          "/images/products/baby_bathtub/615419620_887698430652287_579318626393640272_n.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v13-2",
        sku: "BS-001-STD-PK",
        attributes: { Size: "Standard", Color: "Pink" },
        price: 2499,
        inventory: { quantity: 19, reserved: 1, available: 18 },
        images: [
          "/images/products/baby_bathtub/615419620_887698430652287_579318626393640272_n.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v13-3",
        sku: "BS-001-STD-BL",
        attributes: { Size: "Standard", Color: "Blue" },
        price: 2499,
        inventory: { quantity: 14, reserved: 1, available: 13 },
        images: [
          "/images/products/baby_bathtub/615419620_887698430652287_579318626393640272_n.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v13-4",
        sku: "BS-001-LRG-WT",
        attributes: { Size: "Large", Color: "White" },
        price: 2999,
        compareAtPrice: 3299,
        inventory: { quantity: 12, reserved: 1, available: 11 },
        images: [
          "/images/products/baby_bathtub/615419620_887698430652287_579318626393640272_n.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v13-5",
        sku: "BS-001-LRG-PK",
        attributes: { Size: "Large", Color: "Pink" },
        price: 2999,
        inventory: { quantity: 12, reserved: 1, available: 11 },
        images: [
          "/images/products/baby_bathtub/615419620_887698430652287_579318626393640272_n.webp",
        ],
        status: "ACTIVE",
      },
    ],
    specifications: {
      Material: "BPA-free Plastic",
      "Age Range": "0-12M",
      Feature: "Temperature indicator",
      Safety: "Non-slip base",
    },
    status: "ACTIVE",
    createdAt: "2026-04-10T10:00:00Z",
    updatedAt: "2026-10-20T15:45:00Z",
  },
  {
    id: "p14",
    name: "Hooded Towels Soft Absorbent 2-Pack",
    slug: "hooded-towels-absorbent",
    description:
      "2-pack hooded bamboo towels, ultra-absorbent and soft. Gentle on baby's delicate skin after bath time.",
    categoryId: "cat-bath-skin",
    brand: "Starling Bath",
    images: [
      "/images/products/cap_towel/a8jaulegrqe7ih68xnmh_46_11zon.webp",
      "/images/products/cap_towel/cxnbpdpdsbyda5mehifz_47_11zon.webp",
    ],
    attributes: [
      { name: "Size", values: ["Small", "Large"] },
      { name: "Color", values: ["Yellow", "Pink", "Blue", "White"] },
    ],
    variants: [
      {
        id: "v14-1",
        sku: "BS-002-SM-YL",
        attributes: { Size: "Small", Color: "Yellow" },
        price: 1899,
        inventory: { quantity: 78, reserved: 4, available: 74 },
        images: [
          "/images/products/cap_towel/a8jaulegrqe7ih68xnmh_46_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v14-2",
        sku: "BS-002-SM-PK",
        attributes: { Size: "Small", Color: "Pink" },
        price: 1899,
        inventory: { quantity: 78, reserved: 3, available: 75 },
        images: [
          "/images/products/cap_towel/cxnbpdpdsbyda5mehifz_47_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v14-3",
        sku: "BS-002-SM-BL",
        attributes: { Size: "Small", Color: "Blue" },
        price: 1899,
        inventory: { quantity: 62, reserved: 2, available: 60 },
        images: [
          "/images/products/cap_towel/a8jaulegrqe7ih68xnmh_46_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v14-4",
        sku: "BS-002-SM-WT",
        attributes: { Size: "Small", Color: "White" },
        price: 1899,
        inventory: { quantity: 62, reserved: 1, available: 61 },
        images: [
          "/images/products/cap_towel/cxnbpdpdsbyda5mehifz_47_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v14-5",
        sku: "BS-002-LG-YL",
        attributes: { Size: "Large", Color: "Yellow" },
        price: 2299,
        inventory: { quantity: 56, reserved: 3, available: 53 },
        images: [
          "/images/products/cap_towel/a8jaulegrqe7ih68xnmh_46_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v14-6",
        sku: "BS-002-LG-PK",
        attributes: { Size: "Large", Color: "Pink" },
        price: 2299,
        inventory: { quantity: 56, reserved: 2, available: 54 },
        images: [
          "/images/products/cap_towel/cxnbpdpdsbyda5mehifz_47_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v14-7",
        sku: "BS-002-LG-BL",
        attributes: { Size: "Large", Color: "Blue" },
        price: 2299,
        inventory: { quantity: 44, reserved: 2, available: 42 },
        images: [
          "/images/products/cap_towel/a8jaulegrqe7ih68xnmh_46_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v14-8",
        sku: "BS-002-LG-WT",
        attributes: { Size: "Large", Color: "White" },
        price: 2299,
        inventory: { quantity: 44, reserved: 1, available: 43 },
        images: [
          "/images/products/cap_towel/cxnbpdpdsbyda5mehifz_47_11zon.webp",
        ],
        status: "ACTIVE",
      },
    ],
    specifications: {
      Material: "Bamboo fiber",
      Care: "Machine washable",
      "Age Range": "0M+",
      Pack: "2 pcs",
    },
    status: "ACTIVE",
    createdAt: "2026-04-12T10:00:00Z",
    updatedAt: "2026-10-19T13:00:00Z",
  },
  {
    id: "p15",
    name: "Baby Thermometer Digital Accurate Reading",
    slug: "baby-thermometer-digital",
    description:
      "Digital baby thermometer with fever alert and memory recall. Accurate reading in 10 seconds.",
    categoryId: "cat-health-safety",
    brand: "Starling Health",
    images: [
      "/images/products/baby_nail_clipper/WhatsApp Image 2026-10-23 at 9.57.24 PM (3).webp",
    ],
    attributes: [
      { name: "Size", values: ["Standard"] },
      { name: "Color", values: ["White", "Pink", "Infrared"] },
    ],
    variants: [
      {
        id: "v15-1",
        sku: "HS-001-DIG-WT",
        attributes: { Size: "Standard", Color: "White" },
        price: 2299,
        compareAtPrice: 2599,
        inventory: { quantity: 5, reserved: 1, available: 4 },
        images: [
          "/images/products/baby_nail_clipper/WhatsApp Image 2026-10-23 at 9.57.24 PM (3).webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v15-2",
        sku: "HS-001-DIG-PK",
        attributes: { Size: "Standard", Color: "Pink" },
        price: 2299,
        inventory: { quantity: 5, reserved: 0, available: 5 },
        images: [
          "/images/products/baby_nail_clipper/WhatsApp Image 2026-10-23 at 9.57.24 PM (3).webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v15-3",
        sku: "HS-001-INF-WT",
        attributes: { Size: "Standard", Color: "Infrared" },
        price: 3499,
        compareAtPrice: 3999,
        inventory: { quantity: 3, reserved: 0, available: 3 },
        images: [
          "/images/products/baby_nail_clipper/WhatsApp Image 2026-10-23 at 9.57.24 PM (3).webp",
        ],
        status: "ACTIVE",
      },
    ],
    specifications: {
      Type: "Digital",
      "Reading Time": "10 seconds",
      Feature: "Fever alert, memory recall",
      "Age Range": "0M+",
    },
    status: "ACTIVE",
    createdAt: "2026-05-01T10:00:00Z",
    updatedAt: "2026-10-21T17:00:00Z",
  },
  {
    id: "p16",
    name: "Baby First Aid Kit Complete Essentials",
    slug: "baby-first-aid-kit",
    description:
      "Complete baby first aid kit with thermometer, nasal aspirator, nail scissors, and medicine dispenser.",
    categoryId: "cat-health-safety",
    brand: "Starling Health",
    images: [
      "/images/products/feeder_cleaning_box/IMG_1623_11zon.webp",
      "/images/products/feeder_cleaning_box/IMG_1625_11zon.webp",
    ],
    attributes: [
      { name: "Size", values: ["Basic", "Complete", "Travel"] },
      { name: "Color", values: ["White"] },
    ],
    variants: [
      {
        id: "v16-1",
        sku: "HS-002-BASIC",
        attributes: { Size: "Basic", Color: "White" },
        price: 2999,
        compareAtPrice: 3499,
        inventory: { quantity: 23, reserved: 2, available: 21 },
        images: ["/images/products/feeder_cleaning_box/IMG_1623_11zon.webp"],
        status: "ACTIVE",
      },
      {
        id: "v16-2",
        sku: "HS-002-COMPLETE",
        attributes: { Size: "Complete", Color: "White" },
        price: 3899,
        compareAtPrice: 4499,
        inventory: { quantity: 23, reserved: 3, available: 20 },
        images: ["/images/products/feeder_cleaning_box/IMG_1625_11zon.webp"],
        status: "ACTIVE",
      },
      {
        id: "v16-3",
        sku: "HS-002-TRAVEL",
        attributes: { Size: "Travel", Color: "White" },
        price: 2499,
        inventory: { quantity: 15, reserved: 1, available: 14 },
        images: ["/images/products/feeder_cleaning_box/IMG_1623_11zon.webp"],
        status: "ACTIVE",
      },
    ],
    specifications: {
      Contents: "Thermometer, aspirator, scissors, dispenser",
      Case: "Carry bag included",
      "Age Range": "0M+",
      Certification: "CE",
    },
    status: "ACTIVE",
    createdAt: "2026-05-05T10:00:00Z",
    updatedAt: "2026-10-20T09:00:00Z",
  },
  {
    id: "p17",
    name: "Baby Bottle Brush Cleaning Set",
    slug: "baby-bottle-brush-cleaning",
    description:
      "3-piece baby bottle brush cleaning set with silicone bristles and nipple cleaner. Reaches every corner.",
    categoryId: "cat-cleaning",
    brand: "Starling Clean",
    images: [
      "/images/products/feeder_cleaning_brush_silicone/IMG_7489_11zon.webp",
    ],
    attributes: [
      { name: "Size", values: ["Standard"] },
      { name: "Color", values: ["White", "Pink", "Blue"] },
    ],
    variants: [
      {
        id: "v17-1",
        sku: "CLN-001-WT",
        attributes: { Size: "Standard", Color: "White" },
        price: 1099,
        inventory: { quantity: 91, reserved: 5, available: 86 },
        images: [
          "/images/products/feeder_cleaning_brush_silicone/IMG_7489_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v17-2",
        sku: "CLN-001-PK",
        attributes: { Size: "Standard", Color: "Pink" },
        price: 1099,
        inventory: { quantity: 91, reserved: 4, available: 87 },
        images: [
          "/images/products/feeder_cleaning_brush_silicone/IMG_7489_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v17-3",
        sku: "CLN-001-BL",
        attributes: { Size: "Standard", Color: "Blue" },
        price: 1099,
        inventory: { quantity: 72, reserved: 3, available: 69 },
        images: [
          "/images/products/feeder_cleaning_brush_silicone/IMG_7489_11zon.webp",
        ],
        status: "ACTIVE",
      },
    ],
    specifications: {
      Pieces: "3",
      Material: "Silicone bristles",
      Use: "Bottles and nipples",
      Care: "Dishwasher safe",
    },
    status: "ACTIVE",
    createdAt: "2026-05-10T10:00:00Z",
    updatedAt: "2026-10-18T12:00:00Z",
  },
  {
    id: "p18",
    name: "Sterilizer Bag Microwave Safe",
    slug: "sterilizer-bag-microwave",
    description:
      "Microwave sterilizer bags for bottles and pacifiers. Kills 99.9% of germs in 3 minutes.",
    categoryId: "cat-cleaning",
    brand: "Starling Clean",
    images: [
      "/images/products/strow_cleaner/495125665_724055096809290_774397176221932697_n.webp",
    ],
    attributes: [
      { name: "Size", values: ["Pack of 5", "Pack of 10"] },
      { name: "Color", values: ["Clear"] },
    ],
    variants: [
      {
        id: "v18-1",
        sku: "CLN-002-5PK",
        attributes: { Size: "Pack of 5", Color: "Clear" },
        price: 1299,
        compareAtPrice: 1599,
        inventory: { quantity: 54, reserved: 3, available: 51 },
        images: [
          "/images/products/strow_cleaner/495125665_724055096809290_774397176221932697_n.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v18-2",
        sku: "CLN-002-10PK",
        attributes: { Size: "Pack of 10", Color: "Clear" },
        price: 2299,
        compareAtPrice: 2799,
        inventory: { quantity: 54, reserved: 2, available: 52 },
        images: [
          "/images/products/strow_cleaner/495125665_724055096809290_774397176221932697_n.webp",
        ],
        status: "ACTIVE",
      },
    ],
    specifications: {
      Use: "Microwave sterilization",
      "Germ Kill": "99.9%",
      Time: "3 minutes",
      Pack: "5 or 10 bags",
    },
    status: "ACTIVE",
    createdAt: "2026-05-12T10:00:00Z",
    updatedAt: "2026-10-19T10:30:00Z",
  },
  {
    id: "p19",
    name: "Organic Rice Cereal Baby Food",
    slug: "organic-rice-cereal",
    description:
      "Organic iron-fortified rice cereal for babies 4+ months. Single grain, easy to digest, no added sugar.",
    categoryId: "cat-baby-foods",
    brand: "Starling Food",
    images: ["/images/products/lactonic_granules/IMG_3917_11zon.webp"],
    attributes: [
      { name: "Size", values: ["200g", "400g"] },
      { name: "Color", values: ["Plain", "Apple", "Banana"] },
    ],
    variants: [
      {
        id: "v19-1",
        sku: "BF-001-200-PLN",
        attributes: { Size: "200g", Color: "Plain" },
        price: 699,
        compareAtPrice: 899,
        inventory: { quantity: 112, reserved: 6, available: 106 },
        images: ["/images/products/lactonic_granules/IMG_3917_11zon.webp"],
        status: "ACTIVE",
      },
      {
        id: "v19-2",
        sku: "BF-001-200-APL",
        attributes: { Size: "200g", Color: "Apple" },
        price: 799,
        compareAtPrice: 999,
        inventory: { quantity: 112, reserved: 5, available: 107 },
        images: ["/images/products/lactonic_granules/IMG_3917_11zon.webp"],
        status: "ACTIVE",
      },
      {
        id: "v19-3",
        sku: "BF-001-200-BAN",
        attributes: { Size: "200g", Color: "Banana" },
        price: 799,
        inventory: { quantity: 89, reserved: 4, available: 85 },
        images: ["/images/products/lactonic_granules/IMG_3917_11zon.webp"],
        status: "ACTIVE",
      },
      {
        id: "v19-4",
        sku: "BF-001-400-PLN",
        attributes: { Size: "400g", Color: "Plain" },
        price: 1199,
        compareAtPrice: 1499,
        inventory: { quantity: 89, reserved: 5, available: 84 },
        images: ["/images/products/lactonic_granules/IMG_3917_11zon.webp"],
        status: "ACTIVE",
      },
      {
        id: "v19-5",
        sku: "BF-001-400-APL",
        attributes: { Size: "400g", Color: "Apple" },
        price: 1299,
        compareAtPrice: 1599,
        inventory: { quantity: 89, reserved: 4, available: 85 },
        images: ["/images/products/lactonic_granules/IMG_3917_11zon.webp"],
        status: "ACTIVE",
      },
      {
        id: "v19-6",
        sku: "BF-001-400-BAN",
        attributes: { Size: "400g", Color: "Banana" },
        price: 1299,
        inventory: { quantity: 72, reserved: 3, available: 69 },
        images: ["/images/products/lactonic_granules/IMG_3917_11zon.webp"],
        status: "ACTIVE",
      },
    ],
    specifications: {
      Type: "Iron-fortified rice cereal",
      "Age Range": "4M+",
      Sugar: "No added sugar",
      Grain: "Single grain",
    },
    status: "ACTIVE",
    createdAt: "2026-06-01T10:00:00Z",
    updatedAt: "2026-10-21T11:15:00Z",
  },
  {
    id: "p20",
    name: "Organic Fruit & Veggie Pouches Variety Pack",
    slug: "organic-fruit-veggie-pouches",
    description:
      "Variety pack of 6 organic fruit and veggie pouches. No preservatives, BPA-free pouches.",
    categoryId: "cat-baby-foods",
    brand: "Starling Food",
    images: [
      "/images/products/fruit_pacifier/aybcve8daj2woiuwgken_66_11zon.webp",
      "/images/products/fruit_pacifier/bvzd59pxdptkw6nglpeh_67_11zon.webp",
    ],
    attributes: [
      { name: "Size", values: ["Pack of 6", "Pack of 12"] },
      { name: "Color", values: ["Mixed", "Apple"] },
    ],
    variants: [
      {
        id: "v20-1",
        sku: "BF-002-6-MIX",
        attributes: { Size: "Pack of 6", Color: "Mixed" },
        price: 999,
        compareAtPrice: 1199,
        inventory: { quantity: 68, reserved: 4, available: 64 },
        images: [
          "/images/products/fruit_pacifier/aybcve8daj2woiuwgken_66_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v20-2",
        sku: "BF-002-6-APL",
        attributes: { Size: "Pack of 6", Color: "Apple" },
        price: 999,
        inventory: { quantity: 68, reserved: 3, available: 65 },
        images: [
          "/images/products/fruit_pacifier/bvzd59pxdptkw6nglpeh_67_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v20-3",
        sku: "BF-002-12-MIX",
        attributes: { Size: "Pack of 12", Color: "Mixed" },
        price: 1799,
        compareAtPrice: 2199,
        inventory: { quantity: 54, reserved: 3, available: 51 },
        images: [
          "/images/products/fruit_pacifier/aybcve8daj2woiuwgken_66_11zon.webp",
        ],
        status: "ACTIVE",
      },
      {
        id: "v20-4",
        sku: "BF-002-12-APL",
        attributes: { Size: "Pack of 12", Color: "Apple" },
        price: 1799,
        inventory: { quantity: 54, reserved: 2, available: 52 },
        images: [
          "/images/products/fruit_pacifier/bvzd59pxdptkw6nglpeh_67_11zon.webp",
        ],
        status: "ACTIVE",
      },
    ],
    specifications: {
      Type: "Fruit & veggie pouches",
      Count: "6 or 12 pouches",
      Preservatives: "None",
      Pouch: "BPA-free",
    },
    status: "ACTIVE",
    createdAt: "2026-06-05T10:00:00Z",
    updatedAt: "2026-10-20T16:30:00Z",
  },
];

export const productMap: Record<string, Product> = Object.fromEntries(
  products.map((p) => [p.id, p]),
);

export const skuMap: Record<string, ProductVariant> = Object.fromEntries(
  products.flatMap((p) => p.variants.map((v) => [v.sku, v])),
);
