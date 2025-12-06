import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { Link } from '@inertiajs/react';

const OrderConfirmation = ({ orderData }) => {
    const orderNumber = 'ORD-2025-001234';
    const estimatedDelivery = 'December 5-9, 2025';
    const trackingNumber = '1Z999AA1234567890';

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Success Header */}
                <div className="mb-8 text-center">
                    <div className="bg-success mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                        <Icon name="Check" size={32} className="text-white" />
                    </div>

                    <h1 className="text-text-primary mb-2 text-3xl font-bold">Order Confirmed!</h1>

                    <p className="text-text-secondary text-lg">Thank you for your purchase. Your order has been successfully placed.</p>
                </div>

                {/* Order Details Card */}
                <div className="mb-6 rounded-lg border border-border bg-card p-6">
                    <h2 className="text-text-primary mb-4 text-xl font-semibold">Order Details</h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <p className="text-text-secondary text-sm">Order Number</p>
                            <p className="text-text-primary font-semibold">{orderNumber}</p>
                        </div>

                        <div>
                            <p className="text-text-secondary text-sm">Order Date</p>
                            <p className="text-text-primary font-semibold">
                                {new Date()?.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>

                        <div>
                            <p className="text-text-secondary text-sm">Estimated Delivery</p>
                            <p className="text-text-primary font-semibold">{estimatedDelivery}</p>
                        </div>

                        <div>
                            <p className="text-text-secondary text-sm">Tracking Number</p>
                            <p className="text-text-primary font-semibold">{trackingNumber}</p>
                        </div>
                    </div>
                </div>

                {/* What's Next */}
                <div className="mb-6 rounded-lg border border-border bg-card p-6">
                    <h3 className="text-text-primary mb-4 text-lg font-semibold">What happens next?</h3>

                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                                <Icon name="Mail" size={14} className="text-white" />
                            </div>
                            <div>
                                <p className="text-text-primary font-medium">Order Confirmation Email</p>
                                <p className="text-text-secondary text-sm">
                                    You'll receive a confirmation email with your order details within the next few minutes.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                                <Icon name="Package" size={14} className="text-white" />
                            </div>
                            <div>
                                <p className="text-text-primary font-medium">Order Processing</p>
                                <p className="text-text-secondary text-sm">
                                    We'll prepare your items for shipment. This usually takes 1-2 business days.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                                <Icon name="Truck" size={14} className="text-white" />
                            </div>
                            <div>
                                <p className="text-text-primary font-medium">Shipping Updates</p>
                                <p className="text-text-secondary text-sm">You'll receive tracking information once your order ships.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Button variant="default" size="lg" iconName="Package" iconPosition="left" fullWidth>
                            Track Your Order
                        </Button>

                        <Button variant="outline" size="lg" iconName="Download" iconPosition="left" fullWidth>
                            Download Receipt
                        </Button>
                    </div>

                    <div className="text-center">
                        <Link href={route('homepage')}>
                            <Button variant="ghost" iconName="ArrowLeft" iconPosition="left">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Support Information */}
                <div className="mt-8 rounded-lg bg-muted p-4 text-center">
                    <p className="text-text-secondary mb-2 text-sm">Need help with your order?</p>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                            <Icon name="Phone" size={14} className="text-accent" />
                            <span className="text-accent">1-800-123-4567</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Icon name="Mail" size={14} className="text-accent" />
                            <span className="text-accent">support@ecommercehub.com</span>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="mt-6 rounded-lg border border-border bg-card p-6">
                    <h3 className="text-text-primary mb-4 text-lg font-semibold">Order Summary</h3>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-text-secondary">Subtotal</span>
                            <span className="text-text-primary">$1,737.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-text-secondary">Shipping</span>
                            <span className="text-text-primary">$5.99</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-text-secondary">Tax</span>
                            <span className="text-text-primary">$138.96</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-success">Discount</span>
                            <span className="text-success">-$10.00</span>
                        </div>
                        <div className="mt-2 border-t border-border pt-2">
                            <div className="flex justify-between font-semibold">
                                <span className="text-text-primary">Total</span>
                                <span className="text-text-primary">$1,871.95</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
