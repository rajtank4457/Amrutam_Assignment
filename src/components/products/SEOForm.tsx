import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { X } from "lucide-react";

interface SEOFormProps {
  data: {
    metaTitle: string;
    metaDescription: string;
    urlHandle: string;
    tags: string[];
  };
  onChange: (data: Partial<SEOFormProps["data"]>) => void;
}

export function SEOForm({ data, onChange }: SEOFormProps) {
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    const tag = newTag.trim().toLowerCase();
    if (tag && !data.tags.includes(tag)) {
      onChange({ tags: [...data.tags, tag] });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange({ tags: data.tags.filter((tag) => tag !== tagToRemove) });
  };

  return (
    <div className="space-y-6">
      {/* SEO Preview */}
      <div className="rounded-lg border border-border p-4 bg-muted/30">
        <Label className="text-xs text-muted-foreground mb-3 block">
          Search Engine Preview
        </Label>
        <div className="space-y-1">
          <p className="text-primary text-lg font-medium truncate">
            {data.metaTitle || "Product Title - Amrutam Ayurveda"}
          </p>
          <p className="text-success text-sm">
            amrutam.co/products/{data.urlHandle || "product-name"}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {data.metaDescription ||
              "Add a meta description to improve search engine visibility..."}
          </p>
        </div>
      </div>

      {/* Meta Title */}
      <div className="space-y-2">
        <Label htmlFor="metaTitle">Meta Title</Label>
        <Input
          id="metaTitle"
          placeholder="SEO optimized title (50-60 characters recommended)"
          value={data.metaTitle}
          onChange={(e) => onChange({ metaTitle: e.target.value })}
          maxLength={70}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Appears in search engine results</span>
          <span
            className={
              data.metaTitle.length > 60 ? "text-warning" : ""
            }
          >
            {data.metaTitle.length}/70
          </span>
        </div>
      </div>

      {/* Meta Description */}
      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea
          id="metaDescription"
          placeholder="Brief description for search engines (150-160 characters recommended)"
          value={data.metaDescription}
          onChange={(e) => onChange({ metaDescription: e.target.value })}
          maxLength={170}
          rows={3}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Summarize your product for search results</span>
          <span
            className={
              data.metaDescription.length > 160 ? "text-warning" : ""
            }
          >
            {data.metaDescription.length}/170
          </span>
        </div>
      </div>

      {/* URL Handle */}
      <div className="space-y-2">
        <Label htmlFor="urlHandle">URL Handle</Label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            amrutam.co/products/
          </span>
          <Input
            id="urlHandle"
            placeholder="product-url-handle"
            value={data.urlHandle}
            onChange={(e) =>
              onChange({
                urlHandle: e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, ""),
              })
            }
            className="flex-1"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="border-t border-border pt-6">
        <div className="space-y-2">
          <Label htmlFor="tags">Product Tags</Label>
          <p className="text-xs text-muted-foreground">
            Tags help customers find your product
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-3 mb-3">
          {data.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1 pr-1">
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-1 hover:bg-muted rounded p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            id="tags"
            placeholder="Add a tag (e.g., immunity, stress-relief)"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            className="flex-1"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 text-sm font-medium text-primary hover:underline"
          >
            Add
          </button>
        </div>

        {/* Suggested Tags */}
        <div className="mt-4">
          <p className="text-xs text-muted-foreground mb-2">Suggested tags:</p>
          <div className="flex flex-wrap gap-2">
            {["ayurveda", "immunity", "stress-relief", "digestion", "energy", "wellness"]
              .filter((tag) => !data.tags.includes(tag))
              .map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary"
                  onClick={() => onChange({ tags: [...data.tags, tag] })}
                >
                  + {tag}
                </Badge>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
