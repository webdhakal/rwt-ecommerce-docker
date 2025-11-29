import Icon from '@/components/AppIcon';
import { Badge } from '@/shadcn/ui/badge';
import { Button } from '@/shadcn/ui/button';
import { Product } from '@/types/Product';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

const ProductCard = ({ product, showQuickAdd = true }: { product: Product; showQuickAdd: boolean }) => {
    const [isWishlisted, setIsWishlisted] = useState(product?.isWishlisted || false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const handleWishlistToggle = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    const handleQuickAdd = async (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        setIsAddingToCart(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsAddingToCart(false);
    };

    const renderStars = (rating) => {
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
            <Link href={route('product-detail', product?.slug)} className="block">
                {/* Product Image */}
                <div className="bg-surface relative aspect-square overflow-hidden">
                    <img
                        src={product?.image}
                        alt={product?.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col space-y-1">
                        {product?.isNew && <Badge className="rounded px-2 py-1 text-xs font-medium">New</Badge>}
                        {product?.discount && <Badge className="rounded px-2 py-1 text-xs font-medium">-{product?.discount}%</Badge>}
                    </div>

                    {/* Wishlist Button */}
                    <button
                        onClick={handleWishlistToggle}
                        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-background opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:bg-white"
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
                        <Button variant="outline" size="sm" className="border-white/20 backdrop-blur-sm hover:bg-secondary/90">
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
