"use client"

import * as React from "react"
import Image from "next/image"
import { Image as ImageIcon, Upload as UploadIcon } from "lucide-react"

interface ImageUploadProps {
  value: string[]
  onChange: (value: string[]) => void
  preview?: boolean
}

export function ImageUpload({
  value,
  onChange,
  preview = true,
}: ImageUploadProps) {
  const [isDragActive, setDragActive] = React.useState(false)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const droppedFiles = Array.from(e.dataTransfer.files || [])
    if (droppedFiles.length === 0) return

    const readerPromises = droppedFiles.map((file) => {
      if (!file.type.startsWith("image/")) return Promise.resolve(null)
      return new Promise<string | null>((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })
    })

    Promise.all(readerPromises).then((dataUrls) => {
      const images = dataUrls.filter((u): u is string => u !== null)
      onChange([...value, ...images])
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    if (newFiles.length === 0) return

    const readerPromises = newFiles.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })
    })

    Promise.all(readerPromises).then((dataUrls) => {
      onChange([...value, ...dataUrls])
    })
  }

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const clearAll = () => {
    onChange([])
  }

  const dropZoneClass = React.useMemo(
    () =>
      "relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 transition-all duration-200 cursor-pointer" +
      (isDragActive
        ? " border-primary bg-primary/5 text-primary"
        : " border-border text-muted-foreground hover:border-primary hover:bg-muted"),
    [isDragActive]
  )

  return (
    <div className="space-y-2">
      <label
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={dropZoneClass}
      >
        <div className="flex flex-col items-center gap-2">
          <UploadIcon
            size={24}
            className={React.useMemo(
              () =>
                isDragActive ? "text-primary" : "text-muted-foreground",
              [isDragActive]
            )}
          />
          <span className={React.useMemo(
            () =>
              isDragActive
              ? "text-sm font-medium text-primary"
              : "text-sm text-muted-foreground",
            [isDragActive]
          )}>
            {isDragActive ? "Drop files here" : "Drag & drop or click to upload"}
          </span>
          <span className="text-xs text-muted-foreground">
            PNG, JPG up to 5MB each
          </span>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={handleFileChange}
        />
      </label>

      {preview && value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {value.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden border bg-muted">
              <Image
                src={img}
                alt="Preview"
                fill
                className="object-cover"
                priority
                unoptimized
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-6 hover:bg-red-600 transition-colors flex items-center justify-center"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={clearAll}
            className="aspect-square rounded-xl border border-dashed flex items-center justify-center gap-2 text-xs text-destructive hover:bg-destructive/10 transition-colors"
          >
            <ImageIcon size={14} /> Clear all
          </button>
        </div>
      )}
    </div>
  )
}
