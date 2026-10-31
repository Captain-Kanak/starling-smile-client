"use client"

import * as React from "react"
import { Plus, Trash2, Save, Upload } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ImageUpload } from "@/components/products/ImageUpload"
import { ModalSection } from "@/components/products/ModalSection"

import type { Product } from "@/data/products"
import { categories } from "@/data/categories"

interface AddProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd?: (product: Omit<Product, "id">) => void
}

interface VariantForm {
  size: string
  color: string
  sku: string
  price: string
  stock: string
}

interface FormData {
  name: string
  categoryId: string
  description: string
  images: string[]
  weight: string
  ageRange: string
  variants: VariantForm[]
}

const variantSizes = [
  "0-3M", "3-6M", "6-9M", "9-12M", "One Size", "Standard", "Large",
  "Small", "Medium", "Pack of 5", "Pack of 10", "Pack of 6", "Pack of 12",
  "100ml", "200ml", "300ml", "500ml", "3-pack", "6-pack", "Newborn",
  "Size 1", "Size 2", "30g", "60g", "100g", "Basic", "Complete", "Travel",
]
const variantColors = [
  "White", "Pink", "Blue", "Green", "Yellow", "Cream", "Grey",
  "Natural Wood", "Pastel", "Bright", "Clear", "Mixed", "Apple",
  "Banana", "Plain", "Infrared",
]

export function AddProductModal({
  open,
  onOpenChange,
  onAdd,
}: AddProductModalProps) {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    categoryId: "",
    description: "",
    images: [],
    weight: "",
    ageRange: "",
    variants: [{ size: "", color: "", sku: "", price: "", stock: "" }],
  })

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        { size: "", color: "", sku: "", price: "", stock: "" },
      ],
    }))
  }

  const removeVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }))
  }

  const updateVariantField = (
    index: number,
    field: keyof VariantForm,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) =>
        i === index ? { ...v, [field]: value } : v
      ),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!onAdd) return

    const category = categories.find((c) => c.id === formData.categoryId)

    const product: Omit<Product, "id"> = {
      name: formData.name,
      slug: formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      description: formData.description,
      categoryId: formData.categoryId,
      images: formData.images,
      attributes: [
        { name: "Size", values: variantSizes },
        { name: "Color", values: variantColors },
      ],
      variants: formData.variants.map((v) => ({
        id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        sku: v.sku,
        attributes: { Size: v.size, Color: v.color },
        price: Number(v.price) || 0,
        inventory: {
          quantity: Number(v.stock) || 0,
          reserved: 0,
          available: Number(v.stock) || 0,
        },
        images: [],
        status: "ACTIVE",
      })),
      specifications: {
        Weight: formData.weight,
        "Age Range": formData.ageRange,
      },
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (category) {
      product.slug = `${category.slug}-${product.slug}`
    }

    onAdd(product)
    setFormData({
      name: "",
      categoryId: "",
      description: "",
      images: [],
      weight: "",
      ageRange: "",
      variants: [{ size: "", color: "", sku: "", price: "", stock: "" }],
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 w-[92vw] max-h-[95vh] flex flex-col overflow-hidden">
        <div className="flex-shrink-0 bg-background p-6 border-b border-border/50 text-foreground">
          <div className="flex items-center gap-2 mb-2">
            <Upload size={20} className="text-foreground" />
            <DialogTitle className="text-xl font-semibold tracking-tight leading-none">Add New Product</DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
            Create a new product with variants, images, and specifications.
          </DialogDescription>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <form id="add-product-form" onSubmit={handleSubmit} className="space-y-6">
            <ModalSection
              step={1}
              title="Product Information"
              description="Enter the basic details about this product."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
                    placeholder="e.g. Gentle Baby Lotion"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-category">Category</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, categoryId: value ?? "" })
                    }
                  >
                    <SelectTrigger className="w-full" id="product-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <Input
                  id="product-description"
                  placeholder="Brief product description..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="h-32"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-images">Product Images</Label>
                <ImageUpload
                  value={formData.images}
                  onChange={(imgs) =>
                    setFormData({ ...formData, images: imgs })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-weight">Weight</Label>
                  <Input
                    id="product-weight"
                    placeholder="e.g. 200ml"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-age-range">Age Range</Label>
                  <Input
                    id="product-age-range"
                    placeholder="e.g. 0M+"
                    value={formData.ageRange}
                    onChange={(e) =>
                      setFormData({ ...formData, ageRange: e.target.value })
                    }
                  />
                </div>
              </div>
            </ModalSection>

            <Separator className="border-border/50" />

            <ModalSection
              step={2}
              title="Product Variants"
              description="Define size, color, SKU, price & stock per variant."
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Manage variant options
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addVariant}
                >
                  <Plus size={14} /> Add Variant
                </Button>
              </div>

              <div className="space-y-3">
                {formData.variants.map((variant, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 bg-muted/40 hover:bg-muted/60 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                        Variant {index + 1}
                      </span>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon-xs"
                        onClick={() => removeVariant(index)}
                        disabled={formData.variants.length === 1}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor={`variant-size-${index}`}>Size</Label>
                        <Select
                          value={variant.size}
                          onValueChange={(value) =>
                            updateVariantField(index, "size", value ?? "")
                          }
                        >
                          <SelectTrigger
                            className="w-full h-9 text-sm"
                            id={`variant-size-${index}`}
                          >
                            <SelectValue placeholder="Size" />
                          </SelectTrigger>
                          <SelectContent className="text-sm">
                            <SelectGroup>
                              {variantSizes.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`variant-color-${index}`}>Color</Label>
                        <Select
                          value={variant.color}
                          onValueChange={(value) =>
                            updateVariantField(index, "color", value ?? "")
                          }
                        >
                          <SelectTrigger
                            className="w-full h-9 text-sm"
                            id={`variant-color-${index}`}
                          >
                            <SelectValue placeholder="Color" />
                          </SelectTrigger>
                          <SelectContent className="text-sm">
                            <SelectGroup>
                              {variantColors.map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`variant-sku-${index}`}>SKU</Label>
                        <Input
                          id={`variant-sku-${index}`}
                          placeholder="e.g. BC-001-200"
                          value={variant.sku}
                          onChange={(e) =>
                            updateVariantField(index, "sku", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`variant-price-${index}`}>
                          Price (৳)
                        </Label>
                        <Input
                          id={`variant-price-${index}`}
                          type="number"
                          value={variant.price}
                          onChange={(e) =>
                            updateVariantField(index, "price", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`variant-stock-${index}`}>Stock</Label>
                        <Input
                          id={`variant-stock-${index}`}
                          type="number"
                          value={variant.stock}
                          onChange={(e) =>
                            updateVariantField(index, "stock", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ModalSection>
          </form>
        </div>
        <div className="flex-shrink-0 border-t border-border/50 bg-background/50 backdrop-blur p-4 flex items-center justify-between gap-3">
          <Button
            type="submit"
            form="add-product-form"
            disabled={!formData.name || !formData.categoryId}
          >
            <Save size={16} /> Add Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
