import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon, GripVertical } from "lucide-react";

interface MediaUploadFormProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function MediaUploadForm({ images, onChange }: MediaUploadFormProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // In a real app, handle file upload here
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const addDemoImage = () => {
    const demoImages = [
      "🌿", "🍃", "🧴", "💊", "🍯", "💧", "🌱", "🪴"
    ];
    const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)];
    onChange([...images, randomImage]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-semibold">Product Images</Label>
        <p className="text-xs text-muted-foreground mt-1">
          Upload up to 8 images. First image will be the main product image.
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Drag and drop your images here
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              or click to browse (PNG, JPG, WEBP up to 5MB)
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={addDemoImage}>
            Add Demo Image
          </Button>
        </div>
      </div>

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">Uploaded Images ({images.length}/8)</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group rounded-lg border border-border bg-secondary overflow-hidden aspect-square"
              >
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  {image}
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <GripVertical className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Main Image Badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded">
                    Main
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
