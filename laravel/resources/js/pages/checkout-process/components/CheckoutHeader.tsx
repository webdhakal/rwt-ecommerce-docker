import React from 'react';
import Icon from '@/components/AppIcon';

const CheckoutHeader = ({ currentStep, steps }) => {
  return (
    <div className="bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-text-primary">Checkout</h1>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Shield" size={16} className="text-success" />
            <span>Secure Checkout</span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => (
            <div key={step?.id} className="flex items-center">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 ${index < currentStep
                    ? 'bg-success border-success text-white'
                    : index === currentStep
                      ? 'bg-accent border-accent text-white' : 'bg-background border-border text-text-secondary'
                  }`}>
                  {index < currentStep ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium hidden sm:inline ${index <= currentStep ? 'text-text-primary' : 'text-text-secondary'
                  }`}>
                  {step?.title}
                </span>
              </div>
              {index < steps?.length - 1 && (
                <div className={`w-12 sm:w-20 h-0.5 mx-4 ${index < currentStep ? 'bg-success' : 'bg-border'
                  }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;