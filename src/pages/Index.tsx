import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back, Raj">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Products"
          value="248"
          change="+12 this month"
          changeType="positive"
          icon={Package}
          iconColor="bg-primary/10 text-primary"
          delay={0}
        />
        <StatCard
          title="Total Orders"
          value="1,429"
          change="+18.2% from last month"
          changeType="positive"
          icon={ShoppingCart}
          iconColor="bg-accent/10 text-accent"
          delay={100}
        />
        <StatCard
          title="Total Customers"
          value="3,842"
          change="+5.4% from last month"
          changeType="positive"
          icon={Users}
          iconColor="bg-success/10 text-success"
          delay={200}
        />
        <StatCard
          title="Revenue"
          value="₹8,24,500"
          change="+22.4% from last month"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-info/10 text-info"
          delay={300}
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentOrders />
        <TopProducts />
      </div>
    </DashboardLayout>
  );
};

export default Index;
