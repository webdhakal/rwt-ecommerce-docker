import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '@/components/Button';
import { Link } from '@inertiajs/react';

const ProductListItem = ({ product, onRemoveFromWishlist, onAddToCart, onShareProduct }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = async () => {
        setIsLoading(true);
        try {
            await onAddToCart?.(product);
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveFromWishlist = () => {
        onRemoveFromWishlist?.(product?.id);
    };

    const handleShare = () => {
        onShareProduct?.(product);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })?.format(price);
    };

    const getDiscountPercentage = () => {
        if (product?.originalPrice && product?.salePrice) {
            return Math.round(((product?.originalPrice - product?.salePrice) / product?.originalPrice) * 100);
        }
        return 0;
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
            <div className="flex flex-col sm:flex-row gap-6">
                {/* Product Image */}
                <div className="relative flex-shrink-0">
                    <Link href={`/product/${product?.id}`}>
                        <div className="w-full sm:w-32 h-48 sm:h-32 rounded-lg overflow-hidden bg-muted group-hover:shadow-md transition-shadow duration-300">
                            <img
                                src={product?.image}
                                alt={product?.imageAlt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                        </div>
                    </Link>

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product?.isOnSale && (
                            <span className="bg-error text-white text-xs px-2 py-1 rounded-md font-medium">
                                {getDiscountPercentage()}% OFF
                            </span>
                        )}
                        {product?.isNewArrival && (
                            <span className="bg-accent text-white text-xs px-2 py-1 rounded-md font-medium">
                                NEW
                            </span>
                        )}
                        {product?.isLimitedStock && (
                            <span className="bg-warning text-white text-xs px-2 py-1 rounded-md font-medium">
                                LIMITED
                            </span>
                        )}
                    </div>

                    {/* Stock Status */}
                    {!product?.inStock && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                            <span className="bg-error text-white text-sm px-3 py-1 rounded-md font-medium">
                                Out of Stock
                            </span>
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-2">
                                <div className="min-w-0 flex-1">
                                    <Link href={`/product/${product?.id}`}>
                                        <h3 className="text-lg font-semibold text-text-primary hover:text-primary transition-colors duration-200 line-clamp-2">
                                            {product?.name}
                                        </h3>
                                    </Link>
                                    <p className="text-sm text-muted-foreground mb-1">{product?.brand}</p>
                                </div>

                                <button
                                    onClick={handleRemoveFromWishlist}
                                    className="p-2 text-muted-foreground hover:text-error hover:bg-error/10 rounded-lg transition-all duration-200 flex-shrink-0"
                                    title="Remove from wishlist"
                                >
                                    <Icon name="X" size={18} />
                                </button>
                            </div>

                            <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                                {product?.description}
                            </p>

                            {/* Product Info */}
                            <div className="flex flex-wrap gap-3 mb-3">
                                {product?.rating && (
                                    <div className="flex items-center space-x-1">
                                        <div className="flex items-center">
                                            {[...Array(5)]?.map((_, i) => (
                                                <Icon
                                                    key={i}
                                                    name="Star"
                                                    size={14}
                                                    className={i < Math.floor(product?.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {product?.rating} ({product?.reviewCount})
                                        </span>
                                    </div>
                                )}

                                {product?.category && (
                                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
                                        {product?.category}
                                    </span>
                                )}

                                {product?.freeShipping && (
                                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-md font-medium">
                                        Free Shipping
                                    </span>
                                )}
                            </div>

                            {/* Size/Color Options */}
                            {(product?.availableSizes?.length > 0 || product?.availableColors?.length > 0) && (
                                <div className="flex flex-wrap gap-3 mb-3">
                                    {product?.availableSizes?.length > 0 && (
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs text-muted-foreground">Sizes:</span>
                                            <div className="flex gap-1">
                                                {product?.availableSizes?.slice(0, 3)?.map((size, index) => (
                                                    <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                                                        {size}
                                                    </span>
                                                ))}
                                                {product?.availableSizes?.length > 3 && (
                                                    <span className="text-xs text-muted-foreground">+{product?.availableSizes?.length - 3}</span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {product?.availableColors?.length > 0 && (
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs text-muted-foreground">Colors:</span>
                                            <div className="flex gap-1">
                                                {product?.availableColors?.slice(0, 4)?.map((color, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-4 h-4 rounded-full border border-border"
                                                        style={{ backgroundColor: color?.hex }}
                                                        title={color?.name}
                                                    />
                                                ))}
                                                {product?.availableColors?.length > 4 && (
                                                    <span className="text-xs text-muted-foreground">+{product?.availableColors?.length - 4}</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                            {/* Price */}
                            <div className="flex flex-col">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xl font-bold text-text-primary">
                                        {formatPrice(product?.salePrice || product?.price)}
                                    </span>
                                    {product?.originalPrice && product?.salePrice && (
                                        <span className="text-sm text-muted-foreground line-through">
                                            {formatPrice(product?.originalPrice)}
                                        </span>
                                    )}
                                </div>
                                {product?.installmentPrice && (
                                    <span className="text-xs text-muted-foreground">
                                        or {formatPrice(product?.installmentPrice)}/month
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleShare}
                                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                                    title="Share product"
                                >
                                    <Icon name="Share2" size={18} />
                                </button>

                                <Button
                                    variant={product?.inStock ? "default" : "secondary"}
                                    size="sm"
                                    onClick={handleAddToCart}
                                    disabled={!product?.inStock || isLoading}
                                    iconName={isLoading ? "Loader2" : "ShoppingCart"}
                                    iconPosition="left"
                                    className={isLoading ? "animate-spin" : ""}
                                >
                                    {!product?.inStock ? 'Out of Stock' : isLoading ? 'Adding...' : 'Add to Cart'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListItem;