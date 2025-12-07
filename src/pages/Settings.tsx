import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Store, Bell, Shield, Truck, CreditCard, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [storeSettings, setStoreSettings] = useState({
    storeName: "Amrutam Ayurveda",
    storeEmail: "contact@amrutam.co",
    storePhone: "+91 98765 43210",
    storeAddress: "123 Wellness Street, Ayurveda Nagar, Mumbai 400001",
    currency: "INR",
    timezone: "Asia/Kolkata",
  });

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailLowStock: true,
    emailCustomers: false,
    pushOrders: true,
    pushReviews: true,
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <DashboardLayout title="Settings" subtitle="Manage your store configuration">
      <Tabs defaultValue="store" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            <span className="hidden sm:inline">Store</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span className="hidden sm:inline">Shipping</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payments</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Store Settings */}
        <TabsContent value="store">
          <div className="rounded-xl border border-border bg-card p-6 shadow-elegant animate-fade-in">
            <h3 className="font-display text-lg font-semibold mb-6">Store Information</h3>
            <div className="space-y-6 max-w-2xl">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={storeSettings.storeName}
                    onChange={(e) =>
                      setStoreSettings({ ...storeSettings, storeName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={storeSettings.storeEmail}
                    onChange={(e) =>
                      setStoreSettings({ ...storeSettings, storeEmail: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Phone Number</Label>
                  <Input
                    id="storePhone"
                    value={storeSettings.storePhone}
                    onChange={(e) =>
                      setStoreSettings({ ...storeSettings, storePhone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={storeSettings.currency}
                    onValueChange={(value) =>
                      setStoreSettings({ ...storeSettings, currency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeAddress">Store Address</Label>
                <Textarea
                  id="storeAddress"
                  value={storeSettings.storeAddress}
                  onChange={(e) =>
                    setStoreSettings({ ...storeSettings, storeAddress: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <div className="rounded-xl border border-border bg-card p-6 shadow-elegant animate-fade-in">
            <h3 className="font-display text-lg font-semibold mb-6">Notification Preferences</h3>
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground">Email Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <Label className="text-sm font-medium">New Orders</Label>
                      <p className="text-xs text-muted-foreground">
                        Receive email when a new order is placed
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailOrders}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailOrders: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <Label className="text-sm font-medium">Low Stock Alerts</Label>
                      <p className="text-xs text-muted-foreground">
                        Get notified when products are running low
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailLowStock}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailLowStock: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <Label className="text-sm font-medium">Customer Sign-ups</Label>
                      <p className="text-xs text-muted-foreground">
                        Email when new customers register
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailCustomers}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailCustomers: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Shipping */}
        <TabsContent value="shipping">
          <div className="rounded-xl border border-border bg-card p-6 shadow-elegant animate-fade-in">
            <h3 className="font-display text-lg font-semibold mb-6">Shipping Configuration</h3>
            <div className="space-y-6 max-w-2xl">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Default Shipping Rate</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input placeholder="0" className="pl-7" defaultValue="99" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Free Shipping Threshold</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input placeholder="0" className="pl-7" defaultValue="999" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <Label className="text-sm font-medium">Enable Cash on Delivery</Label>
                  <p className="text-xs text-muted-foreground">
                    Allow customers to pay upon delivery
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Payments */}
        <TabsContent value="payments">
          <div className="rounded-xl border border-border bg-card p-6 shadow-elegant animate-fade-in">
            <h3 className="font-display text-lg font-semibold mb-6">Payment Methods</h3>
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-info" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Razorpay</Label>
                    <p className="text-xs text-muted-foreground">
                      Accept cards, UPI, and more
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <span className="text-lg">💵</span>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Cash on Delivery</Label>
                    <p className="text-xs text-muted-foreground">
                      Pay when package arrives
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="rounded-xl border border-border bg-card p-6 shadow-elegant animate-fade-in">
            <h3 className="font-display text-lg font-semibold mb-6">Security Settings</h3>
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                  <p className="text-xs text-muted-foreground">
                    Add an extra layer of security
                  </p>
                </div>
                <Switch />
              </div>

              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Update Security
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
