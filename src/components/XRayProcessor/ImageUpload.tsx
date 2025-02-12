import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  return (
    <div className="flex items-center justify-center">
      <label className="relative cursor-pointer">
        <Button variant="outline" className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          Upload X-Ray Image
        </Button>
        <input
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ImageUpload;