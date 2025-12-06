import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { Input } from '@/shadcn/ui/input';
import { useState } from 'react';

const NewsletterSignup = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
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

    const benefits = [
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
            <section className="bg-gradient-to-r from-primary to-accent py-12 lg:py-16">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-background/20 backdrop-blur-sm">
                        <Icon name="CheckCircle" size={40} className="text-primary-foreground" />
                    </div>
                    <h2 className="mb-4 text-2xl font-bold text-primary-foreground lg:text-3xl">Welcome to EcommerceHub!</h2>
                    <p className="mb-6 text-lg text-primary-foreground/90">
                        Thank you for subscribing! You'll receive our latest updates and exclusive offers.
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => setIsSubscribed(false)}
                        className="w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                    >
                        Subscribe Another Email
                    </Button>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-gradient-to-r from-primary to-accent py-12 lg:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Content */}
                    <div className="text-center lg:text-left">
                        <h2 className="mb-4 text-2xl font-bold text-primary-foreground lg:text-3xl">Stay in the Loop</h2>
                        <p className="mb-6 text-lg text-primary-foreground/90">
                            Subscribe to our newsletter and never miss out on the latest deals, new arrivals, and exclusive member benefits.
                        </p>

                        {/* Benefits */}
                        <div className="mb-8 space-y-4">
                            {benefits?.map((benefit) => (
                                <div key={benefit?.title} className="flex items-start space-x-3 text-left">
                                    <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-foreground/20">
                                        <Icon name={benefit?.icon} size={16} className="text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-semibold text-primary-foreground">{benefit?.title}</h3>
                                        <p className="text-sm text-primary-foreground/80">{benefit?.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Signup Form */}
                    <div className="rounded-lg border border-border/30 bg-card/20 p-6 backdrop-blur-sm lg:p-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Input
                                    type="email"
                                    label="Email Address"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e?.target?.value)}
                                    error={error}
                                    className="border-border bg-background/50 text-foreground placeholder:text-muted-foreground"
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
                                className="w-full border border-border bg-background font-semibold text-foreground hover:bg-background/90"
                            >
                                {isLoading ? 'Subscribing...' : 'Subscribe Now'}
                            </Button>

                            <p className="text-center text-xs text-primary-foreground/70">
                                By subscribing, you agree to our{' '}
                                <a href="#" className="underline transition-colors duration-200 hover:text-primary-foreground">
                                    Privacy Policy
                                </a>{' '}
                                and{' '}
                                <a href="#" className="underline transition-colors duration-200 hover:text-primary-foreground">
                                    Terms of Service
                                </a>
                            </p>
                        </form>

                        {/* Social Proof */}
                        <div className="mt-6 border-t border-primary-foreground/20 pt-6">
                            <div className="flex items-center justify-center space-x-4 text-primary-foreground/80">
                                <div className="flex items-center space-x-2">
                                    <Icon name="Users" size={16} />
                                    <span className="text-sm">50K+ subscribers</span>
                                </div>
                                <div className="h-1 w-1 rounded-full bg-primary-foreground/40"></div>
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
