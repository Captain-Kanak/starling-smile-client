"use client"

import * as React from "react"
import { Save, X } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
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

import type { Product } from "@/data/products"
import { categories } from "@/data/categories"

interface EditProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
  onSave?: (product: Omit<Product, "id">) => void
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
  images: string
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

export function EditProductModal({
  open,
  onOpenChange,
  product,
  onSave,
}: EditProductModalProps) {
  const defaultFormData: FormData = {
    name: "",
    categoryId: "",
    description: "",
    images: "",
    weight: "",
    ageRange: "",
    variants: [],
  }

  const [formData, setFormData] = React.useState<FormData>(() => {
    if (!product) return defaultFormData
    return {
      name: product.name,
      categoryId: product.categoryId,
      description: product.description,
      images: product.images.join(", "),
      weight: product.specifications.Weight || "",
      ageRange: product.specifications["Age Range"] || "",
      variants: product.variants.map((v) => ({
        size: v.attributes.Size || "",
        color: v.attributes.Color || "",
        sku: v.sku,
        price: String(v.price),
        stock: String(v.inventory.quantity),
      })),
    }
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
    if (!onSave || !product) return

    const productData: Omit<Product, "id"> = {
      name: formData.name,
      slug: product.slug,
      description: formData.description,
      categoryId: formData.categoryId,
      images: formData.images.split(",").map((s) => s.trim()).filter(Boolean),
      attributes: [
        { name: "Size", values: variantSizes },
        { name: "Color", values: variantColors },
      ],
      variants: formData.variants.map((v, i) => ({
        id: product.variants[i]?.id || `v-${Date.now()}-${i}`,
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
      status: product.status,
      createdAt: product.createdAt,
      updatedAt: new Date().toISOString(),
    }

    onSave(productData)
    onOpenChange(false)
  }

  if (!product) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl sm:max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update product details and variants below.
          </DialogDescription>
        </DialogHeader>
        <Separator className="mt-2 mb-4" />
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
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
                    defaultValue={formData.categoryId}
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
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="h-32"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-images">Image URLs</Label>
                  <Input
                    id="product-images"
                    value={formData.images}
                    onChange={(e) =>
                      setFormData({ ...formData, images: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-weight">Weight</Label>
                  <Input
                    id="product-weight"
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
                    value={formData.ageRange}
                    onChange={(e) =>
                      setFormData({ ...formData, ageRange: e.target.value })
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="product-variants">Product Variants</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addVariant}
                  >
                    <Save size={14} /> Add Variant
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.variants.map((variant, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Variant {index + 1}
                        </span>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon-xs"
                          onClick={() => removeVariant(index)}
                          disabled={formData.variants.length === 1}
                        >
                          <X size={14} />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`variant-size-${index}`}>Size</Label>
                          <Select
                            defaultValue={variant.size}
                            onValueChange={(value) =>
                              updateVariantField(
                                index,
                                "size",
                                value ?? ""
                              )
                            }
                          >
                            <SelectTrigger
                              className="w-full h-8 text-xs"
                              id={`variant-size-${index}`}
                            >
                              <SelectValue placeholder="Size" />
                            </SelectTrigger>
                            <SelectContent className="text-xs">
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
                            defaultValue={variant.color}
                            onValueChange={(value) =>
                              updateVariantField(
                                index,
                                "color",
                                value ?? ""
                              )
                            }
                          >
                            <SelectTrigger
                              className="w-full h-8 text-xs"
                              id={`variant-color-${index}`}
                            >
                              <SelectValue placeholder="Color" />
                            </SelectTrigger>
                            <SelectContent className="text-xs">
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
                              updateVariantField(
                                index,
                                "price",
                                e.target.value
                              )
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
                              updateVariantField(
                                index,
                                "stock",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="mt-4" />

            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!formData.name || !formData.categoryId}
              >
                <Save size={16} /> Save Changes
              </Button>
            </div>
          </form>
        </div>
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <span className="sr-only">Close</span>
          <X size={20} strokeWidth={2} />
        </button>
      </DialogContent>
    </Dialog>
  )
}
