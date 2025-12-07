import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, X, GripVertical } from "lucide-react";

interface Variant {
  id: string;
  name: string;
  values: string[];
}

interface VariantsFormProps {
  hasVariants: boolean;
  variants: Variant[];
  onChange: (hasVariants: boolean, variants: Variant[]) => void;
}

export function VariantsForm({ hasVariants, variants, onChange }: VariantsFormProps) {
  const [newValue, setNewValue] = useState<{ [key: string]: string }>({});

  const addVariant = () => {
    const newVariant: Variant = {
      id: Date.now().toString(),
      name: "",
      values: [],
    };
    onChange(true, [...variants, newVariant]);
  };

  const removeVariant = (id: string) => {
    const newVariants = variants.filter((v) => v.id !== id);
    onChange(newVariants.length > 0, newVariants);
  };

  const updateVariantName = (id: string, name: string) => {
    const newVariants = variants.map((v) =>
      v.id === id ? { ...v, name } : v
    );
    onChange(hasVariants, newVariants);
  };

  const addVariantValue = (id: string) => {
    const value = newValue[id]?.trim();
    if (!value) return;

    const newVariants = variants.map((v) =>
      v.id === id ? { ...v, values: [...v.values, value] } : v
    );
    onChange(hasVariants, newVariants);
    setNewValue({ ...newValue, [id]: "" });
  };

  const removeVariantValue = (variantId: string, valueIndex: number) => {
    const newVariants = variants.map((v) =>
      v.id === variantId
        ? { ...v, values: v.values.filter((_, i) => i !== valueIndex) }
        : v
    );
    onChange(hasVariants, newVariants);
  };

  return (
    <div className="space-y-6">
      {/* Enable Variants Toggle */}
      <div className="flex items-center justify-between rounded-lg border border-border p-4">
        <div>
          <Label htmlFor="hasVariants" className="text-sm font-medium">
            This product has variants
          </Label>
          <p className="text-xs text-muted-foreground mt-1">
            Enable if this product comes in different sizes, quantities, or formulations
          </p>
        </div>
        <Switch
          id="hasVariants"
          checked={hasVariants}
          onCheckedChange={(checked) => {
            if (!checked) {
              onChange(false, []);
            } else {
              addVariant();
            }
          }}
        />
      </div>

      {/* Variants List */}
      {hasVariants && (
        <div className="space-y-4">
          {variants.map((variant, index) => (
            <div
              key={variant.id}
              className="rounded-lg border border-border p-4 space-y-4"
            >
              <div className="flex items-center gap-3">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">
                    Option {index + 1}
                  </Label>
                  <Input
                    placeholder="e.g., Size, Quantity, Pack"
                    value={variant.name}
                    onChange={(e) => updateVariantName(variant.id, e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeVariant(variant.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Values */}
              <div className="pl-8">
                <Label className="text-xs text-muted-foreground mb-2 block">
                  Values
                </Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {variant.values.map((value, valueIndex) => (
                    <Badge
                      key={valueIndex}
                      variant="secondary"
                      className="gap-1 pr-1"
                    >
                      {value}
                      <button
                        onClick={() => removeVariantValue(variant.id, valueIndex)}
                        className="ml-1 hover:bg-muted rounded p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add value (e.g., 60 capsules)"
                    value={newValue[variant.id] || ""}
                    onChange={(e) =>
                      setNewValue({ ...newValue, [variant.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addVariantValue(variant.id);
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => addVariantValue(variant.id)}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {variants.length < 3 && (
            <Button
              variant="outline"
              onClick={addVariant}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Option
            </Button>
          )}
        </div>
      )}

      {/* Specifications */}
      <div className="border-t border-border pt-6">
        <h4 className="text-sm font-semibold text-foreground mb-4">
          Product Specifications
        </h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="ingredients">Key Ingredients</Label>
            <Input
              id="ingredients"
              placeholder="e.g., Ashwagandha, Brahmi, Shankhpushpi"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dosage">Recommended Dosage</Label>
            <Input
              id="dosage"
              placeholder="e.g., 1-2 capsules twice daily"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shelfLife">Shelf Life</Label>
            <Input id="shelfLife" placeholder="e.g., 24 months" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Input id="manufacturer" placeholder="e.g., Amrutam Pharmaceuticals" />
          </div>
        </div>
      </div>
    </div>
  );
}
