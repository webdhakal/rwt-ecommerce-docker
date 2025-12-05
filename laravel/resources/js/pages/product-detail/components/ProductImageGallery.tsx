import React, { useState } from 'react';

import Icon from '@/components/AppIcon';

const ProductImageGallery = ({ images, productName }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setIsZoomed(false);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(prev => prev > 0 ? prev - 1 : images?.length - 1);
    setIsZoomed(false);
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prev => prev < images?.length - 1 ? prev + 1 : 0);
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-surface rounded-lg overflow-hidden aspect-square">
        <div className="relative w-full h-full">
          <img
            src={images?.[selectedImageIndex]}
            alt={`${productName} - Image ${selectedImageIndex + 1}`}
            className={`w-full h-full object-cover cursor-zoom-in transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'
              }`}
            onClick={toggleZoom}
          />

          {/* Navigation Arrows */}
          {images?.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background/80 hover:bg-background rounded-full flex items-center justify-center shadow-md transition-all duration-200"
              >
                <Icon name="ChevronLeft" size={20} className="text-text-primary" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background/80 hover:bg-background rounded-full flex items-center justify-center shadow-md transition-all duration-200"
              >
                <Icon name="ChevronRight" size={20} className="text-text-primary" />
              </button>
            </>
          )}

          {/* Zoom Indicator */}
          <div className="absolute top-2 right-2 bg-background/80 rounded-full p-2">
            <Icon
              name={isZoomed ? "ZoomOut" : "ZoomIn"}
              size={16}
              className="text-text-secondary"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-2 right-2 bg-background/80 rounded-full px-3 py-1">
            <span className="text-xs font-medium text-text-primary">
              {selectedImageIndex + 1} / {images?.length}
            </span>
          </div>
        </div>
      </div>
      {/* Thumbnail Gallery */}
      {images?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${index === selectedImageIndex
                ? 'border-accent shadow-md'
                : 'border-border hover:border-accent/50'
                }`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;