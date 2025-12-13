import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { Link } from '@inertiajs/react';

const EmptyCart = () => {
    const suggestedCategories = [
        { name: 'Electronics', icon: 'Smartphone', path: '/product-listing-category-browse?category=electronics' },
        { name: 'Fashion', icon: 'Shirt', path: '/product-listing-category-browse?category=fashion' },
        { name: 'Home & Garden', icon: 'Home', path: '/product-listing-category-browse?category=home' },
        { name: 'Sports', icon: 'Dumbbell', path: '/product-listing-category-browse?category=sports' },
    ];

    const featuredProducts = [
        {
            id: 1,
            name: 'Wireless Bluetooth Headphones',
            price: 79.99,
            originalPrice: 99.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
            rating: 4.5,
            vendor: 'TechStore Pro',
        },
        {
            id: 2,
            name: 'Smart Fitness Watch',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
            rating: 4.8,
            vendor: 'FitTech Hub',
        },
        {
            id: 3,
            name: 'Premium Coffee Maker',
            price: 149.99,
            originalPrice: 179.99,
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
            rating: 4.6,
            vendor: 'Kitchen Essentials',
        },
    ];

    return (
        <div className="mx-auto mt-36 max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Empty Cart Illustration */}
            <div className="mb-12 text-center">
                <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-muted">
                    <Icon name="ShoppingCart" size={64} className="text-text-secondary" />
                </div>

                <h1 className="text-text-primary mb-4 text-3xl font-bold">Your cart is empty</h1>
                <p className="text-text-secondary mx-auto mb-8 max-w-md text-lg">
                    Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Button variant="default" size="lg" iconName="Search" iconPosition="left" iconSize={18} asChild>
                        <Link href="/product-listing-category-browse">Browse Products</Link>
                    </Button>

                    <Button variant="outline" size="lg" iconName="Home" iconPosition="left" iconSize={18} asChild>
                        <Link href={route('home')}>Back to Home</Link>
                    </Button>
                </div>
            </div>
            {/* Suggested Categories */}
            <div className="mb-12">
                <h2 className="text-text-primary mb-6 text-center text-2xl font-semibold">Shop by Category</h2>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {suggestedCategories?.map((category) => (
                        <Link
                            key={category?.name}
                            to={category?.path}
                            className="group rounded-lg border border-border bg-card p-6 text-center transition-all duration-200 hover:border-accent hover:shadow-card"
                        >
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-colors duration-200 group-hover:bg-accent/20">
                                <Icon name={category?.icon} size={24} className="text-accent" />
                            </div>
                            <h3 className="text-text-primary font-medium transition-colors duration-200 group-hover:text-accent">{category?.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
            {/* Featured Products */}
            <div>
                <h2 className="text-text-primary mb-6 text-center text-2xl font-semibold">You Might Like These</h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {featuredProducts?.map((product) => (
                        <div
                            key={product?.id}
                            className="group overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:border-accent hover:shadow-card"
                        >
                            <Link href={route('product-detail', product?.id)} className="block">
                                <div className="bg-surface aspect-square overflow-hidden">
                                    <img
                                        src={product?.image}
                                        alt={product?.name}
                                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                    />
                                </div>

                                <div className="p-4">
                                    <h3 className="text-text-primary mb-2 line-clamp-2 font-semibold transition-colors duration-200 group-hover:text-accent">
                                        {product?.name}
                                    </h3>

                                    <p className="text-text-secondary mb-3 text-sm">by {product?.vendor}</p>

                                    <div className="mb-3 flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)]?.map((_, i) => (
                                                <Icon
                                                    key={i}
                                                    name="Star"
                                                    size={14}
                                                    className={i < Math.floor(product?.rating) ? 'text-warning fill-current' : 'text-border'}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-text-secondary text-sm">({product?.rating})</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-text-primary text-lg font-bold">${product?.price}</span>
                                            {product?.originalPrice && (
                                                <span className="text-text-secondary text-sm line-through">${product?.originalPrice}</span>
                                            )}
                                        </div>

                                        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left" iconSize={14}>
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmptyCart;
