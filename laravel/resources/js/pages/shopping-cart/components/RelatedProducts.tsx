import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { Link } from '@inertiajs/react';

const RelatedProducts = ({ onAddToCart }) => {
    const relatedProducts = [
        {
            id: 101,
            name: 'Wireless Phone Charger',
            price: 29.99,
            originalPrice: 39.99,
            image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop',
            rating: 4.3,
            vendor: 'TechStore Pro',
            badge: 'Best Seller',
        },
        {
            id: 102,
            name: 'Bluetooth Speaker',
            price: 49.99,
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
            rating: 4.7,
            vendor: 'AudioTech',
            badge: 'New',
        },
        {
            id: 103,
            name: 'USB-C Cable Set',
            price: 19.99,
            originalPrice: 24.99,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
            rating: 4.5,
            vendor: 'Cable Solutions',
        },
        {
            id: 104,
            name: 'Phone Stand Holder',
            price: 15.99,
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop',
            rating: 4.4,
            vendor: 'Desk Accessories',
        },
        {
            id: 105,
            name: 'Portable Power Bank',
            price: 34.99,
            originalPrice: 44.99,
            image: 'https://images.unsplash.com/photo-1609592806596-4d8c4e2b9b9f?w=300&h=300&fit=crop',
            rating: 4.6,
            vendor: 'PowerTech',
            badge: 'Popular',
        },
    ];

    const handleAddToCart = (product) => {
        onAddToCart(product);
    };

    return (
        <div className="mt-12">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-text-primary text-2xl font-semibold">You might also like</h2>
                <Link
                    href="/product-listing-category-browse"
                    className="flex items-center gap-1 text-sm font-medium text-accent transition-colors duration-200 hover:text-accent/80"
                >
                    View all
                    <Icon name="ArrowRight" size={16} />
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {relatedProducts?.map((product) => (
                    <div
                        key={product?.id}
                        className="group overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:border-accent hover:shadow-card"
                    >
                        <div className="relative">
                            <Link href={route('product-detail', product?.id)} className="block">
                                <div className="bg-surface aspect-square overflow-hidden">
                                    <img
                                        src={product?.image}
                                        alt={product?.name}
                                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                    />
                                </div>
                            </Link>

                            {/* Badge */}
                            {product?.badge && (
                                <div
                                    className={`absolute top-2 left-2 rounded-md px-2 py-1 text-xs font-medium ${
                                        product?.badge === 'Best Seller'
                                            ? 'bg-warning text-white'
                                            : product?.badge === 'New'
                                              ? 'bg-success text-white'
                                              : product?.badge === 'Popular'
                                                ? 'bg-accent text-white'
                                                : 'text-text-secondary bg-muted'
                                    }`}
                                >
                                    {product?.badge}
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <Link href={route('product-detail', product?.id)} className="block">
                                <h3 className="text-text-primary mb-2 line-clamp-2 font-semibold transition-colors duration-200 group-hover:text-accent">
                                    {product?.name}
                                </h3>
                            </Link>

                            <Link
                                href="/vendor-store-profile"
                                className="text-text-secondary mb-3 inline-block text-sm transition-colors duration-200 hover:text-accent"
                            >
                                by {product?.vendor}
                            </Link>

                            <div className="mb-3 flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)]?.map((_, i) => (
                                        <Icon
                                            key={i}
                                            name="Star"
                                            size={12}
                                            className={i < Math.floor(product?.rating) ? 'text-warning fill-current' : 'text-border'}
                                        />
                                    ))}
                                </div>
                                <span className="text-text-secondary text-xs">({product?.rating})</span>
                            </div>

                            <div className="mb-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-text-primary text-lg font-bold">${product?.price}</span>
                                    {product?.originalPrice && (
                                        <span className="text-text-secondary text-sm line-through">${product?.originalPrice}</span>
                                    )}
                                </div>

                                {product?.originalPrice && (
                                    <span className="text-success text-xs font-medium">
                                        Save ${(product?.originalPrice - product?.price)?.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                fullWidth
                                onClick={() => handleAddToCart(product)}
                                iconName="Plus"
                                iconPosition="left"
                                iconSize={14}
                                className="transition-all duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
