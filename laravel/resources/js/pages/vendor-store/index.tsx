import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import VendorHeader from './components/VendorHeader';
import TabNavigation from './components/TabNavigation';
import ProductsTab from './components/ProductsTab';
import AboutTab from './components/AboutTab';
import ReviewsTab from './components/ReviewsTab';
import PoliciesTab from './components/PoliciesTab';
import FloatingContactButton from '@/components/Common/FloatingContactButton';
import GuestLayout from '@/layouts/guest-layout';

const VendorStoreProfile = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock vendor data
  const vendor = {
    id: "vendor-001",
    name: "TechStore Pro",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviewCount: 2847,
    establishedYear: 2018,
    totalProducts: 1247,
    responseTime: "2 hours",
    location: "San Francisco, CA",
    isVerified: true,
    isPremium: true,
    fastShipping: true,
    description: `TechStore Pro is your premier destination for cutting-edge technology products and innovative solutions. We specialize in providing high-quality electronics, gadgets, and tech accessories that enhance your digital lifestyle.`,
    story: `Founded in 2018 by a team of technology enthusiasts, TechStore Pro began as a small startup with a vision to make the latest technology accessible to everyone. Over the years, we've grown into a trusted marketplace vendor, serving thousands of satisfied customers worldwide.`,
    mission: `Our mission is to bridge the gap between innovative technology and everyday users by offering carefully curated products, exceptional customer service, and competitive pricing. We believe that everyone deserves access to the tools that can improve their productivity and enhance their lives.`,
    businessType: "LLC",
    teamSize: 25,
    certifications: ["ISO 9001", "CE Certified", "FCC Approved"],
    address: "1234 Tech Street, San Francisco, CA 94105",
    phone: "+1 (555) 123-4567",
    email: "contact@techstorepro.com",
    website: "https://www.techstorepro.com",
    coordinates: {
      lat: 37.7749,
      lng: -122.4194
    },
    businessHours: [
      { day: "Monday", hours: "9:00 AM - 6:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
      { day: "Friday", hours: "9:00 AM - 6:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
      { day: "Sunday", hours: "Closed" }
    ],
    socialMedia: [
      { platform: "Facebook", icon: "Facebook", url: "https://facebook.com/techstorepro" },
      { platform: "Twitter", icon: "Twitter", url: "https://twitter.com/techstorepro" },
      { platform: "Instagram", icon: "Instagram", url: "https://instagram.com/techstorepro" },
      { platform: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com/company/techstorepro" }
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop", caption: "Store Front" },
      { url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop", caption: "Interior" },
      { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop", caption: "Team" },
      { url: "https://images.unsplash.com/photo-1560472355-536de3962603?w=300&h=300&fit=crop", caption: "Products" },
      { url: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=300&h=300&fit=crop", caption: "Warehouse" },
      { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop", caption: "Office" }
    ]
  };

  // Mock products data
  const products = [
    {
      id: "prod-001",
      name: "iPhone 15 Pro Max 256GB",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      price: 1199,
      originalPrice: 1299,
      discount: 8,
      rating: 4.9,
      reviewCount: 234,
      stock: 15,
      categoryId: "electronics",
      isNew: true
    },
    {
      id: "prod-002",
      name: "MacBook Air M2 13-inch",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
      price: 999,
      originalPrice: 1199,
      discount: 17,
      rating: 4.8,
      reviewCount: 189,
      stock: 8,
      categoryId: "computers"
    },
    {
      id: "prod-003",
      name: "Samsung Galaxy S24 Ultra",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
      price: 1099,
      rating: 4.7,
      reviewCount: 156,
      stock: 22,
      categoryId: "electronics"
    },
    {
      id: "prod-004",
      name: "AirPods Pro 2nd Generation",
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
      price: 249,
      originalPrice: 279,
      discount: 11,
      rating: 4.6,
      reviewCount: 312,
      stock: 45,
      categoryId: "audio",
      isNew: true
    },
    {
      id: "prod-005",
      name: "iPad Pro 12.9-inch M2",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      price: 1099,
      rating: 4.8,
      reviewCount: 98,
      stock: 12,
      categoryId: "tablets"
    },
    {
      id: "prod-006",
      name: "Sony WH-1000XM5 Headphones",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
      price: 399,
      originalPrice: 449,
      discount: 11,
      rating: 4.9,
      reviewCount: 267,
      stock: 18,
      categoryId: "audio"
    }
  ];

  // Mock categories data
  const categories = [
    { id: "electronics", name: "Electronics" },
    { id: "computers", name: "Computers" },
    { id: "audio", name: "Audio" },
    { id: "tablets", name: "Tablets" },
    { id: "accessories", name: "Accessories" }
  ];

  // Mock reviews data
  const reviews = [
    {
      id: "review-001",
      customerName: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      date: "2 days ago",
      comment: "Excellent service and fast shipping! The product arrived exactly as described and the customer support was very helpful when I had questions.",
      isVerified: true,
      helpfulCount: 12,
      productName: "iPhone 15 Pro Max",
      images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop"],
      vendorResponse: {
        date: "1 day ago",
        message: "Thank you for your wonderful review, Sarah! We're thrilled that you had a great experience with us."
      }
    },
    {
      id: "review-002",
      customerName: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4,
      date: "1 week ago",
      comment: "Good quality products and reasonable prices. The MacBook I ordered works perfectly. Only minor issue was the packaging could be better.",
      isVerified: true,
      helpfulCount: 8,
      productName: "MacBook Air M2"
    },
    {
      id: "review-003",
      customerName: "Emily Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      date: "2 weeks ago",
      comment: "Amazing store! I\'ve been buying from TechStore Pro for over a year now and they never disappoint. Great selection and competitive prices.",
      isVerified: true,
      helpfulCount: 15,
      vendorResponse: {
        date: "2 weeks ago",
        message: "Emily, thank you for being such a loyal customer! We appreciate your continued trust in us."
      }
    }
  ];

  // Mock policies data
  const policies = {
    shipping: {
      description: "We offer fast and reliable shipping options to ensure your products reach you safely and on time.",
      details: [
        "Free standard shipping on orders over $50",
        "Express shipping available for urgent orders",
        "Same-day delivery in select metropolitan areas",
        "International shipping to 50+ countries",
        "Package tracking provided for all orders",
        "Secure packaging to prevent damage during transit"
      ]
    },
    returns: {
      description: "We want you to be completely satisfied with your purchase. Our flexible return policy makes it easy.",
      details: [
        "30-day return window for most products",
        "Items must be in original condition and packaging",
        "Free return shipping for defective items",
        "Easy online return process",
        "Refund processed within 5-7 business days",
        "Exchange options available for different sizes/colors"
      ]
    },
    refunds: {
      description: "We process refunds quickly and transparently to ensure customer satisfaction.",
      details: [
        "Full refund for defective or damaged items",
        "Partial refunds for items with minor issues",
        "Refunds processed to original payment method",
        "Store credit option for faster processing",
        "No restocking fees for standard returns",
        "Refund status updates via email"
      ]
    },
    customerService: {
      description: "Our dedicated customer service team is here to help you with any questions or concerns.",
      details: [
        "24/7 customer support via chat and email",
        "Phone support during business hours",
        "Average response time under 2 hours",
        "Multilingual support available",
        "Technical support for all products",
        "Order tracking and status updates"
      ]
    },
    privacy: {
      description: "We take your privacy seriously and are committed to protecting your personal information.",
      details: [
        "SSL encryption for all transactions",
        "Personal data never shared with third parties",
        "Secure payment processing",
        "Regular security audits and updates",
        "GDPR compliant data handling",
        "Option to delete account and data"
      ]
    },
    terms: {
      description: "Our terms of service outline the conditions for using our platform and services.",
      details: [
        "Clear pricing with no hidden fees",
        "Product warranties as specified by manufacturers",
        "Dispute resolution process available",
        "Regular terms updates with customer notification",
        "Fair use policy for all services",
        "Legal compliance with local regulations"
      ]
    }
  };

  const tabs = [
    { id: 'products', label: 'Products', icon: 'Package', count: products?.length },
    { id: 'about', label: 'About', icon: 'Info' },
    { id: 'reviews', label: 'Reviews', icon: 'Star', count: reviews?.length },
    { id: 'policies', label: 'Policies', icon: 'FileText' }
  ];

  const ratingBreakdown = [
    { stars: 5, count: 1847, percentage: 65 },
    { stars: 4, count: 692, percentage: 24 },
    { stars: 3, count: 231, percentage: 8 },
    { stars: 2, count: 54, percentage: 2 },
    { stars: 1, count: 23, percentage: 1 }
  ];

  const breadcrumbs = [
    { label: 'Home', path: '/homepage' },
    { label: 'Vendors', path: '/vendor-store-profile' },
    { label: vendor?.name, path: '/vendor-store-profile' }
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleContact = (type = 'message') => {
    console.log(`Contacting vendor via ${type}`);
    // Handle different contact methods
    switch (type) {
      case 'call':
        window.open(`tel:${vendor?.phone}`);
        break;
      case 'email':
        window.open(`mailto:${vendor?.email}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${vendor?.phone?.replace(/\D/g, '')}`);
        break;
      default:
        // Open message modal or navigate to messaging page
        break;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsTab products={products} categories={categories} />;
      case 'about':
        return <AboutTab vendor={vendor} />;
      case 'reviews':
        return (
          <ReviewsTab
            reviews={reviews}
            averageRating={vendor?.rating}
            ratingBreakdown={ratingBreakdown}
            totalReviews={vendor?.reviewCount}
          />
        );
      case 'policies':
        return <PoliciesTab policies={policies} />;
      default:
        return <ProductsTab products={products} categories={categories} />;
    }
  };

  return (
    <GuestLayout>
      {/* Shouldn't this <Header /> be in the layout ? */}
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />
        </div>

        <VendorHeader
          vendor={vendor}
          onFollow={handleFollow}
          onContact={handleContact}
          isFollowing={isFollowing}
        />

        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
        />

        {renderTabContent()}
      </main>
      <FloatingContactButton onContact={handleContact} />
    </GuestLayout>
  );
};

export default VendorStoreProfile;