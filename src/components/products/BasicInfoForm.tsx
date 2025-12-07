import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BasicInfoFormProps {
  data: {
    name: string;
    description: string;
    shortDescription: string;
    sku: string;
    category: string;
    subCategory: string;
    brand: string;
  };
  onChange: (data: Partial<BasicInfoFormProps["data"]>) => void;
}

const categories = [
  "Capsules",
  "Tablets",
  "Churna",
  "Syrup",
  "Oil",
  "Avaleha",
  "Drops",
  "Cream",
];

export function BasicInfoForm({ data, onChange }: BasicInfoFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            placeholder="e.g., Ashwagandha Capsules"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sku">SKU *</Label>
          <Input
            id="sku"
            placeholder="e.g., ASH-001"
            value={data.sku}
            onChange={(e) => onChange({ sku: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="shortDescription">Short Description</Label>
        <Input
          id="shortDescription"
          placeholder="Brief product summary (max 160 characters)"
          value={data.shortDescription}
          onChange={(e) => onChange({ shortDescription: e.target.value })}
          maxLength={160}
        />
        <p className="text-xs text-muted-foreground">
          {data.shortDescription.length}/160 characters
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Full Description *</Label>
        <Textarea
          id="description"
          placeholder="Detailed product description including benefits, ingredients, usage..."
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={5}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={data.category}
            onValueChange={(value) => onChange({ category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subCategory">Sub-Category</Label>
          <Input
            id="subCategory"
            placeholder="e.g., Immunity"
            value={data.subCategory}
            onChange={(e) => onChange({ subCategory: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            placeholder="e.g., Amrutam"
            value={data.brand}
            onChange={(e) => onChange({ brand: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
