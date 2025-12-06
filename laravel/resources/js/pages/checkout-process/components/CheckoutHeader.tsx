import Icon from '@/components/AppIcon';

const CheckoutHeader = ({ currentStep, steps }) => {
    return (
        <div className="border-b border-border bg-background">
            <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-text-primary text-2xl font-bold">Checkout</h1>
                    <div className="text-text-secondary flex items-center space-x-2 text-sm">
                        <Icon name="Shield" size={16} className="text-success" />
                        <span>Secure Checkout</span>
                    </div>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-between">
                    {steps?.map((step, index) => (
                        <div key={step?.id} className="flex items-center">
                            <div className="flex items-center">
                                <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                                        index < currentStep
                                            ? 'bg-success border-success text-white'
                                            : index === currentStep
                                              ? 'border-accent bg-accent text-white'
                                              : 'text-text-secondary border-border bg-background'
                                    }`}
                                >
                                    {index < currentStep ? <Icon name="Check" size={16} /> : <span className="text-sm font-medium">{index + 1}</span>}
                                </div>
                                <span
                                    className={`ml-2 hidden text-sm font-medium sm:inline ${
                                        index <= currentStep ? 'text-text-primary' : 'text-text-secondary'
                                    }`}
                                >
                                    {step?.title}
                                </span>
                            </div>
                            {index < steps?.length - 1 && (
                                <div className={`mx-4 h-0.5 w-12 sm:w-20 ${index < currentStep ? 'bg-success' : 'bg-border'}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CheckoutHeader;
