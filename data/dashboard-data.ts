export interface Order {
  id: string
  orderNumber: string
  customer: string
  email: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "paid" | "unpaid" | "refunded"
  items: number
  total: number
  shipping: string
}

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: "active" | "out-of-stock" | "low-stock"
  image: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  city: string
  orders: number
  spent: number
  lastOrder: string
  status: "active" | "inactive"
}

export interface DashboardStats {
  totalSales: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  conversionRate: number
  avgOrderValue: number
}

export const orders: Order[] = [
  {
    id: "1",
    orderNumber: "SM-1001",
    customer: "Aisha Rahman",
    email: "aisha.rahman@email.com",
    date: "2026-10-28",
    status: "delivered",
    paymentStatus: "paid",
    items: 3,
    total: 89.97,
    shipping: "Delivered",
  },
  {
    id: "2",
    orderNumber: "SM-1002",
    customer: "Rahim Khan",
    email: "rahim.khan@email.com",
    date: "2026-10-27",
    status: "shipped",
    paymentStatus: "paid",
    items: 2,
    total: 54.98,
    shipping: "In Transit",
  },
  {
    id: "3",
    orderNumber: "SM-1003",
    customer: "Fatima Ali",
    email: "fatima.ali@email.com",
    date: "2026-10-26",
    status: "processing",
    paymentStatus: "paid",
    items: 5,
    total: 149.95,
    shipping: "Processing",
  },
  {
    id: "4",
    orderNumber: "SM-1004",
    customer: "Karim Hossain",
    email: "karim.hossain@email.com",
    date: "2026-10-25",
    status: "pending",
    paymentStatus: "unpaid",
    items: 1,
    total: 24.99,
    shipping: "Not Shipped",
  },
  {
    id: "5",
    orderNumber: "SM-1005",
    customer: "Nadia Chowdhury",
    email: "nadia.chowdhury@email.com",
    date: "2026-10-24",
    status: "delivered",
    paymentStatus: "paid",
    items: 4,
    total: 219.96,
    shipping: "Delivered",
  },
  {
    id: "6",
    orderNumber: "SM-1006",
    customer: "Hasan Mahmud",
    email: "hasan.mahmud@email.com",
    date: "2026-10-23",
    status: "shipped",
    paymentStatus: "paid",
    items: 2,
    total: 69.98,
    shipping: "In Transit",
  },
  {
    id: "7",
    orderNumber: "SM-1007",
    customer: "Sadia Akter",
    email: "sadia.akter@email.com",
    date: "2026-10-22",
    status: "cancelled",
    paymentStatus: "refunded",
    items: 1,
    total: 39.99,
    shipping: "Cancelled",
  },
  {
    id: "8",
    orderNumber: "SM-1008",
    customer: "Imran Siddique",
    email: "imran.siddique@email.com",
    date: "2026-10-21",
    status: "delivered",
    paymentStatus: "paid",
    items: 6,
    total: 329.94,
    shipping: "Delivered",
  },
  {
    id: "9",
    orderNumber: "SM-1009",
    customer: "Tasnim Islam",
    email: "tasnim.islam@email.com",
    date: "2026-10-20",
    status: "processing",
    paymentStatus: "paid",
    items: 3,
    total: 119.97,
    shipping: "Processing",
  },
  {
    id: "10",
    orderNumber: "SM-1010",
    customer: "Rafiq Uddin",
    email: "rafiq.uddin@email.com",
    date: "2026-10-19",
    status: "pending",
    paymentStatus: "unpaid",
    items: 2,
    total: 79.98,
    shipping: "Not Shipped",
  },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Gentle Baby Lotion with Natural Extracts",
    sku: "BC-001",
    category: "Baby Care",
    price: 12.99,
    stock: 145,
    status: "active",
    image: "/images/products/sudocrem.webp",
  },
  {
    id: "2",
    name: "Baby Shampoo & Wash Tear-Free Formula",
    sku: "BC-002",
    category: "Baby Care",
    price: 14.99,
    stock: 89,
    status: "active",
    image: "/images/products/sudocrem.webp",
  },
  {
    id: "3",
    name: "Soft Plush Bunny Toy for Infants",
    sku: "TY-001",
    category: "Toys",
    price: 24.99,
    stock: 12,
    status: "low-stock",
    image: "/images/products/sudocrem.webp",
  },
  {
    id: "4",
    name: "Wooden Activity Gym with Hanging Toys",
    sku: "TY-002",
    category: "Toys",
    price: 49.99,
    stock: 3,
    status: "low-stock",
    image: "/images/products/sudocrem.webp",
  },
  {
    id: "5",
    name: "Baby Feeding Bottle Set Anti-Colic",
    sku: "FD-001",
    category: "Feeding",
    price: 19.99,
    stock: 0,
    status: "out-of-stock",
    image: "/images/products/sudocrem.webp",
  },
  {
    id: "6",
    name: "Silicone Bibs Waterproof 3-Pack Set",
    sku: "FD-002",
    category: "Feeding",
    price: 15.99,
    stock: 200,
    status: "active",
    image: "/images/products/sudocrem.webp",
  },
  {
    id: "7",
    name: "Organic Cotton Onesies Newborn Pack",
    sku: "CL-001",
    category: "Clothing",
    price: 29.99,
    stock: 67,
    status: "active",
    image: "/images/products/sudocrem.webp",
  },
  {
    id: "8",
    name: "Baby Knit Hat Soft Winter Cap",
    sku: "CL-002",
    category: "Clothing",
    price: 11.99,
    stock: 234,
    status: "active",
    image: "/images/products/sudocrem.webp",
  },
  {
    id: "9",
    name: "Eco Baby Diapers Newborn Size Pack",
    sku: "DP-001",
    category: "Diapering",
    price: 34.99,
    stock: 45,
    status: "active",
    image: "/images/products/sudocrem.webp",
  },
  {
    id: "10",
    name: "Diaper Rash Cream Sensitive Skin",
    sku: "DP-002",
    category: "Diapering",
    price: 13.99,
    stock: 8,
    status: "low-stock",
    image: "/images/products/sudocrem.webp",
  },
  {
    id: "11",
    name: "Baby Mobile Musical Nursery Crib Toy",
    sku: "NR-001",
    category: "Nursery",
    price: 39.99,
    stock: 56,
    status: "active",
    image: "/images/products/sudocrem.webp",
  },
  {
    id: "12",
    name: "Sound Machine White Noise Baby Sleep",
    sku: "NR-002",
    category: "Nursery",
    price: 44.99,
    stock: 31,
    status: "active",
    image: "/images/products/sudocrem.webp",
  },
  {
    id: "13",
    name: "Baby Bathtub Non-Slip Newborn Bath",
    sku: "BS-001",
    category: "Bath & Skin",
    price: 29.99,
    stock: 19,
    status: "active",
    image: "/images/products/sudocrem.webp",
  },
  {
    id: "14",
    name: "Hooded Towels Soft Absorbent 2-Pack",
    sku: "BS-002",
    category: "Bath & Skin",
    price: 22.99,
    stock: 78,
    status: "active",
    image: "/images/products/sudocrem.webp",
  },
  {
    id: "15",
    name: "Baby Thermometer Digital Accurate Reading",
    sku: "HS-001",
    category: "Health & Safety",
    price: 27.99,
    stock: 5,
    status: "low-stock",
    image: "/images/products/sudocrem.webp",
  },
  {
    id: "16",
    name: "Baby First Aid Kit Complete Essentials",
    sku: "HS-002",
    category: "Health & Safety",
    price: 38.99,
    stock: 23,
    status: "active",
    image: "/images/products/sudocrem.webp",
  },
]

export const customers: Customer[] = [
  {
    id: "1",
    name: "Aisha Rahman",
    email: "aisha.rahman@email.com",
    phone: "+880 1711-000001",
    city: "Dhaka",
    orders: 12,
    spent: 894.5,
    lastOrder: "2026-10-28",
    status: "active",
  },
  {
    id: "2",
    name: "Rahim Khan",
    email: "rahim.khan@email.com",
    phone: "+880 1711-000002",
    city: "Chittagong",
    orders: 8,
    spent: 542.3,
    lastOrder: "2026-10-27",
    status: "active",
  },
  {
    id: "3",
    name: "Fatima Ali",
    email: "fatima.ali@email.com",
    phone: "+880 1711-000003",
    city: "Sylhet",
    orders: 5,
    spent: 298.7,
    lastOrder: "2026-10-26",
    status: "active",
  },
  {
    id: "4",
    name: "Karim Hossain",
    email: "karim.hossain@email.com",
    phone: "+880 1711-000004",
    city: "Khulna",
    orders: 3,
    spent: 124.9,
    lastOrder: "2026-10-25",
    status: "inactive",
  },
  {
    id: "5",
    name: "Nadia Chowdhury",
    email: "nadia.chowdhury@email.com",
    phone: "+880 1711-000005",
    city: "Dhaka",
    orders: 15,
    spent: 1245.8,
    lastOrder: "2026-10-24",
    status: "active",
  },
  {
    id: "6",
    name: "Hasan Mahmud",
    email: "hasan.mahmud@email.com",
    phone: "+880 1711-000006",
    city: "Rajshahi",
    orders: 7,
    spent: 489.2,
    lastOrder: "2026-10-23",
    status: "active",
  },
  {
    id: "7",
    name: "Sadia Akter",
    email: "sadia.akter@email.com",
    phone: "+880 1711-000007",
    city: "Barisal",
    orders: 2,
    spent: 89.5,
    lastOrder: "2026-10-22",
    status: "inactive",
  },
  {
    id: "8",
    name: "Imran Siddique",
    email: "imran.siddique@email.com",
    phone: "+880 1711-000008",
    city: "Dhaka",
    orders: 20,
    spent: 2104.3,
    lastOrder: "2026-10-21",
    status: "active",
  },
]

export const dashboardStats: DashboardStats = {
  totalSales: 12450.75,
  totalOrders: 342,
  totalCustomers: 89,
  totalProducts: 124,
  conversionRate: 3.4,
  avgOrderValue: 36.4,
}
