import React from 'react';

interface ImageDisplayProps {
  imageUrl: string | null;
  title: string;
  placeholder: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, title, placeholder }) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      {imageUrl ? (
        <div className="aspect-square relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <div className="aspect-square flex items-center justify-center bg-secondary/10 rounded-lg">
          <p className="text-secondary-foreground/60">
            {placeholder}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;