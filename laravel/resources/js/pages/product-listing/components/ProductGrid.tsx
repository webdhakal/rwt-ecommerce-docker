import Icon from '@/components/AppIcon';
import Button from '@/components/Button';
import { Product } from '@/types/Product';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

type ProductGridProps = {
    products: Product[];
    loading: boolean;
    onLoadMore: () => void;
    hasMore: boolean;
    mode?: 'grid' | 'list'; // NEW PROP
};

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading, onLoadMore, hasMore, mode = 'grid' }) => {
    const [cartItems, setCartItems] = useState<Record<string, number>>({});

    // --- Handlers ---
    const handleProductClick = (slug: string) => {
        console.log(slug);
    };

    const handleVendorClick = (e: React.MouseEvent, vendorId: string) => {
        e.stopPropagation();
        // navigate('/vendor-store-profile', { state: { vendorId } });
    };

    const handleAddToCart = (e: React.MouseEvent, productId: string) => {
        e.stopPropagation();
        setCartItems((prev) => ({
            ...prev,
            [productId]: (prev?.[productId] || 0) + 1,
        }));
    };

    const handleQuickView = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        console.log('Quick view:', product);
    };

    // --- Card Variants ---
    const ProductCard = ({ product }: { product: Product }) => {
        const isInCart = (cartItems?.[product?.id] || 0) > 0;
        const cartQuantity = cartItems?.[product?.id] || 0;

        return (
            <Link
                href={route('product-detail', product.slug)}
                className={`group animate-scale-hover cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-card ${
                    mode === 'list' ? 'flex' : ''
                }`}
            >
                {/* Product Image */}
                <div className={`bg-surface relative ${mode === 'grid' ? 'aspect-square' : 'h-48 w-48 flex-shrink-0'} overflow-hidden`}>
                    <img
                        src={product?.image}
                        alt={product?.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col space-y-1">
                        {product?.isNew && <span className="rounded bg-accent px-2 py-1 text-xs font-medium text-white">New</span>}
                        {product?.discount && (
                            <span className="bg-error rounded px-2 py-1 text-xs font-medium text-white">-{product?.discount}%</span>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <button
                            onClick={(e) => handleQuickView(e, product)}
                            className="rounded-full bg-white/90 p-2 shadow-sm transition-colors duration-200 hover:bg-white"
                            title="Quick View"
                        >
                            <Icon name="Eye" size={16} className="text-text-primary" />
                        </button>
                        <button
                            className="rounded-full bg-white/90 p-2 shadow-sm transition-colors duration-200 hover:bg-white"
                            title="Add to Wishlist"
                        >
                            <Icon name="Heart" size={16} className="text-text-primary" />
                        </button>
                    </div>

                    {/* Quick Add Button (only in grid mode) */}
                    {mode === 'grid' && (
                        <div className="absolute right-2 bottom-2 left-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            <Button
                                variant="default"
                                size="sm"
                                fullWidth
                                onClick={(e) => handleAddToCart(e, product?.id)}
                                iconName="ShoppingCart"
                                iconPosition="left"
                            >
                                Quick Add
                            </Button>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className={`p-4 ${mode === 'list' ? 'flex-1' : ''}`}>
                    {/* Vendor */}
                    <button
                        onClick={(e) => handleVendorClick(e, product?.vendorId)}
                        className="mb-1 text-xs font-medium text-accent transition-colors duration-200 hover:text-accent/80"
                    >
                        {product?.vendor}
                    </button>

                    {/* Name */}
                    <h3 className="text-text-primary mb-2 line-clamp-2 font-medium transition-colors duration-200 group-hover:text-accent">
                        {product?.name}
                    </h3>

                    {/* Rating */}
                    <div className="mb-2 flex items-center space-x-1">
                        <div className="flex items-center">
                            {[...Array(5)]?.map((_, i) => (
                                <Icon
                                    key={i}
                                    name="Star"
                                    size={12}
                                    className={i < Math.floor(product?.rating) ? 'text-warning fill-current' : 'text-border'}
                                />
                            ))}
                        </div>
                        <span className="text-text-secondary text-xs">({product?.reviewCount})</span>
                    </div>

                    {/* Price */}
                    <div className="mb-3 flex items-center space-x-2">
                        <span className="text-text-primary text-lg font-bold">${product?.price}</span>
                        {product?.originalPrice && <span className="text-text-secondary text-sm line-through">${product?.originalPrice}</span>}
                    </div>

                    {/* Cart Status */}
                    {isInCart && (
                        <div className="bg-success/10 border-success/20 flex items-center justify-between rounded border p-2 text-sm">
                            <span className="text-success font-medium">In Cart ({cartQuantity})</span>
                            <Icon name="Check" size={16} className="text-success" />
                        </div>
                    )}

                    {/* Quick Add Button (only in list mode) */}
                    {mode === 'list' && (
                        <div className="mt-3">
                            <Button
                                variant="default"
                                size="sm"
                                onClick={(e) => handleAddToCart(e, product?.id)}
                                iconName="ShoppingCart"
                                iconPosition="left"
                            >
                                Add to Cart
                            </Button>
                        </div>
                    )}
                </div>
            </Link>
        );
    };

    // --- Skeleton ---
    const SkeletonCard = () => (
        <div className={`overflow-hidden rounded-lg border border-border bg-card ${mode === 'list' ? 'flex' : ''}`}>
            <div className={`bg-surface animate-pulse ${mode === 'grid' ? 'aspect-square' : 'h-48 w-48 flex-shrink-0'}`}></div>
            <div className="flex-1 space-y-3 p-4">
                <div className="bg-surface h-3 animate-pulse rounded"></div>
                <div className="bg-surface h-4 animate-pulse rounded"></div>
                <div className="bg-surface h-3 w-2/3 animate-pulse rounded"></div>
                <div className="bg-surface h-5 w-1/2 animate-pulse rounded"></div>
            </div>
        </div>
    );

    // --- Render ---
    return (
        <div className="flex-1">
            {/* Product Grid / List */}
            <div
                className={
                    mode === 'grid' ? 'grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6' : 'flex flex-col space-y-4'
                }
            >
                {products?.map((product) => (
                    <ProductCard key={product?.id} product={product} />
                ))}

                {/* Skeletons */}
                {loading && [...Array(8)].map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)}
            </div>

            {/* Load More */}
            {hasMore && !loading && (
                <div className="mt-8 flex justify-center">
                    <Button variant="outline" onClick={onLoadMore} iconName="ChevronDown" iconPosition="right">
                        Load More Products
                    </Button>
                </div>
            )}

            {/* Empty State */}
            {!loading && products?.length === 0 && (
                <div className="py-12 text-center">
                    <Icon name="Package" size={48} className="text-text-secondary mx-auto mb-4" />
                    <h3 className="text-text-primary mb-2 text-lg font-medium">No products found</h3>
                    <p className="text-text-secondary">Try adjusting your filters or search terms</p>
                </div>
            )}
        </div>
    );
};

export default ProductGrid;
