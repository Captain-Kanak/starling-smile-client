"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Pagination = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    total?: number
    pageSize?: number
    pageBounds?: number
    siblingCount?: number
    onPageChange?: (page: number) => void
    defaultPage?: number
    className?: string
  }
>(({
  total = 0,
  pageSize = 10,
  pageBounds = 1,
  siblingCount = 1,
  onPageChange,
  defaultPage = 1,
  className,
  ...props
}, ref) => {
  const [activePage, setActivePage] = React.useState(defaultPage)
  const pagesCount = React.useMemo(() => Math.ceil(total / pageSize), [
    total,
    pageSize,
  ])

  const setPage = React.useCallback(
    (page: number) => {
      const pageNumber = Math.max(1, Math.min(page, pagesCount))
      setActivePage(pageNumber)
      onPageChange?.(pageNumber - 1)
    },
    [pagesCount, onPageChange]
  )

  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2 rounded-lg min-w-max",
        className,
      )}
    >
      <PaginationContent
        activePage={activePage}
        pagesCount={pagesCount}
        pageBounds={pageBounds}
        siblingCount={siblingCount}
        setPage={setPage}
      />
    </div>
  )
})
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    activePage: number
    pagesCount: number
    pageBounds?: number
    siblingCount?: number
    setPage: (page: number) => void
  }
>(({ activePage, pagesCount, pageBounds = 1, siblingCount = 1, setPage, className, ...props }, ref) => {
  const pageDelta = pageBounds + siblingCount * 2 + 2

  const startingPage = React.useMemo(() => {
    if (pagesCount <= pageDelta) return 1
    return Math.min(
      Math.max(activePage - pageBounds, 1),
      pagesCount - pageDelta
    )
  }, [pagesCount, pageDelta, activePage, pageBounds])

  const pageRange = React.useMemo(() => {
    const minPage = startingPage || 1
    const maxPage = Math.min(pagesCount, minPage + pageDelta - 1)
    return { minPage, maxPage }
  }, [pagesCount, startingPage, pageDelta])

  const items = React.useMemo(() => {
    const result: (number | "ellipsis")[] = []
    if (pagesCount <= pageDelta) {
      for (let page = 1; page <= pagesCount; page++) {
        result.push(page)
      }
      return result
    }

    const { minPage, maxPage } = pageRange

    if (minPage > 1) {
      result.push(1)
      if (minPage > 2) {
        result.push("ellipsis")
      }
    }

    for (let page = minPage; page <= maxPage; page++) {
      result.push(page)
    }

    if (maxPage < pagesCount) {
      if (maxPage < pagesCount - 1) {
        result.push("ellipsis")
      }
      result.push(pagesCount)
    }

    return result
  }, [pagesCount, pageDelta, pageRange])

  return (
    <div ref={ref} {...props} className={cn("flex items-center gap-1", className)}>
      <PaginationPrevious
        onPress={activePage > 1 ? () => setPage(activePage - 1) : undefined}
      />
      {items.map((item, index) => {
        if (item === "ellipsis") {
          return (
            <PaginationItem key={index}>
              <PaginationEllipsis>...</PaginationEllipsis>
            </PaginationItem>
          )
        }

        return (
          <PaginationItem key={item}>
            <PaginationLink
              onPress={() => setPage(item)}
              isActive={activePage === item}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        )
      })}
      <PaginationNext
        onPress={activePage < pagesCount ? () => setPage(activePage + 1) : undefined}
      />
    </div>
  )
})
PaginationContent.displayName = "PaginationContent"

function PaginationItem({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  children: React.ReactNode
}) {
  return (
    <div
      {...props}
      className={cn("shrink-0", className)}
    >
      {children}
    </div>
  )
}
PaginationItem.displayName = "PaginationItem"

function PaginationLink({
  className,
  isActive = false,
  onPress,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  isActive?: boolean
  onPress?: (page: number) => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof onPress === "function") {
          onPress(Number(children))
        }
      }}
      disabled={isActive}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center justify-center w-9 h-9 bg-transparent rounded-xl cursor-pointer text-foreground text-base font-medium transition-colors",
        isActive
          ? "bg-[#f3f4f6] border border-[#e5e5e5] rounded-xl"
          : "hover:bg-[#f3f4f6]/50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
PaginationLink.displayName = "PaginationLink"

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      {...props}
      className={cn("mx-1 flex h-9 w-9 items-center justify-center text-foreground text-base", className)}
    >
      ...
    </span>
  )
}
PaginationEllipsis.displayName = "PaginationEllipsis"

function PaginationPrevious({
  className,
  onPress,
  ...props
}: React.ComponentProps<"button"> & {
  onPress?: () => void
}) {
  return (
    <button
      type="button"
      onClick={() => onPress?.()}
      disabled={!onPress}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 bg-transparent rounded-lg cursor-pointer text-foreground text-sm font-medium transition-colors",
        "hover:bg-[#181818]/10",
        !onPress && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      <ChevronLeft className="size-4" />
      <span>Previous</span>
    </button>
  )
}
PaginationPrevious.displayName = "PaginationPrevious"

function PaginationNext({
  className,
  onPress,
  ...props
}: React.ComponentProps<"button"> & {
  onPress?: () => void
}) {
  return (
    <button
      type="button"
      onClick={() => onPress?.()}
      disabled={!onPress}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 bg-transparent rounded-lg cursor-pointer text-foreground text-sm font-medium transition-colors",
        "hover:bg-[#181818]/10",
        !onPress && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="size-4" />
    </button>
  )
}
PaginationNext.displayName = "PaginationNext"

// Table wrapper: rows-per-page select on left, shadcn pagination buttons on right
interface TablePaginationProps {
  totalItems: number
  page: number  // 0-based
  pageSize: number
  onPageChange: (page: number) => void  // 0-based
  onPageSizeChange?: (pageSize: number) => void
  pageSizeOptions?: number[]
  className?: string
}

export default function TablePagination({
  totalItems,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [15, 30, 45, 60],
  className,
}: TablePaginationProps) {
  const activePage = page + 1 // convert 0-based to 1-based for shadcn

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row items-center justify-between gap-4 px-4 lg:px-6",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Label htmlFor="rows-per-page" className="text-sm font-medium text-foreground">
          Rows per page
        </Label>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            onPageSizeChange?.(Number(value))
            onPageChange(0)
          }}
          items={pageSizeOptions.map((pageSize) => ({
            label: `${pageSize}`,
            value: `${pageSize}`,
          }))}
        >
          <SelectTrigger size="sm" className="w-20 cursor-pointer" id="rows-per-page">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectGroup>
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Pagination
        total={totalItems}
        pageSize={pageSize}
        defaultPage={activePage}
        onPageChange={(nextPage) => onPageChange(nextPage - 1)}
        className="flex items-center gap-2"
      />
    </div>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
