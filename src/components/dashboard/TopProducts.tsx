import { Progress } from "@/components/ui/progress";

const products = [
  { name: "Ashwagandha Capsules", sales: 1234, percentage: 85 },
  { name: "Triphala Churna", sales: 987, percentage: 72 },
  { name: "Brahmi Syrup", sales: 856, percentage: 65 },
  { name: "Chyawanprash", sales: 654, percentage: 50 },
  { name: "Neem Tablets", sales: 432, percentage: 35 },
];

export function TopProducts() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-elegant animate-slide-up" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="font-display text-lg font-semibold">Top Products</h3>
        <a href="/products" className="text-sm font-medium text-primary hover:underline">
          View all
        </a>
      </div>
      <div className="p-6 space-y-5">
        {products.map((product, index) => (
          <div key={product.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{product.name}</span>
              <span className="text-muted-foreground">{product.sales} sold</span>
            </div>
            <Progress 
              value={product.percentage} 
              className="h-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
