import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download, Eye, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const orders = [
  {
    id: "ORD-2024-001",
    customer: "Priya Sharma",
    email: "priya@email.com",
    items: 3,
    total: 2897,
    status: "delivered",
    date: "2024-01-15",
    paymentStatus: "paid",
  },
  {
    id: "ORD-2024-002",
    customer: "Rahul Verma",
    email: "rahul@email.com",
    items: 1,
    total: 499,
    status: "processing",
    date: "2024-01-15",
    paymentStatus: "paid",
  },
  {
    id: "ORD-2024-003",
    customer: "Anita Patel",
    email: "anita@email.com",
    items: 2,
    total: 1598,
    status: "shipped",
    date: "2024-01-14",
    paymentStatus: "paid",
  },
  {
    id: "ORD-2024-004",
    customer: "Vikram Singh",
    email: "vikram@email.com",
    items: 1,
    total: 649,
    status: "pending",
    date: "2024-01-14",
    paymentStatus: "pending",
  },
  {
    id: "ORD-2024-005",
    customer: "Meera Gupta",
    email: "meera@email.com",
    items: 4,
    total: 3196,
    status: "delivered",
    date: "2024-01-13",
    paymentStatus: "paid",
  },
  {
    id: "ORD-2024-006",
    customer: "Arjun Reddy",
    email: "arjun@email.com",
    items: 2,
    total: 1798,
    status: "cancelled",
    date: "2024-01-12",
    paymentStatus: "refunded",
  },
];

const statusStyles = {
  delivered: "bg-success/10 text-success border-success/20",
  processing: "bg-info/10 text-info border-info/20",
  shipped: "bg-accent/10 text-accent border-accent/20",
  pending: "bg-muted text-muted-foreground border-border",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const paymentStyles = {
  paid: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  refunded: "bg-muted text-muted-foreground border-border",
};

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout title="Orders" subtitle="Manage customer orders">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl border border-border bg-card shadow-elegant overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Order
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Customer
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Date
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Items
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Total
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Payment
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="text-right p-4 text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">
                    <span className="font-medium text-foreground">{order.id}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {order.customer}
                      </p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(order.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4 text-sm text-foreground">{order.items}</td>
                  <td className="p-4 text-sm font-semibold text-foreground">
                    ₹{order.total.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <Badge
                      variant="outline"
                      className={paymentStyles[order.paymentStatus as keyof typeof paymentStyles]}
                    >
                      {order.paymentStatus}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant="outline"
                      className={statusStyles[order.status as keyof typeof statusStyles]}
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
