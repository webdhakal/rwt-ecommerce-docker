import React, { useState } from 'react';
import { Button } from '@/shadcn/ui/button';
import { Checkbox } from '@/shadcn/ui/checkbox';
import Icon from '@/components/AppIcon';
import { OrderSend } from '@/types/Order';
import { useOrder } from '@/api/hooks/userOrders';

const OrderReview = ({ onBack, onPlaceOrder, shippingData, paymentData,cartItems }: { onBack: () => void; onPlaceOrder: () => void; shippingData: any; paymentData: any; cartItems: any }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState<OrderSend | null>(null);

  const { createOrder, isCreating, isSuccess, error } = useOrder();
console.log("cartitems", cartItems)

  const subtotal = cartItems?.reduce((sum: number, item: any) => sum + (item?.price * item?.quantity), 0);
  const shippingCost = shippingData?.shippingMethod === 'standard' ? 5.99 :
    shippingData?.shippingMethod === 'express' ? 12.99 : 24.99;
  const tax = subtotal * 0.08; // 8% tax
  const discount = paymentData?.discount || 0;
  const total = subtotal + shippingCost + tax - discount;

  const handlePlaceOrder = async () => {
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    const datatosend: OrderSend = {
      grand_total: total,
      payment_method: paymentData?.paymentMethod || '',
      discount_amount: discount,
      payment_status: "pending",
      notes: paymentData?.notes || 'nothing',
      user:{
        first_name: shippingData?.firstName || '',
        last_name: shippingData?.lastName || '',
        email: shippingData?.email || '',
        phone: shippingData?.phone || ''
      },
      relation:{
        orderItems: cartItems?.map((item: any) => ({
          variant: item?.product?.variant?.id,
          total_amount: total,
          unit_amount: item?.price,
          quantity: item?.quantity,
        })),
        fromAddress:[],
        addresses: [{
          phone: shippingData?.phone || '',
          email: shippingData?.email || '',
          custom_fields: {
            is_shipping: true,
            default: true
          },
          country: shippingData?.country || '',
          state: shippingData?.state || '',
          city: shippingData?.city || '',
        }]
      }
      
    };


    setOrderData(datatosend); 
    console.log("Data to send:", datatosend);

    setIsProcessing(true);

    // Call the API to create the order
    createOrder(datatosend);

    
    // Simulate order processing
    setTimeout(() => {
      onPlaceOrder();
    }, 2000);
  };

  const getShippingMethodName = (method) => {
    const methods = {
      'standard': 'Standard Shipping (5-7 days)',
      'express': 'Express Shipping (2-3 days)',
      'overnight': 'Overnight Shipping (Next day)'
    };
    return methods?.[method] || method;
  };

  const getPaymentMethodName = (method) => {
    const methods = {
      'card': 'Credit/Debit Card',
      'paypal': 'PayPal',
      'apple-pay': 'Apple Pay',
      'google-pay': 'Google Pay'
    };
    return methods?.[method] || method;
  };

  return (
    <div className="bg-background space-y-6">
      {/* Order Items */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Package" size={20} className="mr-2" />
          Order Items
        </h3>

        <div className="space-y-4">
          {cartItems?.map((item) => (
            <div key={item?.id} className="flex items-center space-x-4 p-4 bg-surface rounded-lg">
              <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item?.product?.files?.[0]?.url}
                  alt={item?.product?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary truncate">{item?.product?.name}</h4>
                <p className="text-sm text-text-secondary">{item?.product?.variant?.size_name}:{item?.product?.variant?.color_name}</p>
                <p className="text-sm text-text-secondary">Qty: {item?.quantity}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-text-primary">
                  ${(item?.price * item?.quantity)?.toFixed(2)}
                </p>
                {item?.quantity > 1 && (
                  <p className="text-sm text-text-secondary">
                    ${item?.price?.toFixed(2)} each
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Shipping Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="MapPin" size={20} className="mr-2" />
            Shipping Information
          </h3>
          <Button variant="ghost" size="sm" onClick={() => onBack(0)}>
            Edit
          </Button>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-text-primary">
            {shippingData?.firstName} {shippingData?.lastName}
          </p>
          <p className="text-text-secondary">{shippingData?.address}</p>
          <p className="text-text-secondary">
            {shippingData?.city}, {shippingData?.state} {shippingData?.zipCode}
          </p>
          <p className="text-text-secondary">{shippingData?.email}</p>
          <p className="text-text-secondary">{shippingData?.phone}</p>

          <div className="pt-2 border-t border-border">
            <p className="font-medium text-text-primary">
              {getShippingMethodName(shippingData?.shippingMethod)}
            </p>
            <p className="text-sm text-success">
              Estimated delivery: Dec 5 - Dec 9
            </p>
          </div>
        </div>
      </div>
      {/* Payment Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="CreditCard" size={20} className="mr-2" />
            Payment Information
          </h3>
          <Button variant="ghost" size="sm" onClick={() => onBack(1)}>
            Edit
          </Button>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-text-primary">
            {getPaymentMethodName(paymentData?.paymentMethod)}
          </p>

          {paymentData?.paymentMethod === 'card' && (
            <>
              <p className="text-text-secondary">
                **** **** **** {paymentData?.cardNumber?.slice(-4) || '****'}
              </p>
              <p className="text-text-secondary">
                {paymentData?.cardholderName}
              </p>
            </>
          )}

          {paymentData?.promoCodeApplied && (
            <div className="flex items-center text-success">
              <Icon name="Tag" size={16} className="mr-1" />
              <span className="text-sm">Promo code applied: SAVE10</span>
            </div>
          )}
        </div>
      </div>
      {/* Order Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Receipt" size={20} className="mr-2" />
          Order Summary
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between text-text-secondary">
            <span>Subtotal ({cartItems?.length} items)</span>
            <span>${subtotal?.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-text-secondary">
            <span>Shipping</span>
            <span>${shippingCost?.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-text-secondary">
            <span>Tax</span>
            <span>${tax?.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-success">
              <span>Discount</span>
              <span>-${discount?.toFixed(2)}</span>
            </div>
          )}

          <div className="border-t border-border pt-3">
            <div className="flex justify-between text-lg font-semibold text-text-primary">
              <span>Total</span>
              <span>${total?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e?.target?.checked)}
          required
        />

        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <div className="text-sm text-text-secondary">
              <p className="mb-2">
                By placing this order, you agree to our terms and conditions.
                Your payment will be processed securely.
              </p>
              <p>
                You will receive an order confirmation email shortly after placing your order.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => onBack(1)}
          iconName="ArrowLeft"
          iconPosition="left"
          disabled={isProcessing}
        >
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