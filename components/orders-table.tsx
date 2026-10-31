"use client"

import { useState } from "react"

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
  EllipsisVerticalIcon,
  ClockIcon,
  CheckCircle2Icon,
  TruckIcon,
  XIcon,
} from "lucide-react"
import { orders } from "@/data/orders"

const statusConfig: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  pending: { label: "Pending", variant: "outline" },
  processing: { label: "Processing", variant: "default" },
  shipped: { label: "Shipped", variant: "secondary" },
  delivered: { label: "Delivered", variant: "default" },
  cancelled: { label: "Cancelled", variant: "destructive" },
}

export function OrdersTable() {
  const [search, setSearch] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-4">
      <Toaster />
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-4" />
          Add Order
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="w-48">Date</TableHead>
              <TableHead className="w-24">Items</TableHead>
              <TableHead className="w-32">Total</TableHead>
              <TableHead className="w-48">Status</TableHead>
              <TableHead className="w-48">Shipping</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  {order.orderNumber}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{order.customer}</span>
                    <span className="text-xs text-muted-foreground">
                      {order.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell className="font-medium">
                  ${order.total.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={statusConfig[order.status].variant}
                    className="border capitalize"
                  >
                    {statusConfig[order.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {order.status === "delivered" ? (
                      <CheckCircle2Icon className="size-4 text-green-500" />
                    ) : order.status === "shipped" ? (
                      <TruckIcon className="size-4 text-blue-500" />
                    ) : order.status === "processing" ? (
                      <ClockIcon className="size-4 text-amber-500" />
                    ) : (
                      <XIcon className="size-4 text-gray-500" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {order.shipping}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <EllipsisVerticalIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
