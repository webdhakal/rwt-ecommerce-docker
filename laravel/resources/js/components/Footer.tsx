import Icon from '@/components/AppIcon';
import { Link } from '@inertiajs/react';

const Footer = () => {
    const currentYear = new Date()?.getFullYear();

    const footerSections = [
        {
            title: 'Shop',
            links: [
                { label: 'All Categories', href: '/product-listing-category-browse' },
                { label: 'Electronics', href: '/product-listing-category-browse?category=Electronics' },
                { label: 'Fashion', href: '/product-listing-category-browse?category=Fashion' },
                { label: 'Home & Garden', href: '/product-listing-category-browse?category=Home' },
                { label: 'Sports & Fitness', href: '/product-listing-category-browse?category=Sports' },
            ],
        },
        {
            title: 'Customer Service',
            links: [
                { label: 'Help Center', href: '#' },
                { label: 'Contact Us', href: '#' },
                { label: 'Shipping Info', href: '#' },
                { label: 'Returns & Exchanges', href: '#' },
                { label: 'Size Guide', href: '#' },
            ],
        },
        {
            title: 'Account',
            links: [
                { label: 'My Account', href: '#' },
                { label: 'Order History', href: '#' },
                { label: 'Wishlist', href: '#' },
                { label: 'Track Order', href: '#' },
                { label: 'Rewards Program', href: '#' },
            ],
        },
        {
            title: 'Company',
            links: [
                { label: 'About Us', href: '#' },
                { label: 'Careers', href: '#' },
                { label: 'Press', href: '#' },
                { label: 'Investor Relations', href: '#' },
                { label: 'Sustainability', href: '#' },
            ],
        },
    ];

    const socialLinks = [
        { name: 'Facebook', icon: 'Facebook', href: '#' },
        { name: 'Twitter', icon: 'Twitter', href: '#' },
        { name: 'Instagram', icon: 'Instagram', href: '#' },
        { name: 'Youtube', icon: 'Youtube', href: '#' },
        { name: 'Linkedin', icon: 'Linkedin', href: '#' },
    ];

    const paymentMethods = [
        { name: 'Visa', icon: 'CreditCard' },
        { name: 'Mastercard', icon: 'CreditCard' },
        { name: 'American Express', icon: 'CreditCard' },
        { name: 'PayPal', icon: 'Wallet' },
        { name: 'Apple Pay', icon: 'Smartphone' },
        { name: 'Google Pay', icon: 'Smartphone' },
    ];

    return (
        <footer className="bg-background text-foreground">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 lg:py-16">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
                        {/* Brand Section */}
                        <div className="col-span-2 lg:col-span-1">
                            <Link href={route('home')} className="mb-4 flex justify-center space-x-2 md:justify-start">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background">
                                    <Icon name="ShoppingBag" size={20} color="#1e293b" />
                                </div>
                                <span className="text-xl font-bold">EcommerceHub</span>
                            </Link>
                            <p className="mb-6 max-w-sm text-sm text-foreground/80">
                                Your trusted marketplace connecting shoppers with quality vendors worldwide. Discover, compare, and shop with
                                confidence.
                            </p>

                            {/* Social Links */}
                            <div className="flex max-w-sm justify-around space-x-4 md:justify-center">
                                {socialLinks?.map((social) => (
                                    <a
                                        key={social?.name}
                                        href={social?.href}
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-background/10 transition-colors duration-200 hover:bg-background/20"
                                        aria-label={social?.name}
                                    >
                                        <Icon name={social?.icon} size={16} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Footer Links */}
                        {footerSections?.map((section) => (
                            <div key={section?.title}>
                                <h3 className="mb-4 font-semibold text-foreground">{section?.title}</h3>
                                <ul className="space-y-2">
                                    {section?.links?.map((link) => (
                                        <li key={link?.label}>
                                            <Link
                                                href={link?.href}
                                                className="text-sm text-foreground/80 transition-colors duration-200 hover:text-foreground"
                                            >
                                                {link?.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-white/20 py-6">
                    <div className="flex flex-col items-center justify-between space-y-4 lg:flex-row lg:space-y-0">
                        {/* Copyright */}
                        <div className="text-center text-sm text-foreground/80 lg:text-left">© {currentYear} EcommerceHub. All rights reserved.</div>

                        {/* Legal Links */}
                        <div className="flex items-center space-x-6 text-sm">
                            <Link href="#" className="text-foreground/80 transition-colors duration-200 hover:text-foreground">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-foreground/80 transition-colors duration-200 hover:text-foreground">
                                Terms of Service
                            </Link>
                            <Link href="#" className="text-foreground/80 transition-colors duration-200 hover:text-foreground">
                                Cookie Policy
                            </Link>
                        </div>

                        {/* Payment Methods */}
                        <div className="flex items-center space-x-2">
                            <span className="mr-2 text-sm text-foreground/80">We accept:</span>
                            {paymentMethods?.slice(0, 4)?.map((method, index) => (
                                <div
                                    key={method?.name}
                                    className="flex h-6 w-8 items-center justify-center rounded bg-background/10"
                                    title={method?.name}
                                >
                                    <Icon name={method?.icon} size={12} className="text-foreground/80" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="border-t border-white/20 py-4">
                    <div className="flex flex-wrap items-center justify-center space-x-6 text-xs text-foreground/60">
                        <div className="flex items-center space-x-1">
                            <Icon name="Shield" size={14} />
                            <span>SSL Secured</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Icon name="Truck" size={14} />
                            <span>Free Shipping</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Icon name="RotateCcw" size={14} />
                            <span>Easy Returns</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Icon name="Headphones" size={14} />
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
