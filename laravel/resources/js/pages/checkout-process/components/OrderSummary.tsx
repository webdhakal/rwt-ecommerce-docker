import Icon from '@/components/AppIcon';

const OrderSummary = ({ shippingData, paymentData }) => {
    const cartItems = [
        {
            id: 1,
            name: 'iPhone 15 Pro Max',
            variant: '256GB, Natural Titanium',
            price: 1199.0,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
        },
        {
            id: 2,
            name: 'AirPods Pro (2nd Gen)',
            variant: 'USB-C',
            price: 249.0,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop',
        },
        {
            id: 3,
            name: 'MagSafe Charger',
            variant: 'White',
            price: 39.0,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
        },
    ];

    const subtotal = cartItems?.reduce((sum, item) => sum + item?.price * item?.quantity, 0);
    const shippingCost =
        shippingData?.shippingMethod === 'standard'
            ? 5.99
            : shippingData?.shippingMethod === 'express'
              ? 12.99
              : shippingData?.shippingMethod === 'overnight'
                ? 24.99
                : 0;
    const tax = subtotal * 0.08; // 8% tax
    const discount = paymentData?.discount || 0;
    const total = subtotal + shippingCost + tax - discount;

    return (
        <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
            <h3 className="text-text-primary mb-4 flex items-center text-lg font-semibold">
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Order Summary
            </h3>
            {/* Cart Items */}
            <div className="mb-6 space-y-3">
                {cartItems?.map((item) => (
                    <div key={item?.id} className="flex items-center space-x-3">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                            <img src={item?.image} alt={item?.name} className="h-full w-full object-cover" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <h4 className="text-text-primary truncate text-sm font-medium">{item?.name}</h4>
                            <p className="text-text-secondary text-xs">{item?.variant}</p>
                            <p className="text-text-secondary text-xs">Qty: {item?.quantity}</p>
                        </div>

                        <div className="text-text-primary text-sm font-semibold">${(item?.price * item?.quantity)?.toFixed(2)}</div>
                    </div>
                ))}
            </div>
            {/* Pricing Breakdown */}
            <div className="space-y-2 border-t border-border pt-4">
                <div className="text-text-secondary flex justify-between text-sm">
                    <span>Subtotal ({cartItems?.length} items)</span>
                    <span>${subtotal?.toFixed(2)}</span>
                </div>

                {shippingCost > 0 && (
                    <div className="text-text-secondary flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>${shippingCost?.toFixed(2)}</span>
                    </div>
                )}

                <div className="text-text-secondary flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax?.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                    <div className="text-success flex justify-between text-sm">
                        <span>Discount</span>
                        <span>-${discount?.toFixed(2)}</span>
                    </div>
                )}

                <div className="mt-3 border-t border-border pt-2">
                    <div className="text-text-primary flex justify-between text-base font-semibold">
                        <span>Total</span>
                        <span>${total?.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            {/* Security Badge */}
            <div className="mt-6 rounded-lg bg-muted p-3">
                <div className="text-text-secondary flex items-center justify-center space-x-2 text-sm">
                    <Icon name="Shield" size={16} className="text-success" />
                    <span>Secure SSL Encrypted Checkout</span>
                </div>
            </div>
            {/* Trust Badges */}
            <div className="mt-4 flex items-center justify-center space-x-4">
                <div className="text-text-secondary flex items-center space-x-1 text-xs">
                    <Icon name="Truck" size={14} />
                    <span>Free Returns</span>
                </div>
                <div className="text-text-secondary flex items-center space-x-1 text-xs">
                    <Icon name="Award" size={14} />
                    <span>Warranty</span>
                </div>
                <div className="text-text-secondary flex items-center space-x-1 text-xs">
                    <Icon name="Headphones" size={14} />
                    <span>24/7 Support</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
