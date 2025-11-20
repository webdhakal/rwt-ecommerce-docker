import { Link } from '@inertiajs/react';
import React from 'react';
import Icon from '@/components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: "Shop",
      links: [
        { label: "All Categories", href: "/product-listing-category-browse" },
        { label: "Electronics", href: "/product-listing-category-browse?category=Electronics" },
        { label: "Fashion", href: "/product-listing-category-browse?category=Fashion" },
        { label: "Home & Garden", href: "/product-listing-category-browse?category=Home" },
        { label: "Sports & Fitness", href: "/product-listing-category-browse?category=Sports" }
      ]
    },
    {
      title: "Customer Service",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Contact Us", href: "#" },
        { label: "Shipping Info", href: "#" },
        { label: "Returns & Exchanges", href: "#" },
        { label: "Size Guide", href: "#" }
      ]
    },
    {
      title: "Account",
      links: [
        { label: "My Account", href: "#" },
        { label: "Order History", href: "#" },
        { label: "Wishlist", href: "#" },
        { label: "Track Order", href: "#" },
        { label: "Rewards Program", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
        { label: "Investor Relations", href: "#" },
        { label: "Sustainability", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", href: "#" },
    { name: "Twitter", icon: "Twitter", href: "#" },
    { name: "Instagram", icon: "Instagram", href: "#" },
    { name: "Youtube", icon: "Youtube", href: "#" },
    { name: "Linkedin", icon: "Linkedin", href: "#" }
  ];

  const paymentMethods = [
    { name: "Visa", icon: "CreditCard" },
    { name: "Mastercard", icon: "CreditCard" },
    { name: "American Express", icon: "CreditCard" },
    { name: "PayPal", icon: "Wallet" },
    { name: "Apple Pay", icon: "Smartphone" },
    { name: "Google Pay", icon: "Smartphone" }
  ];

  return (
    <footer className="bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="col-span-2 lg:col-span-1">
              <Link href={route('home')} className="flex space-x-2 mb-4 justify-center md:justify-start">
                <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                  <Icon name="ShoppingBag" size={20} color="#1e293b" />
                </div>
                <span className="text-xl font-bold">EcommerceHub</span>
              </Link>
              <p className="text-foreground/80 text-sm mb-6 max-w-sm">
                Your trusted marketplace connecting shoppers with quality vendors worldwide. Discover, compare, and shop with confidence.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4 max-w-sm justify-around md:justify-center">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.href}
                    className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors duration-200"
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
                <h3 className="font-semibold text-foreground mb-4">
                  {section?.title}
                </h3>
                <ul className="space-y-2">
                  {section?.links?.map((link) => (
                    <li key={link?.label}>
                      <Link
                        href={link?.href}
                        className="text-foreground/80 hover:text-foreground text-sm transition-colors duration-200"
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
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-foreground/80 text-sm text-center lg:text-left">
              © {currentYear} EcommerceHub. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              <span className="text-foreground/80 text-sm mr-2">We accept:</span>
              {paymentMethods?.slice(0, 4)?.map((method, index) => (
                <div
                  key={method?.name}
                  className="w-8 h-6 bg-background/10 rounded flex items-center justify-center"
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
          <div className="flex flex-wrap items-center justify-center space-x-6 text-foreground/60 text-xs">
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