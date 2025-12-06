import Icon from '@/components/Common/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { Link } from '@inertiajs/react';
import React, { MouseEvent, useState } from 'react';

export interface Product {
    id: string | number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating?: number;
    reviewCount?: number;
    isWishlisted?: boolean;
    isNew?: boolean;
    isOnSale?: boolean;
    discountPercentage?: number;
}

interface ProductCardProps {
    product: Product;
    showQuickAdd?: boolean;
    className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showQuickAdd = true, className = '' }) => {
    const [isWishlisted, setIsWishlisted] = useState<boolean>(product?.isWishlisted || false);
    const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

    const handleWishlistToggle = (e?: MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        e?.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    const handleQuickAdd = async (e: MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        e?.stopPropagation();
        setIsAddingToCart(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsAddingToCart(false);
    };

    const renderStars = (rating: number = 0) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars?.push(<Icon key={i} name="Star" size={12} className="fill-current text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars?.push(<Icon key="half" name="Star" size={12} className="fill-current text-yellow-400 opacity-50" />);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars?.push(<Icon key={`empty-${i}`} name="Star" size={12} className="text-gray-300" />);
        }

        return stars;
    };

    return (
        <div className="group relative overflow-hidden rounded-lg border border-border bg-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <Link href={route('product-detail', product?.id)} className="block">
                {/* Product Image */}
                <div className="bg-surface relative aspect-square overflow-hidden">
                    {/* <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          /> */}

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col space-y-1">
                        {product?.isNew && <span className="bg-success rounded px-2 py-1 text-xs font-medium text-white">New</span>}
                        {product?.discount && (
                            <span className="bg-error rounded px-2 py-1 text-xs font-medium text-white">-{product?.discount}%</span>
                        )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                        onClick={handleWishlistToggle}
                        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:bg-white"
                        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <Icon
                            name="Heart"
                            size={16}
                            className={`transition-colors duration-200 ${isWishlisted ? 'fill-current text-red-500' : 'text-text-secondary'}`}
                        />
                    </button>

                    {/* Quick View Button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Button variant="outline" size="sm" className="border-white/20 bg-white/90 backdrop-blur-sm hover:bg-white">
                            Quick View
                        </Button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                    {/* Vendor */}
                    <div className="mb-2 flex items-center space-x-1">
                        <Icon name="Store" size={12} className="text-text-secondary" />
                        <span className="text-text-secondary text-xs transition-colors duration-200 hover:text-accent">{product?.vendor}</span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-text-primary mb-2 line-clamp-2 text-sm font-medium transition-colors duration-200 group-hover:text-accent">
                        {product?.name}
                    </h3>

                    {/* Rating */}
                    <div className="mb-2 flex items-center space-x-2">
                        <div className="flex items-center space-x-1">{renderStars(product?.rating)}</div>
                        <span className="text-text-secondary text-xs">({product?.reviewCount})</span>
                    </div>

                    {/* Price */}
                    <div className="mb-3 flex items-center space-x-2">
                        <span className="text-text-primary text-lg font-bold">${product?.price?.toFixed(2)}</span>
                        {product?.originalPrice && product?.originalPrice > product?.price && (
                            <span className="text-text-secondary text-sm line-through">${product?.originalPrice?.toFixed(2)}</span>
                        )}
                    </div>

                    {/* Quick Add Button */}
                    {showQuickAdd && (
                        <Button
                            onClick={handleQuickAdd}
                            loading={isAddingToCart}
                            variant="outline"
                            size="sm"
                            fullWidth
                            iconName="Plus"
                            iconPosition="left"
                            className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        >
                            {isAddingToCart ? 'Adding...' : 'Quick Add'}
                        </Button>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
