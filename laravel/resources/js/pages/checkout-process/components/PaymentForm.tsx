import Icon from '@/components/AppIcon';
import Button from '@/components/Button';
import Select from '@/components/Select';
import { Input } from '@/shadcn/ui/input';
import { useState } from 'react';

const PaymentForm = ({ onNext, onBack, paymentData, setPaymentData }) => {
    const [errors, setErrors] = useState({});
    const [showPromoCode, setShowPromoCode] = useState(false);

    const cardTypeOptions = [
        { value: 'visa', label: 'Visa' },
        { value: 'mastercard', label: 'Mastercard' },
        { value: 'amex', label: 'American Express' },
        { value: 'discover', label: 'Discover' },
    ];

    const monthOptions = Array.from({ length: 12 }, (_, i) => ({
        value: String(i + 1)?.padStart(2, '0'),
        label: String(i + 1)?.padStart(2, '0'),
    }));

    const yearOptions = Array.from({ length: 10 }, (_, i) => {
        const year = new Date()?.getFullYear() + i;
        return { value: String(year), label: String(year) };
    });

    const paymentMethods = [
        {
            id: 'card',
            name: 'Credit/Debit Card',
            icon: 'CreditCard',
            description: 'Visa, Mastercard, American Express',
        },
        {
            id: 'paypal',
            name: 'PayPal',
            icon: 'Wallet',
            description: 'Pay with your PayPal account',
        },
        {
            id: 'apple-pay',
            name: 'Apple Pay',
            icon: 'Smartphone',
            description: 'Touch ID or Face ID required',
        },
        {
            id: 'google-pay',
            name: 'Google Pay',
            icon: 'Smartphone',
            description: 'Pay with Google',
        },
    ];

    const handleInputChange = (field, value) => {
        setPaymentData((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (errors?.[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: '',
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!paymentData?.paymentMethod) {
            newErrors.paymentMethod = 'Please select a payment method';
        }

        if (paymentData?.paymentMethod === 'card') {
            if (!paymentData?.cardNumber?.trim()) newErrors.cardNumber = 'Card number is required';
            if (!paymentData?.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
            if (!paymentData?.expiryYear) newErrors.expiryYear = 'Expiry year is required';
            if (!paymentData?.cvv?.trim()) newErrors.cvv = 'CVV is required';
            if (!paymentData?.cardholderName?.trim()) newErrors.cardholderName = 'Cardholder name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors)?.length === 0;
    };

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (validateForm()) {
            onNext();
        }
    };

    const applyPromoCode = () => {
        // Mock promo code application
        if (paymentData?.promoCode === 'SAVE10') {
            setPaymentData((prev) => ({
                ...prev,
                discount: 10.0,
                promoCodeApplied: true,
            }));
        }
    };

    return (
        <div className="bg-background">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method Selection */}
                <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="text-text-primary mb-4 flex items-center text-lg font-semibold">
                        <Icon name="CreditCard" size={20} className="mr-2" />
                        Payment Method
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {paymentMethods?.map((method) => (
                            <label
                                key={method?.id}
                                className={`flex cursor-pointer items-center rounded-lg border p-4 transition-all duration-200 ${
                                    paymentData?.paymentMethod === method?.id ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method?.id}
                                    checked={paymentData?.paymentMethod === method?.id}
                                    onChange={(e) => handleInputChange('paymentMethod', e?.target?.value)}
                                    className="h-4 w-4 border-border text-accent focus:ring-accent"
                                />
                                <div className="ml-3 flex-1">
                                    <div className="flex items-center">
                                        <Icon name={method?.icon} size={20} className="text-text-secondary mr-2" />
                                        <span className="text-text-primary font-medium">{method?.name}</span>
                                    </div>
                                    <p className="text-text-secondary mt-1 text-sm">{method?.description}</p>
                                </div>
                            </label>
                        ))}
                    </div>

                    {errors?.paymentMethod && <p className="text-error mt-2 text-sm">{errors?.paymentMethod}</p>}
                </div>

                {/* Credit Card Form */}
                {paymentData?.paymentMethod === 'card' && (
                    <div className="rounded-lg border border-border bg-card p-6">
                        <h3 className="text-text-primary mb-4 flex items-center text-lg font-semibold">
                            <Icon name="Lock" size={20} className="mr-2" />
                            Card Information
                        </h3>

                        <div className="space-y-4">
                            <Input
                                label="Cardholder Name"
                                type="text"
                                placeholder="Enter name on card"
                                value={paymentData?.cardholderName || ''}
                                onChange={(e) => handleInputChange('cardholderName', e?.target?.value)}
                                error={errors?.cardholderName}
                                required
                            />

                            <Input
                                label="Card Number"
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                value={paymentData?.cardNumber || ''}
                                onChange={(e) => handleInputChange('cardNumber', e?.target?.value)}
                                error={errors?.cardNumber}
                                required
                            />

                            <div className="grid grid-cols-3 gap-4">
                                <Select
                                    label="Expiry Month"
                                    placeholder="MM"
                                    options={monthOptions}
                                    value={paymentData?.expiryMonth || ''}
                                    onChange={(value) => handleInputChange('expiryMonth', value)}
                                    error={errors?.expiryMonth}
                                    required
                                />

                                <Select
                                    label="Expiry Year"
                                    placeholder="YYYY"
                                    options={yearOptions}
                                    value={paymentData?.expiryYear || ''}
                                    onChange={(value) => handleInputChange('expiryYear', value)}
                                    error={errors?.expiryYear}
                                    required
                                />

                                <Input
                                    label="CVV"
                                    type="text"
                                    placeholder="123"
                                    value={paymentData?.cvv || ''}
                                    onChange={(e) => handleInputChange('cvv', e?.target?.value)}
                                    error={errors?.cvv}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex items-center rounded-lg bg-muted p-3">
                            <Icon name="Shield" size={16} className="text-success mr-2" />
                            <span className="text-text-secondary text-sm">Your payment information is encrypted and secure</span>
                        </div>
                    </div>
                )}

                {/* Express Payment Options */}
                {(paymentData?.paymentMethod === 'paypal' ||
                    paymentData?.paymentMethod === 'apple-pay' ||
                    paymentData?.paymentMethod === 'google-pay') && (
                    <div className="rounded-lg border border-border bg-card p-6">
                        <div className="text-center">
                            <Icon name="ExternalLink" size={48} className="mx-auto mb-4 text-accent" />
                            <h3 className="text-text-primary mb-2 text-lg font-semibold">
                                Continue with {paymentMethods?.find((m) => m?.id === paymentData?.paymentMethod)?.name}
                            </h3>
                            <p className="text-text-secondary mb-4">You'll be redirected to complete your payment securely</p>
                            <Button type="button" variant="outline" iconName="ExternalLink" iconPosition="right">
                                Continue to {paymentMethods?.find((m) => m?.id === paymentData?.paymentMethod)?.name}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Promo Code */}
                <div className="rounded-lg border border-border bg-card p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-text-primary flex items-center text-lg font-semibold">
                            <Icon name="Tag" size={20} className="mr-2" />
                            Promo Code
                        </h3>
                        <Button type="button" variant="ghost" size="sm" onClick={() => setShowPromoCode(!showPromoCode)}>
                            {showPromoCode ? 'Hide' : 'Add Code'}
                        </Button>
                    </div>

                    {showPromoCode && (
                        <div className="flex space-x-2">
                            <Input
                                placeholder="Enter promo code"
                                value={paymentData?.promoCode || ''}
                                onChange={(e) => handleInputChange('promoCode', e?.target?.value)}
                                className="flex-1"
                            />
                            <Button type="button" variant="outline" onClick={applyPromoCode} disabled={paymentData?.promoCodeApplied}>
                                {paymentData?.promoCodeApplied ? 'Applied' : 'Apply'}
                            </Button>
                        </div>
                    )}

                    {paymentData?.promoCodeApplied && (
                        <div className="bg-success/10 border-success/20 text-success mt-2 rounded border p-2 text-sm">
                            Promo code applied! You saved $10.00
                        </div>
                    )}
                </div>

                {/* Billing Address */}
                <div className="rounded-lg border border-border bg-card p-6">
                    <Checkbox
                        label="Billing address same as shipping address"
                        checked={paymentData?.sameAsShipping || false}
                        onChange={(e) => handleInputChange('sameAsShipping', e?.target?.checked)}
                    />
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                    <Button type="button" variant="outline" onClick={onBack} iconName="ArrowLeft" iconPosition="left">
                        Back to Shipping
                    </Button>

                    <Button type="submit" variant="default" size="lg" iconName="ArrowRight" iconPosition="right" className="min-w-[200px]">
                        Review Order
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PaymentForm;
