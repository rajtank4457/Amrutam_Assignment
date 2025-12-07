import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PricingInventoryFormProps {
  data: {
    price: string;
    compareAtPrice: string;
    costPerItem: string;
    stock: string;
    lowStockThreshold: string;
    trackInventory: boolean;
    allowBackorders: boolean;
  };
  onChange: (data: Partial<PricingInventoryFormProps["data"]>) => void;
}

export function PricingInventoryForm({ data, onChange }: PricingInventoryFormProps) {
  return (
    <div className="space-y-6">
      {/* Pricing Section */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-4">Pricing</h4>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="price">Selling Price (₹) *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={data.price}
                onChange={(e) => onChange({ price: e.target.value })}
                className="pl-7"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="compareAtPrice">Compare at Price (₹)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                id="compareAtPrice"
                type="number"
                placeholder="0.00"
                value={data.compareAtPrice}
                onChange={(e) => onChange({ compareAtPrice: e.target.value })}
                className="pl-7"
              />
            </div>
            <p className="text-xs text-muted-foreground">Original price for showing discount</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="costPerItem">Cost per Item (₹)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                id="costPerItem"
                type="number"
                placeholder="0.00"
                value={data.costPerItem}
                onChange={(e) => onChange({ costPerItem: e.target.value })}
                className="pl-7"
              />
            </div>
            <p className="text-xs text-muted-foreground">For profit calculation</p>
          </div>
        </div>
      </div>

      {/* Inventory Section */}
      <div className="border-t border-border pt-6">
        <h4 className="text-sm font-semibold text-foreground mb-4">Inventory</h4>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <Label htmlFor="trackInventory" className="text-sm font-medium">
                Track Inventory
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Enable stock tracking for this product
              </p>
            </div>
            <Switch
              id="trackInventory"
              checked={data.trackInventory}
              onCheckedChange={(checked) => onChange({ trackInventory: checked })}
            />
          </div>

          {data.trackInventory && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="stock">Current Stock *</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  value={data.stock}
                  onChange={(e) => onChange({ stock: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lowStockThreshold">Low Stock Alert Threshold</Label>
                <Input
                  id="lowStockThreshold"
                  type="number"
                  placeholder="10"
                  value={data.lowStockThreshold}
                  onChange={(e) => onChange({ lowStockThreshold: e.target.value })}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <Label htmlFor="allowBackorders" className="text-sm font-medium">
                Allow Backorders
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Allow customers to order when out of stock
              </p>
            </div>
            <Switch
              id="allowBackorders"
              checked={data.allowBackorders}
              onCheckedChange={(checked) => onChange({ allowBackorders: checked })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
