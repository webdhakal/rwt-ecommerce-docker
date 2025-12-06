import Button from '@/components/Button';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import Icon from '../../../components/AppIcon';

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
            currency: 'USD',
        })?.format(price);
    };

    const getDiscountPercentage = () => {
        if (product?.originalPrice && product?.salePrice) {
            return Math.round(((product?.originalPrice - product?.salePrice) / product?.originalPrice) * 100);
        }
        return 0;
    };

    return (
        <div className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col gap-6 sm:flex-row">
                {/* Product Image */}
                <div className="relative flex-shrink-0">
                    <Link href={`/product/${product?.id}`}>
                        <div className="h-48 w-full overflow-hidden rounded-lg bg-muted transition-shadow duration-300 group-hover:shadow-md sm:h-32 sm:w-32">
                            <img
                                src={product?.image}
                                alt={product?.imageAlt}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>
                    </Link>

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product?.isOnSale && (
                            <span className="bg-error rounded-md px-2 py-1 text-xs font-medium text-white">{getDiscountPercentage()}% OFF</span>
                        )}
                        {product?.isNewArrival && <span className="rounded-md bg-accent px-2 py-1 text-xs font-medium text-white">NEW</span>}
                        {product?.isLimitedStock && <span className="bg-warning rounded-md px-2 py-1 text-xs font-medium text-white">LIMITED</span>}
                    </div>

                    {/* Stock Status */}
                    {!product?.inStock && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                            <span className="bg-error rounded-md px-3 py-1 text-sm font-medium text-white">Out of Stock</span>
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="min-w-0 flex-1">
                    <div className="flex h-full flex-col">
                        {/* Header */}
                        <div className="flex-1">
                            <div className="mb-2 flex items-start justify-between gap-4">
                                <div className="min-w-0 flex-1">
                                    <Link href={`/product/${product?.id}`}>
                                        <h3 className="text-text-primary line-clamp-2 text-lg font-semibold transition-colors duration-200 hover:text-primary">
                                            {product?.name}
                                        </h3>
                                    </Link>
                                    <p className="mb-1 text-sm text-muted-foreground">{product?.brand}</p>
                                </div>

                                <button
                                    onClick={handleRemoveFromWishlist}
                                    className="hover:text-error hover:bg-error/10 flex-shrink-0 rounded-lg p-2 text-muted-foreground transition-all duration-200"
                                    title="Remove from wishlist"
                                >
                                    <Icon name="X" size={18} />
                                </button>
                            </div>

                            <p className="text-text-secondary mb-3 line-clamp-2 text-sm">{product?.description}</p>

                            {/* Product Info */}
                            <div className="mb-3 flex flex-wrap gap-3">
                                {product?.rating && (
                                    <div className="flex items-center space-x-1">
                                        <div className="flex items-center">
                                            {[...Array(5)]?.map((_, i) => (
                                                <Icon
                                                    key={i}
                                                    name="Star"
                                                    size={14}
                                                    className={
                                                        i < Math.floor(product?.rating) ? 'text-warning fill-current' : 'text-muted-foreground'
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {product?.rating} ({product?.reviewCount})
                                        </span>
                                    </div>
                                )}

                                {product?.category && (
                                    <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">{product?.category}</span>
                                )}

                                {product?.freeShipping && (
                                    <span className="rounded-md bg-accent/10 px-2 py-1 text-xs font-medium text-accent">Free Shipping</span>
                                )}
                            </div>

                            {/* Size/Color Options */}
                            {(product?.availableSizes?.length > 0 || product?.availableColors?.length > 0) && (
                                <div className="mb-3 flex flex-wrap gap-3">
                                    {product?.availableSizes?.length > 0 && (
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs text-muted-foreground">Sizes:</span>
                                            <div className="flex gap-1">
                                                {product?.availableSizes?.slice(0, 3)?.map((size, index) => (
                                                    <span key={index} className="rounded bg-muted px-2 py-1 text-xs">
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
                                                        className="h-4 w-4 rounded-full border border-border"
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
                        <div className="flex items-center justify-between border-t border-border pt-4">
                            {/* Price */}
                            <div className="flex flex-col">
                                <div className="flex items-center space-x-2">
                                    <span className="text-text-primary text-xl font-bold">{formatPrice(product?.salePrice || product?.price)}</span>
                                    {product?.originalPrice && product?.salePrice && (
                                        <span className="text-sm text-muted-foreground line-through">{formatPrice(product?.originalPrice)}</span>
                                    )}
                                </div>
                                {product?.installmentPrice && (
                                    <span className="text-xs text-muted-foreground">or {formatPrice(product?.installmentPrice)}/month</span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleShare}
                                    className="rounded-lg p-2 text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary"
                                    title="Share product"
                                >
                                    <Icon name="Share2" size={18} />
                                </button>

                                <Button
                                    variant={product?.inStock ? 'default' : 'secondary'}
                                    size="sm"
                                    onClick={handleAddToCart}
                                    disabled={!product?.inStock || isLoading}
                                    iconName={isLoading ? 'Loader2' : 'ShoppingCart'}
                                    iconPosition="left"
                                    className={isLoading ? 'animate-spin' : ''}
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
