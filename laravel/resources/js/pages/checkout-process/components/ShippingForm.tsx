import React, { useEffect, useState } from 'react';
import Icon from '@/components/AppIcon';
import { Input } from '@/shadcn/ui/input';
import Select from '@/components/Select';
import Button from '@/components/Button';
import { useGetLocation } from '@/api/hooks/useCountry';
const ShippingForm = ({ onNext, shippingData, setShippingData }) => {
  const [errors, setErrors] = useState({});
  const [stateid, setStateid] = useState();
  const { data, isLoading, error, refetch } = useGetLocation({ state: stateid });


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
    if (shippingData?.shipping_address?.state) {
      setStateid(shippingData?.shipping_address?.state);
      refetch();
    }
  }, [shippingData?.shipping_address?.state]);

  const cityOptions = data?.payload?.cities?.map((item) => ({
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
    setShippingData(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });

    // Map dotted paths to flat error keys
    const errorKeyMap = {
      'user.first_name': 'firstName',
      'user.last_name': 'lastName',
      'user.email': 'email',
      'user.phone': 'phone',
      'shipping_address.address': 'address',
      'shipping_address.city': 'city',
      'shipping_address.state': 'state',
      'shipping_address.zipCode': 'zipCode',
      'shipping_address.country': 'country',
      'shipping_method': 'shippingMethod'
    };

    const errorKey = errorKeyMap[field];
    if (errorKey && errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // User validation
    if (!shippingData?.user?.first_name?.trim()) newErrors.firstName = 'First name is required';
    if (!shippingData?.user?.last_name?.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingData?.user?.email?.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingData.user.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!shippingData?.user?.phone?.trim()) newErrors.phone = 'Phone number is required';

    // Shipping address validation
    if (!shippingData?.shipping_address?.address?.trim()) newErrors.address = 'Address is required';
    if (!shippingData?.shipping_address?.city) newErrors.city = 'City is required';
    if (!shippingData?.shipping_address?.state) newErrors.state = 'State is required';
    if (!shippingData?.shipping_address?.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!shippingData?.shipping_address?.country) newErrors.country = 'Country is required';
    if (!shippingData?.shipping_method) newErrors.shippingMethod = 'Please select a shipping method';
    if (!shippingData?.sameAsShipping && !shippingData?.billing_address?.address?.trim()) newErrors.billaddress = 'Address is required';
    if (!shippingData?.sameAsShipping && !shippingData?.billing_address?.city) newErrors.billcity = 'City is required';
    if (!shippingData?.sameAsShipping && !shippingData?.billing_address?.state) newErrors.billstate = 'State is required';
    if (!shippingData?.sameAsShipping && !shippingData?.billing_address?.zipCode?.trim()) newErrors.billzipCode = 'ZIP code is required';
    if (!shippingData?.sameAsShipping && !shippingData?.billing_address?.country) newErrors.billcountry = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  console.log(errors.firstName)


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
            <div>
              <Input
                label="First Name"
                type="text"
                placeholder="Enter first name"
                value={shippingData?.user?.first_name || ''}
                onChange={(e) => handleInputChange('user.first_name', e?.target?.value)}
                error={errors.firstName}
                className={errors.firstName ? 'border-red-500' : ''}
                required
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500 ml-2">{errors.firstName}</p>
              )}
            </div>

            <div>
              <Input
                label="Last Name"
                type="text"
                placeholder="Enter last name"
                value={shippingData?.user?.last_name || ''}
                onChange={(e) => handleInputChange('user.last_name', e?.target?.value)}
                error={errors?.lastName}
                className={errors.lastName ? 'border-red-500' : ''}
                required
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500 ml-2">{errors.lastName}</p>
              )}
            </div>

            <div>
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                value={shippingData?.user?.email || ''}
                onChange={(e) => handleInputChange('user.email', e?.target?.value)}
                error={errors?.email}
                required
                className={`md:col-span-1 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 ml-2">{errors.email}</p>
              )}
            </div>


            <div>
              <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter phone number"
                value={shippingData?.user?.phone || ''}
                onChange={(e) => handleInputChange('user.phone', e?.target?.value)}
                error={errors?.phone}
                className={errors.phone ? 'border-red-500' : ''}
                required
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500 ml-2">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>


        {/* Shipping Address */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="MapPin" size={20} className="mr-2" />
            Shipping Address
          </h3>

          <div className="space-y-4">
            <div>
              <Input
                label="Street Address"
                type="text"
                placeholder="Enter street address"
                value={shippingData?.shipping_address.address || ''}
                onChange={(e) => handleInputChange('shipping_address.address', e?.target?.value)}
                error={errors?.address}
                className={errors.address ? 'border-red-500' : ''}
                required
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500 ml-2">{errors.address}</p>
              )}
            </div>
            <Select
              label="Country"
              placeholder="Select country"
              options={countryOptions}
              value={shippingData?.shipping_address?.country || ''}
              onChange={(value) => handleInputChange('shipping_address.country', value)}
              error={errors?.country}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                placeholder="Select state"
                options={stateOptions}
                value={shippingData?.shipping_address?.state || ''}
                onChange={(value) => handleInputChange('shipping_address.state', value)}
                error={errors?.state}
                required
              />
              <Select
                placeholder="Select city"
                options={cityOptions}
                value={shippingData?.shipping_address?.city || ''}
                onChange={(value) => handleInputChange('shipping_address.city', value)}
                error={errors?.city}
                required
              />


              <div>
                <Input

                  type="text"
                  placeholder="Enter ZIP code"
                  value={shippingData?.shipping_address?.zipCode || ''}
                  onChange={(e) => handleInputChange('shipping_address.zipCode', e?.target?.value)}
                  error={errors?.zipCode}
                  className={errors.zipCode ? 'border-red-500' : ''}
                  required
                />
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-500 ml-2">{errors.zipCode}</p>
                )}
              </div>
            </div>


          </div>
        </div>
        {/* Billing Address */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="MapPin" size={20} className="mr-2" />
            Billing Address
          </h3>

          <div className="flex items-center">
            <input type="checkbox" checked={shippingData?.sameAsShipping} onChange={(e) => handleInputChange('sameAsShipping', e?.target?.checked)} />
            <label className="ml-2">Same as shipping address</label>
          </div>
          {!shippingData?.sameAsShipping && (
            <div className="space-y-4 mt-4">
              <div>
                <Input
                  label="Street Address"
                  type="text"
                  placeholder="Enter street address"
                  value={shippingData?.billing_address.address || ''}
                  onChange={(e) => handleInputChange('billing_address.address', e?.target?.value)}
                  error={errors?.billaddress}
                  className={errors.billaddress ? 'border-red-500' : ''}
                  required
                  disabled={shippingData?.sameAsShipping}

                />
                {errors.billaddress && (
                  <p className="mt-1 text-sm text-red-500 ml-2">{errors.billaddress}</p>
                )}
              </div>
              <Select
                label="Country"
                placeholder="Select country"
                options={countryOptions}
                value={shippingData?.billing_address?.country || ''}
                onChange={(value) => handleInputChange('billing_address.billcountry', value)}
                error={errors?.billcountry}
                required
                disabled={shippingData?.sameAsShipping}

              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  placeholder="Select state"
                  options={stateOptions}
                  value={shippingData?.billing_address?.state || ''}
                  onChange={(value) => handleInputChange('billing_address.billstate', value)}
                  error={errors?.billstate}
                  required
                  disabled={shippingData?.sameAsShipping}
                />
                <Select
                  placeholder="Select city"
                  options={cityOptions}
                  value={shippingData?.billing_address?.city || ''}
                  onChange={(value) => handleInputChange('billing_address.billcity', value)}
                  error={errors?.billcity}
                  required
                  disabled={shippingData?.sameAsShipping}
                />
                <div>
                  <Input
                    type="text"
                    placeholder="Enter ZIP code"
                    value={shippingData?.billing_address?.zipCode || ''}
                    onChange={(e) => handleInputChange('billing_address.billzipCode', e?.target?.value)}
                    error={errors?.billzipCode}
                    className={errors.billzipCode ? 'border-red-500' : ''}
                    required
                    disabled={shippingData?.sameAsShipping}
                  />
                  {errors.billzipCode && (
                    <p className="mt-1 text-sm text-red-500 ml-2">{errors.billzipCode}</p>
                  )}
                </div>
              </div>
            </div>
          )}

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
                    checked={shippingData?.shipping_method === method?.id}
                    onChange={(e) => handleInputChange('shipping_method', e?.target?.value)}
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