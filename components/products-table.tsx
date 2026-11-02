"use client"

import { useState } from "react"
import Link from "next/link"

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
import Pagination from "@/components/ui/pagination"
import {
  PlusIcon,
  SearchIcon,
  EditIcon,
  Trash2Icon,
} from "lucide-react"
import { products, type Product } from "@/data/products"
import { AddProductModal } from "@/components/products/AddProductModal"
import { EditProductModal } from "@/components/products/EditProductModal"
import { DeleteProductModal } from "@/components/products/DeleteProductModal"

const statusConfig: Record<
  Product["status"],
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  DRAFT: { label: "Draft", variant: "outline" },
  ACTIVE: { label: "Active", variant: "default" },
  ARCHIVED: { label: "Archived", variant: "destructive" },
}

export function ProductsTable() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(15)
  const [addProductOpen, setAddProductOpen] = useState(false)
  const [editProductOpen, setEditProductOpen] = useState(false)
  const [deleteProductOpen, setDeleteProductOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.slug.toLowerCase().includes(search.toLowerCase()) ||
      product.variants.some((v) =>
        v.sku.toLowerCase().includes(search.toLowerCase())
      )
  )

  const paginatedProducts = filteredProducts.slice(
    page * pageSize,
    (page + 1) * pageSize
  )

  const handleAddProduct = (product: Omit<Product, "id">) => {
    console.log("New product added:", product)
    setAddProductOpen(false)
  }

  const handleSaveProduct = (product: Omit<Product, "id">) => {
    console.log("Product saved:", product)
    setEditProductOpen(false)
    setEditingProduct(null)
  }

  const handleDeleteProduct = () => {
    console.log("Product deleted:", deletingProduct?.name)
    setDeleteProductOpen(false)
    setDeletingProduct(null)
  }

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
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(0)
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/products/add">
              <Button variant="outline" size="sm">
                <PlusIcon className="mr-2 size-4" />
                Add New Page
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAddProductOpen(true)}
            >
              <PlusIcon className="mr-2 size-4" />
              Add Product
            </Button>
          </div>
        </div>

      <AddProductModal
        open={addProductOpen}
        onOpenChange={setAddProductOpen}
        onAdd={handleAddProduct}
      />

      <EditProductModal
        open={editProductOpen}
        onOpenChange={setEditProductOpen}
        product={editingProduct}
        onSave={handleSaveProduct}
      />

      <DeleteProductModal
        open={deleteProductOpen}
        onOpenChange={setDeleteProductOpen}
        productName={deletingProduct?.name ?? null}
        onDelete={handleDeleteProduct}
      />

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
            {paginatedProducts.map((product) => {
              const firstVariant = product.variants[0]
              const prices = product.variants.map((v) => v.price)
              const totalStock = product.variants.reduce(
                (sum, v) => sum + v.inventory.available,
                0
              )

              const priceRange =
                prices.length > 1
                  ? `৳${Math.min(...prices)} – ৳${Math.max(...prices)}`
                  : `৳${prices[0] || 0}`

              return (
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
                  <TableCell className="font-mono text-xs">
                    {firstVariant?.sku || "—"}
                  </TableCell>
                  <TableCell>{product.categoryId}</TableCell>
                  <TableCell className="font-medium">{priceRange}</TableCell>
                  <TableCell className="font-medium">{totalStock}</TableCell>
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingProduct(product)
                          setEditProductOpen(true)
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setDeletingProduct(product)
                          setDeleteProductOpen(true)
                        }}
                      >
                        <Trash2Icon />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <Pagination
        totalItems={filteredProducts.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}
