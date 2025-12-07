import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, FolderTree, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: number;
  name: string;
  description: string;
  productCount: number;
  icon: string;
}

const initialCategories: Category[] = [
  { id: 1, name: "Capsules", description: "Herbal capsules and supplements", productCount: 45, icon: "💊" },
  { id: 2, name: "Churna", description: "Traditional Ayurvedic powders", productCount: 32, icon: "🍃" },
  { id: 3, name: "Syrup", description: "Liquid herbal formulations", productCount: 28, icon: "🧴" },
  { id: 4, name: "Tablets", description: "Pressed herbal tablets", productCount: 38, icon: "💊" },
  { id: 5, name: "Oil", description: "Therapeutic and massage oils", productCount: 24, icon: "💧" },
  { id: 6, name: "Avaleha", description: "Herbal jams and lehyams", productCount: 15, icon: "🍯" },
  { id: 7, name: "Drops", description: "Concentrated herbal drops", productCount: 18, icon: "💧" },
  { id: 8, name: "Cream", description: "Topical herbal creams", productCount: 12, icon: "🧴" },
];

const Categories = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleSubmit = () => {
    if (!formData.name) return;

    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? { ...cat, name: formData.name, description: formData.description }
            : cat
        )
      );
      toast({ title: "Category Updated", description: `${formData.name} has been updated.` });
    } else {
      const newCategory: Category = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        productCount: 0,
        icon: "📦",
      };
      setCategories([...categories, newCategory]);
      toast({ title: "Category Created", description: `${formData.name} has been created.` });
    }

    setIsDialogOpen(false);
    setFormData({ name: "", description: "" });
    setEditingCategory(null);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    toast({ title: "Category Deleted", description: "The category has been removed." });
  };

  const openNewDialog = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
    setIsDialogOpen(true);
  };

  return (
    <DashboardLayout title="Categories" subtitle="Organize your product categories">
      {/* Actions Bar */}
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <FolderTree className="h-5 w-5" />
          <span className="text-sm">{categories.length} categories</span>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Create New Category"}
              </DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? "Update the category details below."
                  : "Add a new product category to organize your inventory."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Capsules"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of this category..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingCategory ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="rounded-xl border border-border bg-card p-5 shadow-elegant hover:shadow-lg transition-all duration-300 animate-slide-up group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                {category.icon}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleEdit(category)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-1">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {category.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>{category.productCount} products</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Categories;
