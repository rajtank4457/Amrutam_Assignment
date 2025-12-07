import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const products = [
  {
    id: 1,
    name: "Ashwagandha Capsules",
    sku: "ASH-001",
    category: "Capsules",
    price: 1299,
    stock: 150,
    status: "active",
    image: "🌿",
  },
  {
    id: 2,
    name: "Triphala Churna",
    sku: "TRI-002",
    category: "Churna",
    price: 499,
    stock: 89,
    status: "active",
    image: "🍃",
  },
  {
    id: 3,
    name: "Brahmi Syrup",
    sku: "BRA-003",
    category: "Syrup",
    price: 799,
    stock: 45,
    status: "low_stock",
    image: "🧴",
  },
  {
    id: 4,
    name: "Chyawanprash",
    sku: "CHY-004",
    category: "Avaleha",
    price: 649,
    stock: 0,
    status: "out_of_stock",
    image: "🍯",
  },
  {
    id: 5,
    name: "Neem Tablets",
    sku: "NEE-005",
    category: "Tablets",
    price: 399,
    stock: 200,
    status: "active",
    image: "💊",
  },
  {
    id: 6,
    name: "Tulsi Drops",
    sku: "TUL-006",
    category: "Drops",
    price: 299,
    stock: 120,
    status: "active",
    image: "💧",
  },
];

const statusStyles = {
  active: "bg-success/10 text-success border-success/20",
  low_stock: "bg-warning/10 text-warning border-warning/20",
  out_of_stock: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusLabels = {
  active: "Active",
  low_stock: "Low Stock",
  out_of_stock: "Out of Stock",
};

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout title="Products" subtitle="Manage your product inventory">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="capsules">Capsules</SelectItem>
              <SelectItem value="churna">Churna</SelectItem>
              <SelectItem value="syrup">Syrup</SelectItem>
              <SelectItem value="tablets">Tablets</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button asChild>
          <Link to="/products/add">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Products Table */}
      <div className="rounded-xl border border-border bg-card shadow-elegant overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Product
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  SKU
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Category
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Price
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">
                  Stock
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
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center text-2xl">
                        {product.image}
                      </div>
                      <span className="font-medium text-foreground">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {product.sku}
                  </td>
                  <td className="p-4 text-sm text-foreground">
                    {product.category}
                  </td>
                  <td className="p-4 text-sm font-semibold text-foreground">
                    ₹{product.price.toLocaleString()}
                  </td>
                  <td className="p-4 text-sm text-foreground">{product.stock}</td>
                  <td className="p-4">
                    <Badge
                      variant="outline"
                      className={statusStyles[product.status as keyof typeof statusStyles]}
                    >
                      {statusLabels[product.status as keyof typeof statusLabels]}
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
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
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

export default Products;
