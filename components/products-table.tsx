"use client"

import { useState } from "react"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Toaster } from "@/components/ui/sonner"
import {
  PlusIcon,
  SearchIcon,
  EditIcon,
  Trash2Icon,
} from "lucide-react"
import { products } from "@/data/products"

const statusConfig: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  active: { label: "Active", variant: "default" },
  "low-stock": { label: "Low Stock", variant: "secondary" },
  "out-of-stock": { label: "Out of Stock", variant: "destructive" },
}

export function ProductsTable() {
  const [search, setSearch] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-4">
      <Toaster />
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-4" />
          Add Product
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="w-32">SKU</TableHead>
              <TableHead className="w-48">Category</TableHead>
              <TableHead className="w-32">Price</TableHead>
              <TableHead className="w-32">Stock</TableHead>
              <TableHead className="w-40">Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="w-20">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={32}
                    height={32}
                    className="size-8 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="font-mono text-xs">{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="font-medium">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell className="font-medium">
                  {product.stock}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={statusConfig[product.status].variant}
                    className="border capitalize"
                  >
                    {statusConfig[product.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <EditIcon />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2Icon />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
