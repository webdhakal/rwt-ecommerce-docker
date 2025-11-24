import React from 'react';
import Icon from '@/components/AppIcon';

const OrderSummary = ({ shippingData, paymentData }) => {
  const cartItems = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      variant: "256GB, Natural Titanium",
      price: 1199.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "AirPods Pro (2nd Gen)",
      variant: "USB-C",
      price: 249.00,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "MagSafe Charger",
      variant: "White",
      price: 39.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop"
    }
  ];

  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const shippingCost = shippingData?.shippingMethod === 'standard' ? 5.99 :
    shippingData?.shippingMethod === 'express' ? 12.99 :
      shippingData?.shippingMethod === 'overnight' ? 24.99 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const discount = paymentData?.discount || 0;
  const total = subtotal + shippingCost + tax - discount;

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
        <Icon name="ShoppingBag" size={20} className="mr-2" />
        Order Summary
      </h3>
      {/* Cart Items */}
      <div className="space-y-3 mb-6">
        {cartItems?.map((item) => (
          <div key={item?.id} className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={item?.image}
                alt={item?.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-text-primary truncate">
                {item?.name}
              </h4>
              <p className="text-xs text-text-secondary">{item?.variant}</p>
              <p className="text-xs text-text-secondary">Qty: {item?.quantity}</p>
            </div>

            <div className="text-sm font-semibold text-text-primary">
              ${(item?.price * item?.quantity)?.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      {/* Pricing Breakdown */}
      <div className="space-y-2 border-t border-border pt-4">
        <div className="flex justify-between text-sm text-text-secondary">
          <span>Subtotal ({cartItems?.length} items)</span>
          <span>${subtotal?.toFixed(2)}</span>
        </div>

        {shippingCost > 0 && (
          <div className="flex justify-between text-sm text-text-secondary">
            <span>Shipping</span>
            <span>${shippingCost?.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm text-text-secondary">
          <span>Tax</span>
          <span>${tax?.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-success">
            <span>Discount</span>
            <span>-${discount?.toFixed(2)}</span>
          </div>
        )}

        <div className="border-t border-border pt-2 mt-3">
          <div className="flex justify-between text-base font-semibold text-text-primary">
            <span>Total</span>
            <span>${total?.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Security Badge */}
      <div className="mt-6 p-3 bg-muted rounded-lg">
        <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Secure SSL Encrypted Checkout</span>
        </div>
      </div>
      {/* Trust Badges */}
      <div className="mt-4 flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-1 text-xs text-text-secondary">
          <Icon name="Truck" size={14} />
          <span>Free Returns</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-text-secondary">
          <Icon name="Award" size={14} />
          <span>Warranty</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-text-secondary">
          <Icon name="Headphones" size={14} />
          <span>24/7 Support</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;