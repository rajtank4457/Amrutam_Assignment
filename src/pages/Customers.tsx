import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Mail, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const customers = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    orders: 12,
    totalSpent: 24500,
    lastOrder: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    name: "Rahul Verma",
    email: "rahul.verma@email.com",
    phone: "+91 98765 43211",
    orders: 5,
    totalSpent: 8750,
    lastOrder: "2024-01-14",
    status: "active",
  },
  {
    id: 3,
    name: "Anita Patel",
    email: "anita.patel@email.com",
    phone: "+91 98765 43212",
    orders: 8,
    totalSpent: 15200,
    lastOrder: "2024-01-12",
    status: "active",
  },
  {
    id: 4,
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 98765 43213",
    orders: 3,
    totalSpent: 4200,
    lastOrder: "2024-01-10",
    status: "inactive",
  },
  {
    id: 5,
    name: "Meera Gupta",
    email: "meera.gupta@email.com",
    phone: "+91 98765 43214",
    orders: 15,
    totalSpent: 32000,
    lastOrder: "2024-01-15",
    status: "vip",
  },
  {
    id: 6,
    name: "Arjun Reddy",
    email: "arjun.reddy@email.com",
    phone: "+91 98765 43215",
    orders: 1,
    totalSpent: 1299,
    lastOrder: "2024-01-08",
    status: "new",
  },
];

const statusStyles = {
  active: "bg-success/10 text-success border-success/20",
  inactive: "bg-muted text-muted-foreground border-border",
  vip: "bg-accent/10 text-accent border-accent/20",
  new: "bg-info/10 text-info border-info/20",
};

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout title="Customers" subtitle="Manage your customer base">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Email All
          </Button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-xl border border-border bg-card shadow-elegant overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Customer
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Contact
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Orders
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Total Spent
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Last Order
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
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {customer.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <span className="font-medium text-foreground">
                        {customer.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm text-foreground">{customer.email}</p>
                      <p className="text-xs text-muted-foreground">{customer.phone}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-foreground">{customer.orders}</td>
                  <td className="p-4 text-sm font-semibold text-foreground">
                    ₹{customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(customer.lastOrder).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4">
                    <Badge
                      variant="outline"
                      className={statusStyles[customer.status as keyof typeof statusStyles]}
                    >
                      {customer.status}
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
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>View Orders</DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
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

export default Customers;
