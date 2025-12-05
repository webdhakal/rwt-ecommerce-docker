import React, { useEffect, useState } from 'react';
import Icon from '@/components/AppIcon';
import { Input } from '@/shadcn/ui/input';
import Select from '@/components/Select';
import Button from '@/components/Button';
import { useGetLocation } from '@/api/hooks/useCountry';
const ShippingForm = ({ onNext, shippingData, setShippingData }) => {
  const [errors, setErrors] = useState({});
  const [stateid, setStateid] = useState();
  const { data, isLoading, error, refetch } = useGetLocation({state:stateid});
  

const countryOptions = data?.payload?.country 
  ? [{
      value: data.payload.country.id,
      label: data.payload.country.name,
    }]
  : [];


const stateOptions = data?.payload?.states?.map((item) => ({
  value: item?.id,
  label: item?.name,
})) || []; 


useEffect(() => {
  if (shippingData?.state) {
    setStateid(shippingData?.state);
    refetch();
  }
}, [shippingData?.state]);

const cityOptions=data?.payload?.cities?.map((item)=>({
  value: item?.id,
  label: item?.name
})) || [];
  
  const shippingMethods = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: '5-7 business days',
      price: 5.99,
      estimatedDelivery: 'Dec 5 - Dec 9'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: '2-3 business days',
      price: 12.99,
      estimatedDelivery: 'Dec 2 - Dec 4'
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Next business day',
      price: 24.99,
      estimatedDelivery: 'Dec 1'
    }
  ];

  const handleInputChange = (field, value) => {
    setShippingData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!shippingData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!shippingData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingData?.email?.trim()) newErrors.email = 'Email is required';
    if (!shippingData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!shippingData?.address?.trim()) newErrors.address = 'Address is required';
    if (!shippingData?.city?.trim()) newErrors.city = 'City is required';
    if (!shippingData?.state) newErrors.state = 'State is required';
    if (!shippingData?.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!shippingData?.country) newErrors.country = 'Country is required';
    if (!shippingData?.shippingMethod) newErrors.shippingMethod = 'Please select a shipping method';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    // if (validateForm()) {
    //   onNext();
    // }
    onNext();
  };

  return (
    <div className="bg-background">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="User" size={20} className="mr-2" />
            Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              placeholder="Enter first name"
              value={shippingData?.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e?.target?.value)}
              error={errors?.firstName}
              required
            />

            <Input
              label="Last Name"
              type="text"
              placeholder="Enter last name"
              value={shippingData?.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e?.target?.value)}
              error={errors?.lastName}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter email address"
              value={shippingData?.email || ''}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required
              className="md:col-span-1"
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter phone number"
              value={shippingData?.phone || ''}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              error={errors?.phone}
              required
            />
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="MapPin" size={20} className="mr-2" />
            Shipping Address
          </h3>

          <div className="space-y-4">
            <Input
              label="Street Address"
              type="text"
              placeholder="Enter street address"
              value={shippingData?.address || ''}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              error={errors?.address}
              required
            />
                          <Select
                label="Country"
                placeholder="Select country"
                options={countryOptions}
                value={shippingData?.country || ''}
                onChange={(value) => handleInputChange('country', value)}
                error={errors?.country}
                required
              />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                placeholder="Select state"
                options={stateOptions}
                value={shippingData?.state || ''}
                onChange={(value) => handleInputChange('state', value)}
                error={errors?.state}
                required
              />
              <Select
                placeholder="Select city"
                options={cityOptions}
                value={shippingData?.city || ''}
                onChange={(value) => handleInputChange('city', value)}
                error={errors?.city}
                required
              />


              <Input

                type="text"
                placeholder="Enter ZIP code"
                value={shippingData?.zipCode || ''}
                onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
                error={errors?.zipCode}
                required
              />
            </div>


          </div>
        </div>

        {/* Shipping Methods */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="Truck" size={20} className="mr-2" />
            Shipping Method
          </h3>

          <div className="space-y-3">
            {shippingMethods?.map((method) => (
              <label
                key={method?.id}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-200 ${shippingData?.shippingMethod === method?.id
                  ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
                  }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value={method?.id}
                    checked={shippingData?.shippingMethod === method?.id}
                    onChange={(e) => handleInputChange('shippingMethod', e?.target?.value)}
                    className="w-4 h-4 text-accent border-border focus:ring-accent"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-text-primary">{method?.name}</div>
                    <div className="text-sm text-text-secondary">{method?.description}</div>
                    <div className="text-sm text-success">Estimated delivery: {method?.estimatedDelivery}</div>
                  </div>
                </div>
                <div className="text-lg font-semibold text-text-primary">
                  ${method?.price?.toFixed(2)}
                </div>
              </label>
            ))}
          </div>

          {errors?.shippingMethod && (
            <p className="mt-2 text-sm text-error">{errors?.shippingMethod}</p>
          )}
        </div>

        {/* Continue Button */}
        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            variant="default"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            className="min-w-[200px]"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;