import { useState } from 'react';

import Icon from '@/components/AppIcon';

const ProductImageGallery = ({ images, productName }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
        setIsZoomed(false);
    };

    const handlePrevImage = () => {
        setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images?.length - 1));
        setIsZoomed(false);
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prev) => (prev < images?.length - 1 ? prev + 1 : 0));
        setIsZoomed(false);
    };

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    return (
        <div className="space-y-4">
            {/* Main Image Display */}
            <div className="bg-surface relative aspect-square overflow-hidden rounded-lg">
                <div className="relative h-full w-full">
                    <img
                        src={images?.[selectedImageIndex]}
                        alt={`${productName} - Image ${selectedImageIndex + 1}`}
                        className={`h-full w-full cursor-zoom-in object-cover transition-transform duration-300 ${
                            isZoomed ? 'scale-150' : 'scale-100'
                        }`}
                        onClick={toggleZoom}
                    />

                    {/* Navigation Arrows */}
                    {images?.length > 1 && (
                        <>
                            <button
                                onClick={handlePrevImage}
                                className="absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-background/80 shadow-md transition-all duration-200 hover:bg-background"
                            >
                                <Icon name="ChevronLeft" size={20} className="text-text-primary" />
                            </button>
                            <button
                                onClick={handleNextImage}
                                className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-background/80 shadow-md transition-all duration-200 hover:bg-background"
                            >
                                <Icon name="ChevronRight" size={20} className="text-text-primary" />
                            </button>
                        </>
                    )}

                    {/* Zoom Indicator */}
                    <div className="absolute top-2 right-2 rounded-full bg-background/80 p-2">
                        <Icon name={isZoomed ? 'ZoomOut' : 'ZoomIn'} size={16} className="text-text-secondary" />
                    </div>

                    {/* Image Counter */}
                    <div className="absolute right-2 bottom-2 rounded-full bg-background/80 px-3 py-1">
                        <span className="text-text-primary text-xs font-medium">
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
                            className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 lg:h-20 lg:w-20 ${
                                index === selectedImageIndex ? 'border-accent shadow-md' : 'border-border hover:border-accent/50'
                            }`}
                        >
                            <img src={image} alt={`${productName} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductImageGallery;
