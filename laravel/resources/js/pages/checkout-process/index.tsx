import React, { useState, useEffect } from 'react';
import CheckoutHeader from './components/CheckoutHeader';
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import OrderReview from './components/OrderReview';
import OrderSummary from './components/OrderSummary';
import OrderConfirmation from './components/OrderConfirmation';
import Icon from '@/components/AppIcon';
import GuestLayout from '@/layouts/guest-layout';

const CheckoutProcess = () => {
  // const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    shippingMethod: ''
  });

  const [paymentData, setPaymentData] = useState({
    paymentMethod: '',
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    sameAsShipping: true,
    promoCode: '',
    discount: 0,
    promoCodeApplied: false
  });

  const [orderData, setOrderData] = useState({
    orderNumber: '',
    orderDate: new Date(),
    total: 0
  });

  const steps = [
    { id: 'shipping', title: 'Shipping', component: ShippingForm },
    { id: 'payment', title: 'Payment', component: PaymentForm },
    { id: 'review', title: 'Review', component: OrderReview }
  ];

  const breadcrumbs = [
    { label: 'Home', path: '/homepage' },
    { label: 'Cart', path: '/shopping-cart' },
    { label: 'Checkout', path: '/checkout-process' }
  ];

  useEffect(() => {
    // Scroll to top when step changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep < steps?.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepNavigation = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handlePlaceOrder = () => {
    // Generate order data
    const orderNumber = `ORD-${new Date()?.getFullYear()}-${Math.random()?.toString()?.substr(2, 6)}`;
    const total = 1871.95; // This would be calculated from cart items

    setOrderData({
      orderNumber,
      orderDate: new Date(),
      total
    });

    setIsOrderComplete(true);
  };

  // const handleBackToShopping = () => {
  //   navigate('/homepage');
  // };

  // If order is complete, show confirmation
  if (isOrderComplete) {
    return <OrderConfirmation orderData={orderData} />;
  }

  const CurrentStepComponent = steps?.[currentStep]?.component;

  return (
    <GuestLayout>
      <div className="min-h-screen bg-surface">
        <main className="pb-16">
          {/* Checkout Header with Steps */}
          <CheckoutHeader currentStep={currentStep} steps={steps} />

          {/* Main Checkout Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form Content */}
              <div className="lg:col-span-2">
                <div className="bg-background">
                  {currentStep === 0 && (
                    <ShippingForm
                      onNext={handleNextStep}
                      shippingData={shippingData}
                      setShippingData={setShippingData}
                    />
                  )}

                  {currentStep === 1 && (
                    <PaymentForm
                      onNext={handleNextStep}
                      onBack={handlePreviousStep}
                      paymentData={paymentData}
                      setPaymentData={setPaymentData}
                    />
                  )}

                  {currentStep === 2 && (
                    <OrderReview
                      onBack={handleStepNavigation}
                      onPlaceOrder={handlePlaceOrder}
                      shippingData={shippingData}
                      paymentData={paymentData}
                      orderData={orderData}
                    />
                  )}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <OrderSummary
                  shippingData={shippingData}
                  paymentData={paymentData}
                />
              </div>
            </div>
          </div>

          {/* Security and Trust Indicators */}
          <div className="bg-background border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-wrap items-center justify-center space-x-8 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={16} className="text-success" />
                  <span>256-bit Encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={16} className="text-success" />
                  <span>PCI Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Headphones" size={16} className="text-accent" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* Mobile Navigation Helper */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-10">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Step {currentStep + 1} of {steps?.length}
            </div>
            <div className="text-lg font-semibold text-text-primary">
              Total: $1,871.95
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default CheckoutProcess;