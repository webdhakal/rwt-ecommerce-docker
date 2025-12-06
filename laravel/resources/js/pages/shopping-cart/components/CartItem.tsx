import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

const CartItem = ({ item, onQuantityChange, onRemove, onSaveForLater }) => {
    const [isRemoving, setIsRemoving] = useState(false);
    const [quantity, setQuantity] = useState(item?.quantity);
    let stock = item?.product?.variant?.stock;

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1 || newQuantity > stock) return;
        setQuantity(newQuantity);
        onQuantityChange(item?.id, newQuantity, item?.product?.variant?.id);
    };

    const handleRemove = async () => {
        setIsRemoving(true);
        await onRemove(item?.id);
    };

    const handleSaveForLater = () => {
        onSaveForLater(item?.id);
    };

    const totalPrice = item?.price * quantity;
    const originalTotal = item?.originalPrice ? item?.originalPrice * quantity : totalPrice;
    const savings = originalTotal - totalPrice;

    return (
        <div
            className={`rounded-lg border border-border bg-card p-4 transition-all duration-300 sm:p-6 ${
                isRemoving ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
            }`}
        >
            <div className="flex flex-col gap-4 sm:flex-row">
                {/* Product Image */}
                <div className="flex-shrink-0">
                    <Link href={route('product-detail', item?.id)} className="block">
                        <div className="bg-surface h-48 w-full overflow-hidden rounded-lg sm:h-24 sm:w-24">
                            <img
                                src={item?.product?.files?.[0]?.url || ''}
                                alt={item?.product?.name}
                                className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                            />
                        </div>
                    </Link>
                </div>

                {/* Product Details */}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                        <div className="min-w-0 flex-1">
                            {/* Product Name & Vendor */}
                            <Link
                                href={route('product-detail', item?.id)}
                                className="text-text-primary line-clamp-2 text-lg font-semibold transition-colors duration-200 hover:text-accent"
                            >
                                {item?.product?.name}
                            </Link>

                            <Link
                                href="/vendor-store-profile"
                                className="text-text-secondary mt-1 inline-block text-sm transition-colors duration-200 hover:text-accent"
                            >
                                by {item?.vendor || 'Default Vendor'}
                            </Link>

                            {/* Variants */}
                            {item?.product?.variant && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <span className="text-text-secondary rounded-md bg-muted px-2 py-1 text-xs">
                                        {item?.product?.variant?.size_name}: {item?.product?.variant?.color_name}
                                    </span>
                                </div>
                            )}

                            {/* Stock Status */}
                            <div className="mt-2 flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${stock > 10 ? 'bg-success' : stock > 0 ? 'bg-warning' : 'bg-error'}`}></div>
                                <span className={`text-sm ${stock > 10 ? 'text-success' : stock > 0 ? 'text-warning' : 'text-error'}`}>
                                    {stock > 10 ? 'In Stock' : stock > 0 ? `Only ${stock} left` : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Delivery Info */}
                            {item?.deliveryInfo && (
                                <div className="mt-1 flex items-center gap-2">
                                    <Icon name="Truck" size={14} className="text-text-secondary" />
                                    <span className="text-text-secondary text-sm">{item?.deliveryInfo}</span>
                                </div>
                            )}
                        </div>

                        {/* Price & Controls */}
                        <div className="flex flex-col items-end gap-3">
                            {/* Price */}
                            <div className="text-right">
                                <div className="text-text-primary text-lg font-bold">${totalPrice?.toFixed(2)}</div>
                                {savings > 0 && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-text-secondary text-sm line-through">${originalTotal?.toFixed(2)}</span>
                                        <span className="text-success text-sm font-medium">Save ${savings?.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="text-text-secondary mt-1 text-xs">${item?.price?.toFixed(2)} each</div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={quantity <= 1 || stock === 0}
                                    className="h-8 w-8"
                                >
                                    <Icon name="Minus" size={14} />
                                </Button>

                                <div className="w-12 text-center">
                                    <span className="text-sm font-medium">{quantity}</span>
                                </div>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    disabled={quantity >= stock}
                                    className="h-8 w-8"
                                >
                                    <Icon name="Plus" size={14} />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleSaveForLater}
                            iconName="Heart"
                            iconPosition="left"
                            iconSize={14}
                            className="text-text-secondary hover:text-accent"
                        >
                            Save for Later
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRemove}
                            iconName="Trash2"
                            iconPosition="left"
                            iconSize={14}
                            className="text-text-secondary hover:text-error"
                            loading={isRemoving}
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
