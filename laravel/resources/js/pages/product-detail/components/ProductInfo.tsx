import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { ProductDetail } from '@/types/Product';
import { useState } from 'react';

const ProductInfo = ({ product, onAddToCart }: { product: ProductDetail; onAddToCart: any }) => {
    const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
    const [quantity, setQuantity] = useState(1);
    console.log(product)
    const hasvariant = product?.has_variant;

    const handleVariantChange = (variant) => {
        setSelectedVariant(variant);
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= selectedVariant?.stock) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        onAddToCart({
            product,
            variant: selectedVariant,
            quantity,
        });
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Icon key={index} name="Star" size={16} className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-border'} />
        ));
    };

    return (
        <div className="space-y-6">
            {/* Product Title and Rating */}
            <div>
                <h1 className="text-text-primary mb-2 text-2xl font-bold lg:text-3xl">{product?.name}</h1>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                        {renderStars(product?.rating)}
                        <span className="text-text-primary ml-1 text-sm font-medium">{product?.rating}</span>
                    </div>
                    <span className="text-text-secondary text-sm">({product?.reviewCount} reviews)</span>
                </div>
            </div>
            {/* Price */}
            <div className="flex items-center space-x-3">
                <span className="text-text-primary text-3xl font-bold">${hasvariant ? selectedVariant?.price : product?.price}</span>
                {selectedVariant?.originalPrice && (
                    <span className="text-text-secondary text-xl line-through">${hasvariant ? selectedVariant?.originalPrice : product?.original_price}</span>
                )}
                {selectedVariant?.originalPrice && (
                    <span className="bg-success text-success-foreground rounded-md px-2 py-1 text-sm font-medium">
                        {Math.round(((hasvariant ? selectedVariant?.originalPrice : product?.originalPrice) - (hasvariant ? selectedVariant?.price : product?.price)) / (hasvariant ? selectedVariant?.originalPrice : product?.originalPrice) * 100)}% OFF
                    </span>
                )}
            </div>
            {/* Vendor Info */}
            <div className="bg-surface flex items-center space-x-3 rounded-lg p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <Icon name="Store" size={20} className="text-white" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <span className="text-text-primary font-medium">{product?.vendor?.name}</span>
                        <Icon name="BadgeCheck" size={16} className="text-accent" />
                    </div>
                    <div className="flex items-center space-x-1">
                        {renderStars(product?.vendor?.rating)}
                        <span className="text-text-secondary ml-1 text-sm">({product?.vendor?.reviewCount} reviews)</span>
                    </div>
                </div>
            </div>
            {/* Variant Selection */}
            {product?.variants?.length > 1 && (
                <div>
                    <h3 className="text-text-primary mb-3 text-sm font-medium">
                        {product?.variantType}: {selectedVariant?.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {product?.variants?.map((variant) => (
                            <button
                                key={variant?.id}
                                onClick={() => handleVariantChange(variant)}
                                disabled={variant?.stock === 0}
                                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                    selectedVariant?.id === variant?.id
                                        ? 'border-accent bg-accent text-accent-foreground'
                                        : variant?.stock === 0
                                          ? 'text-text-secondary cursor-not-allowed border-border bg-muted'
                                          : 'text-text-primary border-border bg-background hover:border-accent'
                                }`}
                            >
                                {variant?.name}
                                {variant?.stock === 0 && <span className="ml-1 text-xs">(Out of Stock)</span>}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {/* Quantity Selector */}
            <div>
                <h3 className="text-text-primary mb-3 text-sm font-medium">Quantity</h3>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center rounded-lg border border-border">
                        <button
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}
                            className="text-text-secondary hover:text-text-primary flex h-10 w-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Icon name="Minus" size={16} />
                        </button>
                        <span className="text-text-primary w-12 text-center font-medium">{quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(quantity + 1)}
                            disabled={quantity >= selectedVariant?.stock}
                            className="text-text-secondary hover:text-text-primary flex h-10 w-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Icon name="Plus" size={16} />
                        </button>
                    </div>
                    <span className="text-text-secondary text-sm">{selectedVariant?.stock} available</span>
                </div>
            </div>
            {/* Add to Cart Section */}
            <div className="space-y-3">
                <Button
                    variant="default"
                    size="lg"
                    fullWidth
                    onClick={handleAddToCart}
                    disabled={selectedVariant?.stock === 0}
                    iconName="ShoppingCart"
                    iconPosition="left"
                >
                    {selectedVariant?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>

                <div className="flex space-x-3">
                    <Button variant="outline" size="lg" fullWidth iconName="Heart" iconPosition="left">
                        Add to Wishlist
                    </Button>
                    <Button variant="outline" size="lg" fullWidth iconName="Share2" iconPosition="left">
                        Share
                    </Button>
                </div>
            </div>
            {/* Key Features */}
            <div className="space-y-3">
                <h3 className="text-text-primary text-sm font-medium">Key Features</h3>
                <ul className="space-y-2">
                    {product?.keyFeatures?.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                            <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                            <span className="text-text-secondary text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Shipping Info */}
            <div className="relative mt-8 border-t border-border pt-6">
                <h3 className="text-text-primary mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Icon name="Truck" size={18} className="animate-pulse text-primary" />
                    Shipping Options
                </h3>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {product.shippingOptions.map((item, index) => (
                        <div
                            key={item.name + index}
                            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-muted/60 via-background/80 to-muted/40 p-4 shadow-[0_0_12px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]"
                        >
                            {/* Glow border on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="relative z-10 flex flex-col space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
                                        <Icon name="Truck" size={18} className="text-primary" />
                                    </div>
                                    <span className="text-text-primary text-sm font-semibold tracking-wide">{item.name}</span>
                                </div>

                                <div className="text-text-secondary flex flex-col gap-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Icon name="Coins" size={14} className="text-accent" />
                                        <span>
                                            Fee: <span className="text-text-primary font-medium">Rs. {item.price}</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Icon name="Clock" size={14} className="text-accent" />
                                        <span>
                                            Duration: <span className="text-text-primary font-medium">{item.duration}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
