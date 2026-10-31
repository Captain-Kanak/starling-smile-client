"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"

interface ModalSectionProps {
  step: number
  title: string
  description?: string
  children: React.ReactNode
}

export function ModalSection({
  step,
  title,
  description,
  children,
}: ModalSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 px-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/60 text-accent-foreground font-medium text-xs shadow-sm border border-accent/30">
          {step}
        </span>
        <div>
          <Label className="text-sm font-semibold text-foreground leading-none">
            {title}
          </Label>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5 leading-none">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="border rounded-xl bg-card p-5 shadow-sm border-border">{children}</div>
    </section>
  )
}
