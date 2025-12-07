import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BasicInfoForm } from "@/components/products/BasicInfoForm";
import { PricingInventoryForm } from "@/components/products/PricingInventoryForm";
import { MediaUploadForm } from "@/components/products/MediaUploadForm";
import { VariantsForm } from "@/components/products/VariantsForm";
import { SEOForm } from "@/components/products/SEOForm";
import { ShippingForm } from "@/components/products/ShippingForm";
import {
  ArrowLeft,
  Save,
  Eye,
  FileText,
  DollarSign,
  Image,
  Layers,
  Search,
  Truck,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Variant {
  id: string;
  name: string;
  values: string[];
}

const sections = [
  { id: "basic", label: "Basic Info", icon: FileText },
  { id: "pricing", label: "Pricing & Inventory", icon: DollarSign },
  { id: "media", label: "Media", icon: Image },
  { id: "variants", label: "Variants & Specs", icon: Layers },
  { id: "seo", label: "SEO & Tags", icon: Search },
  { id: "shipping", label: "Shipping", icon: Truck },
];

const AddProduct = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("basic");
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  // Form States
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    description: "",
    shortDescription: "",
    sku: "",
    category: "",
    subCategory: "",
    brand: "Amrutam",
  });

  const [pricingInventory, setPricingInventory] = useState({
    price: "",
    compareAtPrice: "",
    costPerItem: "",
    stock: "",
    lowStockThreshold: "10",
    trackInventory: true,
    allowBackorders: false,
  });

  const [images, setImages] = useState<string[]>([]);

  const [hasVariants, setHasVariants] = useState(false);
  const [variants, setVariants] = useState<Variant[]>([]);

  const [seoData, setSeoData] = useState({
    metaTitle: "",
    metaDescription: "",
    urlHandle: "",
    tags: [] as string[],
  });

  const [shippingData, setShippingData] = useState({
    weight: "",
    weightUnit: "g",
    length: "",
    width: "",
    height: "",
    dimensionUnit: "cm",
    requiresShipping: true,
    freeShipping: false,
    shippingClass: "standard",
  });

  const handleSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  const handleNext = () => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    handleSectionComplete(activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  const handleSave = (status: "draft" | "active") => {
    toast({
      title: status === "draft" ? "Draft Saved" : "Product Published",
      description:
        status === "draft"
          ? "Your product has been saved as a draft."
          : "Your product is now live on the store.",
    });
  };

  const renderSection = () => {
    switch (activeSection) {
      case "basic":
        return (
          <BasicInfoForm
            data={basicInfo}
            onChange={(data) => setBasicInfo({ ...basicInfo, ...data })}
          />
        );
      case "pricing":
        return (
          <PricingInventoryForm
            data={pricingInventory}
            onChange={(data) =>
              setPricingInventory({ ...pricingInventory, ...data })
            }
          />
        );
      case "media":
        return <MediaUploadForm images={images} onChange={setImages} />;
      case "variants":
        return (
          <VariantsForm
            hasVariants={hasVariants}
            variants={variants}
            onChange={(has, vars) => {
              setHasVariants(has);
              setVariants(vars);
            }}
          />
        );
      case "seo":
        return (
          <SEOForm
            data={seoData}
            onChange={(data) => setSeoData({ ...seoData, ...data })}
          />
        );
      case "shipping":
        return (
          <ShippingForm
            data={shippingData}
            onChange={(data) => setShippingData({ ...shippingData, ...data })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout title="Add Product" subtitle="Create a new product listing">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/products">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1" />
        <Button variant="outline" onClick={() => handleSave("draft")}>
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        <Button variant="secondary">
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button onClick={() => handleSave("active")}>Publish Product</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar Navigation */}
        <div className="space-y-2">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            const isCompleted = completedSections.includes(section.id);

            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-elegant"
                    : "hover:bg-muted text-foreground"
                )}
              >
                <div
                  className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center",
                    isActive
                      ? "bg-primary-foreground/20"
                      : isCompleted
                      ? "bg-success/10"
                      : "bg-muted"
                  )}
                >
                  {isCompleted && !isActive ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <section.icon
                      className={cn(
                        "h-4 w-4",
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      )}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isActive ? "text-primary-foreground" : "text-foreground"
                    )}
                  >
                    {section.label}
                  </p>
                </div>
                {isCompleted && !isActive && (
                  <Badge
                    variant="secondary"
                    className="bg-success/10 text-success border-0"
                  >
                    Done
                  </Badge>
                )}
              </button>
            );
          })}
        </div>

        {/* Form Content */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-elegant animate-fade-in">
          <div className="mb-6">
            <h3 className="font-display text-xl font-semibold text-foreground">
              {sections.find((s) => s.id === activeSection)?.label}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {activeSection === "basic" &&
                "Enter the basic information about your product"}
              {activeSection === "pricing" &&
                "Set pricing and manage inventory levels"}
              {activeSection === "media" &&
                "Upload product images and media files"}
              {activeSection === "variants" &&
                "Add product variants and specifications"}
              {activeSection === "seo" &&
                "Optimize for search engines and add tags"}
              {activeSection === "shipping" &&
                "Configure shipping details and dimensions"}
            </p>
          </div>

          {renderSection()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={activeSection === "basic"}
            >
              Previous
            </Button>
            {activeSection === "shipping" ? (
              <Button onClick={() => handleSave("active")}>
                Publish Product
              </Button>
            ) : (
              <Button onClick={handleNext}>Continue</Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
