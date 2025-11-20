import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/shadcn/ui/button';
import Icon from '@/components/AppIcon';

const OrderConfirmation = ({ orderData }) => {
  const orderNumber = "ORD-2025-001234";
  const estimatedDelivery = "December 5-9, 2025";
  const trackingNumber = "1Z999AA1234567890";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Check" size={32} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Order Confirmed!
          </h1>

          <p className="text-lg text-text-secondary">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Order Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-text-secondary">Order Number</p>
              <p className="font-semibold text-text-primary">{orderNumber}</p>
            </div>

            <div>
              <p className="text-sm text-text-secondary">Order Date</p>
              <p className="font-semibold text-text-primary">
                {new Date()?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div>
              <p className="text-sm text-text-secondary">Estimated Delivery</p>
              <p className="font-semibold text-text-primary">{estimatedDelivery}</p>
            </div>

            <div>
              <p className="text-sm text-text-secondary">Tracking Number</p>
              <p className="font-semibold text-text-primary">{trackingNumber}</p>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            What happens next?
          </h3>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Mail" size={14} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-text-primary">Order Confirmation Email</p>
                <p className="text-sm text-text-secondary">
                  You'll receive a confirmation email with your order details within the next few minutes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Package" size={14} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-text-primary">Order Processing</p>
                <p className="text-sm text-text-secondary">
                  We'll prepare your items for shipment. This usually takes 1-2 business days.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Truck" size={14} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-text-primary">Shipping Updates</p>
                <p className="text-sm text-text-secondary">
                  You'll receive tracking information once your order ships.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="default"
              size="lg"
              iconName="Package"
              iconPosition="left"
              fullWidth
            >
              Track Your Order
            </Button>

            <Button
              variant="outline"
              size="lg"
              iconName="Download"
              iconPosition="left"
              fullWidth
            >
              Download Receipt
            </Button>
          </div>

          <div className="text-center">
            <Link href={route('home')}>
              <Button
                variant="ghost"
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        {/* Support Information */}
        <div className="mt-8 p-4 bg-muted rounded-lg text-center">
          <p className="text-sm text-text-secondary mb-2">
            Need help with your order?
          </p>
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
        <div className="mt-6 bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Order Summary
          </h3>

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
            <div className="border-t border-border pt-2 mt-2">
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