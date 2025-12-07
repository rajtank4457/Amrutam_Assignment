import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShippingFormProps {
  data: {
    weight: string;
    weightUnit: string;
    length: string;
    width: string;
    height: string;
    dimensionUnit: string;
    requiresShipping: boolean;
    freeShipping: boolean;
    shippingClass: string;
  };
  onChange: (data: Partial<ShippingFormProps["data"]>) => void;
}

export function ShippingForm({ data, onChange }: ShippingFormProps) {
  return (
    <div className="space-y-6">
      {/* Physical Product Toggle */}
      <div className="flex items-center justify-between rounded-lg border border-border p-4">
        <div>
          <Label htmlFor="requiresShipping" className="text-sm font-medium">
            This is a physical product
          </Label>
          <p className="text-xs text-muted-foreground mt-1">
            Products that require shipping and handling
          </p>
        </div>
        <Switch
          id="requiresShipping"
          checked={data.requiresShipping}
          onCheckedChange={(checked) => onChange({ requiresShipping: checked })}
        />
      </div>

      {data.requiresShipping && (
        <>
          {/* Weight */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Weight</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="weight">Product Weight</Label>
                <div className="flex gap-2">
                  <Input
                    id="weight"
                    type="number"
                    placeholder="0"
                    value={data.weight}
                    onChange={(e) => onChange({ weight: e.target.value })}
                    className="flex-1"
                  />
                  <Select
                    value={data.weightUnit}
                    onValueChange={(value) => onChange({ weightUnit: value })}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="oz">oz</SelectItem>
                      <SelectItem value="lb">lb</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">
                  Used to calculate shipping rates
                </p>
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground">
                Package Dimensions
              </h4>
              <Select
                value={data.dimensionUnit}
                onValueChange={(value) => onChange({ dimensionUnit: value })}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">cm</SelectItem>
                  <SelectItem value="in">in</SelectItem>
                  <SelectItem value="m">m</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="length">Length</Label>
                <Input
                  id="length"
                  type="number"
                  placeholder="0"
                  value={data.length}
                  onChange={(e) => onChange({ length: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  type="number"
                  placeholder="0"
                  value={data.width}
                  onChange={(e) => onChange({ width: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="0"
                  value={data.height}
                  onChange={(e) => onChange({ height: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Shipping Options */}
          <div className="border-t border-border pt-6 space-y-4">
            <h4 className="text-sm font-semibold text-foreground">
              Shipping Options
            </h4>

            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <Label htmlFor="freeShipping" className="text-sm font-medium">
                  Free Shipping
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Offer free shipping on this product
                </p>
              </div>
              <Switch
                id="freeShipping"
                checked={data.freeShipping}
                onCheckedChange={(checked) => onChange({ freeShipping: checked })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shippingClass">Shipping Class</Label>
              <Select
                value={data.shippingClass}
                onValueChange={(value) => onChange({ shippingClass: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select shipping class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Shipping</SelectItem>
                  <SelectItem value="express">Express Shipping</SelectItem>
                  <SelectItem value="fragile">Fragile Items</SelectItem>
                  <SelectItem value="bulky">Bulky Items</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Assign a shipping class for rate calculations
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
