import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { ExternalBlob } from "../backend";

interface ImageUploadProps {
  value?: ExternalBlob | null;
  onChange: (blob: ExternalBlob | null, file: File | null) => void;
  className?: string;
}

export default function ImageUpload({
  value,
  onChange,
  className,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(
    value ? value.getDirectURL() : null,
  );
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    const bytes = new Uint8Array(
      (await file.arrayBuffer()) ?? new ArrayBuffer(0),
    );
    const blob = ExternalBlob.fromBytes(bytes);
    onChange(blob, file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      handleFile(file);
    }
  };

  const handleClear = () => {
    setPreview(null);
    onChange(null, null);
    if (inputRef.current != null) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("relative", className)}>
      {preview ? (
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-border">
          <img
            src={preview}
            alt="Product preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 bg-card rounded-full p-1 shadow-md hover:bg-muted transition-colors"
            data-ocid="image_upload.clear_button"
            aria-label="Remove image"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "w-full aspect-[3/4] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all duration-200 cursor-pointer",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/60 hover:bg-muted/50",
          )}
          data-ocid="image_upload.dropzone"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="text-center px-4">
            <p className="text-sm font-medium text-foreground">
              Drop image here
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              or click to browse
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            data-ocid="image_upload.upload_button"
          >
            <Upload className="w-3 h-3 mr-1.5" /> Upload Photo
          </Button>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
