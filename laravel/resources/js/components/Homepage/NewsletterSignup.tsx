import Icon, { IconProps } from '@/components/Common/AppIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import React, { FormEvent, useState } from 'react';

interface BenefitItem {
    icon: IconProps['name'];
    title: string;
    description: string;
}

const NewsletterSignup: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e?.preventDefault();
        setError('');

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
        setIsSubscribed(true);
        setEmail('');
    };

    const benefits: BenefitItem[] = [
        {
            icon: 'Tag',
            title: 'Exclusive Deals',
            description: 'Get first access to sales and special offers',
        },
        {
            icon: 'Bell',
            title: 'New Arrivals',
            description: 'Be the first to know about new products',
        },
        {
            icon: 'Gift',
            title: 'Member Perks',
            description: 'Enjoy subscriber-only benefits and rewards',
        },
    ];

    if (isSubscribed) {
        return (
            <section className="bg-gradient-to-r from-accent to-accent/80 py-12 lg:py-16">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                        <Icon name="CheckCircle" size={40} className="text-white" />
                    </div>
                    <h2 className="mb-4 text-2xl font-bold text-white lg:text-3xl">Welcome to RWT HUB!</h2>
                    <p className="mb-6 text-lg text-white/90">Thank you for subscribing! You'll receive our latest updates and exclusive offers.</p>
                    <Button
                        variant="outline"
                        onClick={() => setIsSubscribed(false)}
                        className="border-white/30 bg-white/20 text-white hover:bg-white/30"
                    >
                        Subscribe Another Email
                    </Button>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-gradient-to-r from-accent to-accent/80 py-12 lg:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Content */}
                    <div className="text-center lg:text-left">
                        <h2 className="mb-4 text-2xl font-bold text-white lg:text-3xl">Stay in the Loop</h2>
                        <p className="mb-6 text-lg text-white/90">
                            Subscribe to our newsletter and never miss out on the latest deals, new arrivals, and exclusive member benefits.
                        </p>

                        {/* Benefits */}
                        <div className="mb-8 space-y-4">
                            {benefits?.map((benefit) => (
                                <div key={benefit?.title} className="flex items-start space-x-3 text-left">
                                    <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                                        <Icon name={benefit?.icon} size={16} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-semibold text-white">{benefit?.title}</h3>
                                        <p className="text-sm text-white/80">{benefit?.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Signup Form */}
                    <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm lg:p-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Input
                                    type="email"
                                    label="Email Address"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e?.target?.value)}
                                    error={error}
                                    className="border-white/30 bg-white/20 text-white placeholder-white/70"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                loading={isLoading}
                                fullWidth
                                size="lg"
                                iconName="Mail"
                                iconPosition="left"
                                className="bg-white font-semibold text-accent hover:bg-white/90"
                            >
                                {isLoading ? 'Subscribing...' : 'Subscribe Now'}
                            </Button>

                            <p className="text-center text-xs text-white/70">
                                By subscribing, you agree to our{' '}
                                <a href="#" className="underline transition-colors duration-200 hover:text-white">
                                    Privacy Policy
                                </a>{' '}
                                and{' '}
                                <a href="#" className="underline transition-colors duration-200 hover:text-white">
                                    Terms of Service
                                </a>
                            </p>
                        </form>

                        {/* Social Proof */}
                        <div className="mt-6 border-t border-white/20 pt-6">
                            <div className="flex items-center justify-center space-x-4 text-white/80">
                                <div className="flex items-center space-x-2">
                                    <Icon name="Users" size={16} />
                                    <span className="text-sm">50K+ subscribers</span>
                                </div>
                                <div className="h-1 w-1 rounded-full bg-white/40"></div>
                                <div className="flex items-center space-x-2">
                                    <Icon name="Star" size={16} className="fill-current" />
                                    <span className="text-sm">4.8/5 rating</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSignup;
