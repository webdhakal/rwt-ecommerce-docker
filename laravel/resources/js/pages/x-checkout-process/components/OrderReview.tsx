import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { Checkbox } from '@/shadcn/ui/checkbox';
import { useState } from 'react';

const OrderReview = ({ onBack, onPlaceOrder, shippingData, paymentData, orderData }) => {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

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
    const shippingCost = shippingData?.shippingMethod === 'standard' ? 5.99 : shippingData?.shippingMethod === 'express' ? 12.99 : 24.99;
    const tax = subtotal * 0.08; // 8% tax
    const discount = paymentData?.discount || 0;
    const total = subtotal + shippingCost + tax - discount;

    const handlePlaceOrder = async () => {
        if (!agreedToTerms) {
            alert('Please agree to the terms and conditions');
            return;
        }

        setIsProcessing(true);

        // Simulate order processing
        setTimeout(() => {
            onPlaceOrder();
        }, 2000);
    };

    const getShippingMethodName = (method) => {
        const methods = {
            standard: 'Standard Shipping (5-7 days)',
            express: 'Express Shipping (2-3 days)',
            overnight: 'Overnight Shipping (Next day)',
        };
        return methods?.[method] || method;
    };

    const getPaymentMethodName = (method) => {
        const methods = {
            card: 'Credit/Debit Card',
            paypal: 'PayPal',
            'apple-pay': 'Apple Pay',
            'google-pay': 'Google Pay',
        };
        return methods?.[method] || method;
    };

    return (
        <div className="space-y-6 bg-background">
            {/* Order Items */}
            <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-text-primary mb-4 flex items-center text-lg font-semibold">
                    <Icon name="Package" size={20} className="mr-2" />
                    Order Items
                </h3>

                <div className="space-y-4">
                    {cartItems?.map((item) => (
                        <div key={item?.id} className="bg-surface flex items-center space-x-4 rounded-lg p-4">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                                <img src={item?.image} alt={item?.name} className="h-full w-full object-cover" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h4 className="text-text-primary truncate font-medium">{item?.name}</h4>
                                <p className="text-text-secondary text-sm">{item?.variant}</p>
                                <p className="text-text-secondary text-sm">Qty: {item?.quantity}</p>
                            </div>

                            <div className="text-right">
                                <p className="text-text-primary font-semibold">${(item?.price * item?.quantity)?.toFixed(2)}</p>
                                {item?.quantity > 1 && <p className="text-text-secondary text-sm">${item?.price?.toFixed(2)} each</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Shipping Information */}
            <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-text-primary flex items-center text-lg font-semibold">
                        <Icon name="MapPin" size={20} className="mr-2" />
                        Shipping Information
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => onBack(0)}>
                        Edit
                    </Button>
                </div>

                <div className="space-y-2">
                    <p className="text-text-primary font-medium">
                        {shippingData?.firstName} {shippingData?.lastName}
                    </p>
                    <p className="text-text-secondary">{shippingData?.address}</p>
                    <p className="text-text-secondary">
                        {shippingData?.city}, {shippingData?.state} {shippingData?.zipCode}
                    </p>
                    <p className="text-text-secondary">{shippingData?.email}</p>
                    <p className="text-text-secondary">{shippingData?.phone}</p>

                    <div className="border-t border-border pt-2">
                        <p className="text-text-primary font-medium">{getShippingMethodName(shippingData?.shippingMethod)}</p>
                        <p className="text-success text-sm">Estimated delivery: Dec 5 - Dec 9</p>
                    </div>
                </div>
            </div>
            {/* Payment Information */}
            <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-text-primary flex items-center text-lg font-semibold">
                        <Icon name="CreditCard" size={20} className="mr-2" />
                        Payment Information
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => onBack(1)}>
                        Edit
                    </Button>
                </div>

                <div className="space-y-2">
                    <p className="text-text-primary font-medium">{getPaymentMethodName(paymentData?.paymentMethod)}</p>

                    {paymentData?.paymentMethod === 'card' && (
                        <>
                            <p className="text-text-secondary">**** **** **** {paymentData?.cardNumber?.slice(-4) || '****'}</p>
                            <p className="text-text-secondary">{paymentData?.cardholderName}</p>
                        </>
                    )}

                    {paymentData?.promoCodeApplied && (
                        <div className="text-success flex items-center">
                            <Icon name="Tag" size={16} className="mr-1" />
                            <span className="text-sm">Promo code applied: SAVE10</span>
                        </div>
                    )}
                </div>
            </div>
            {/* Order Summary */}
            <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-text-primary mb-4 flex items-center text-lg font-semibold">
                    <Icon name="Receipt" size={20} className="mr-2" />
                    Order Summary
                </h3>

                <div className="space-y-3">
                    <div className="text-text-secondary flex justify-between">
                        <span>Subtotal ({cartItems?.length} items)</span>
                        <span>${subtotal?.toFixed(2)}</span>
                    </div>

                    <div className="text-text-secondary flex justify-between">
                        <span>Shipping</span>
                        <span>${shippingCost?.toFixed(2)}</span>
                    </div>

                    <div className="text-text-secondary flex justify-between">
                        <span>Tax</span>
                        <span>${tax?.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                        <div className="text-success flex justify-between">
                            <span>Discount</span>
                            <span>-${discount?.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="border-t border-border pt-3">
                        <div className="text-text-primary flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>${total?.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Terms and Conditions */}
            <div className="rounded-lg border border-border bg-card p-6">
                <Checkbox
                    label="I agree to the Terms of Service and Privacy Policy"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e?.target?.checked)}
                    required
                />

                <div className="mt-4 rounded-lg bg-muted p-4">
                    <div className="flex items-start space-x-2">
                        <Icon name="Info" size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                        <div className="text-text-secondary text-sm">
                            <p className="mb-2">
                                By placing this order, you agree to our terms and conditions. Your payment will be processed securely.
                            </p>
                            <p>You will receive an order confirmation email shortly after placing your order.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
                <Button type="button" variant="outline" onClick={() => onBack(1)} iconName="ArrowLeft" iconPosition="left" disabled={isProcessing}>
                    Back to Payment
                </Button>

                <Button
                    type="button"
                    variant="default"
                    size="lg"
                    onClick={handlePlaceOrder}
                    loading={isProcessing}
                    disabled={!agreedToTerms}
                    iconName="Check"
                    iconPosition="right"
                    className="min-w-[200px]"
                >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>
            </div>
        </div>
    );
};

export default OrderReview;
