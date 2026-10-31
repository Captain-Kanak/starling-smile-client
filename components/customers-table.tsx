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
  EditIcon,
  Trash2Icon,
} from "lucide-react"
import { customers } from "@/data/dashboard-data"

const statusConfig: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  active: { label: "Active", variant: "default" },
  inactive: { label: "Inactive", variant: "secondary" },
}

export function CustomersTable() {
  const [search, setSearch] = useState("")

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.city.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-4">
      <Toaster />
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-4" />
          Add Customer
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Avatar</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="w-64">Email</TableHead>
              <TableHead className="w-40">Phone</TableHead>
              <TableHead className="w-32">City</TableHead>
              <TableHead className="w-32">Orders</TableHead>
              <TableHead className="w-40">Spent</TableHead>
              <TableHead className="w-40">Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="w-20">
                  <div className="flex items-center">
                    <span className="size-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium">
                      {customer.name.charAt(0)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.city}</TableCell>
                <TableCell className="font-medium">{customer.orders}</TableCell>
                <TableCell className="font-medium">
                  ${customer.spent.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={statusConfig[customer.status].variant}
                    className="border capitalize"
                  >
                    {statusConfig[customer.status].label}
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
