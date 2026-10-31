"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productName?: string | null
  onDelete?: () => void
}

export function DeleteProductModal({
  open,
  onOpenChange,
  productName,
  onDelete,
}: DeleteProductModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium">
              {productName ? `"${productName}"` : "this product"}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={() => onDelete?.()}>
            <Trash2 size={16} /> Delete Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
