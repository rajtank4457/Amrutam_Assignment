import { Badge } from "@/components/ui/badge";

const orders = [
  {
    id: "ORD-001",
    customer: "Priya Sharma",
    product: "Ashwagandha Capsules",
    amount: "₹1,299",
    status: "delivered",
  },
  {
    id: "ORD-002",
    customer: "Rahul Verma",
    product: "Triphala Churna",
    amount: "₹499",
    status: "processing",
  },
  {
    id: "ORD-003",
    customer: "Anita Patel",
    product: "Brahmi Syrup",
    amount: "₹799",
    status: "shipped",
  },
  {
    id: "ORD-004",
    customer: "Vikram Singh",
    product: "Chyawanprash",
    amount: "₹649",
    status: "pending",
  },
  {
    id: "ORD-005",
    customer: "Meera Gupta",
    product: "Neem Tablets",
    amount: "₹399",
    status: "delivered",
  },
];

const statusStyles = {
  delivered: "bg-success/10 text-success border-success/20",
  processing: "bg-info/10 text-info border-info/20",
  shipped: "bg-accent/10 text-accent border-accent/20",
  pending: "bg-muted text-muted-foreground border-border",
};

export function RecentOrders() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-elegant animate-slide-up" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="font-display text-lg font-semibold">Recent Orders</h3>
        <a href="/orders" className="text-sm font-medium text-primary hover:underline">
          View all
        </a>
      </div>
      <div className="divide-y divide-border">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-sm font-semibold text-foreground">
                  {order.customer.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {order.customer}
                </p>
                <p className="text-xs text-muted-foreground">{order.product}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-foreground">
                {order.amount}
              </span>
              <Badge
                variant="outline"
                className={statusStyles[order.status as keyof typeof statusStyles]}
              >
                {order.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
