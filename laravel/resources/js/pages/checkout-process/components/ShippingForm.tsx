import Icon from '@/components/AppIcon';
import Button from '@/components/Button';
import Select from '@/components/Select';
import { Input } from '@/shadcn/ui/input';
import { useState } from 'react';

const ShippingForm = ({ onNext, shippingData, setShippingData }) => {
    const [errors, setErrors] = useState({});

    const countryOptions = [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'au', label: 'Australia' },
    ];

    const stateOptions = [
        { value: 'ca', label: 'California' },
        { value: 'ny', label: 'New York' },
        { value: 'tx', label: 'Texas' },
        { value: 'fl', label: 'Florida' },
    ];

    const shippingMethods = [
        {
            id: 'standard',
            name: 'Standard Shipping',
            description: '5-7 business days',
            price: 5.99,
            estimatedDelivery: 'Dec 5 - Dec 9',
        },
        {
            id: 'express',
            name: 'Express Shipping',
            description: '2-3 business days',
            price: 12.99,
            estimatedDelivery: 'Dec 2 - Dec 4',
        },
        {
            id: 'overnight',
            name: 'Overnight Shipping',
            description: 'Next business day',
            price: 24.99,
            estimatedDelivery: 'Dec 1',
        },
    ];

    const handleInputChange = (field, value) => {
        setShippingData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Clear error when user starts typing
        if (errors?.[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: '',
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
        if (validateForm()) {
            onNext();
        }
    };

    return (
        <div className="bg-background">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="text-text-primary mb-4 flex items-center text-lg font-semibold">
                        <Icon name="User" size={20} className="mr-2" />
                        Contact Information
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="text-text-primary mb-4 flex items-center text-lg font-semibold">
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

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <Input
                                label="City"
                                type="text"
                                placeholder="Enter city"
                                value={shippingData?.city || ''}
                                onChange={(e) => handleInputChange('city', e?.target?.value)}
                                error={errors?.city}
                                required
                            />

                            <Select
                                label="State/Province"
                                placeholder="Select state"
                                options={stateOptions}
                                value={shippingData?.state || ''}
                                onChange={(value) => handleInputChange('state', value)}
                                error={errors?.state}
                                required
                            />

                            <Input
                                label="ZIP/Postal Code"
                                type="text"
                                placeholder="Enter ZIP code"
                                value={shippingData?.zipCode || ''}
                                onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
                                error={errors?.zipCode}
                                required
                            />
                        </div>

                        <Select
                            label="Country"
                            placeholder="Select country"
                            options={countryOptions}
                            value={shippingData?.country || ''}
                            onChange={(value) => handleInputChange('country', value)}
                            error={errors?.country}
                            required
                        />
                    </div>
                </div>

                {/* Shipping Methods */}
                <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="text-text-primary mb-4 flex items-center text-lg font-semibold">
                        <Icon name="Truck" size={20} className="mr-2" />
                        Shipping Method
                    </h3>

                    <div className="space-y-3">
                        {shippingMethods?.map((method) => (
                            <label
                                key={method?.id}
                                className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all duration-200 ${
                                    shippingData?.shippingMethod === method?.id ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
                                }`}
                            >
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="shippingMethod"
                                        value={method?.id}
                                        checked={shippingData?.shippingMethod === method?.id}
                                        onChange={(e) => handleInputChange('shippingMethod', e?.target?.value)}
                                        className="h-4 w-4 border-border text-accent focus:ring-accent"
                                    />
                                    <div className="ml-3">
                                        <div className="text-text-primary font-medium">{method?.name}</div>
                                        <div className="text-text-secondary text-sm">{method?.description}</div>
                                        <div className="text-success text-sm">Estimated delivery: {method?.estimatedDelivery}</div>
                                    </div>
                                </div>
                                <div className="text-text-primary text-lg font-semibold">${method?.price?.toFixed(2)}</div>
                            </label>
                        ))}
                    </div>

                    {errors?.shippingMethod && <p className="text-error mt-2 text-sm">{errors?.shippingMethod}</p>}
                </div>

                {/* Continue Button */}
                <div className="flex justify-end pt-6">
                    <Button type="submit" variant="default" size="lg" iconName="ArrowRight" iconPosition="right" className="min-w-[200px]">
                        Continue to Payment
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ShippingForm;
