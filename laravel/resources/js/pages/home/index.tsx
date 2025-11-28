import React, { useEffect, useState } from 'react';
import HeroBanner from './components/HeroBanner';
import CategoryGrid from './components/CategoryGrid';
import ProductSection from './components/ProductSection';
import VendorSpotlight from './components/VendorSpotlight';
import NewsletterSignup from './components/NewsletterSignup';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Button } from '@/shadcn/ui/button';
import { useCategories } from '@/api/hooks/useCategories';
import { logger } from '@/logger';
import ServiceBlock from '@/components/Homepage/ServiceBlock';
import DealOfTheDay from '@/components/Homepage/DealOfDayBlock';
import ProductHighlight from '@/components/Homepage/ProductHighlight';
import { useShoppingCart } from '@/api/hooks/useShoppingCart';
import { useProducts } from '@/api/hooks/useProducts';
import { Product } from '@/types/Product';

const Homepage = () => {


  const bestSellers = [
    {
      id: 6,
      name: "Instant Pot Duo 7-in-1",
      slug: "Instant Pot Duo 7-in-1",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      vendor: "Kitchen Essentials",
      rating: 4.7,
      reviewCount: 4521,
      isNew: false,
      discount: 20,
      isWishlisted: false
    },
    {
      id: 7,
      name: "Levi's 501 Original Jeans",
      slug: "Levi's 501 Original Jeans",
      price: 59.99,
      originalPrice: 79.99,
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      vendor: "Fashion Forward",
      rating: 4.4,
      reviewCount: 2134,
      isNew: false,
      discount: 25,
      isWishlisted: false
    },
    {
      id: 8,
      name: "Dyson V15 Detect Vacuum",
      slug: "Dyson V15 Detect Vacuum",
      price: 649.99,
      originalPrice: 749.99,
      image: "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      vendor: "Home Appliances Plus",
      rating: 4.8,
      reviewCount: 1876,
      isNew: false,
      discount: 13,
      isWishlisted: true
    },
    {
      id: 9,
      name: "KitchenAid Stand Mixer",
      slug: "KitchenAid Stand Mixer",
      price: 299.99,
      originalPrice: 379.99,
      image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      vendor: "Culinary World",
      rating: 4.9,
      reviewCount: 3245,
      isNew: false,
      discount: 21,
      isWishlisted: false
    },
    {
      id: 10,
      name: "Adidas Ultraboost 22",
      slug: "Adidas Ultraboost 22",
      price: 179.99,
      originalPrice: 199.99,
      image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      vendor: "Athletic Gear Co",
      rating: 4.6,
      reviewCount: 1432,
      isNew: true,
      discount: 10,
      isWishlisted: false
    }
  ];

  const newArrivals = [
    {
      id: 11,
      name: "iPad Pro 12.9-inch M2",
      slug: "iPad Pro 12.9-inch M2",
      price: 1099.99,
      originalPrice: null,
      image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      vendor: "Tech Innovations",
      rating: 4.8,
      reviewCount: 567,
      isNew: true,
      discount: null,
      isWishlisted: false
    },
    {
      id: 12,
      name: "Zara Wool Blend Coat",
      slug: "Zara Wool Blend Coat",
      price: 149.99,
      originalPrice: null,
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      vendor: "Fashion Boutique",
      rating: 4.5,
      reviewCount: 234,
      isNew: true,
      discount: null,
      isWishlisted: true
    },
    {
      id: 13,
      name: "Philips Hue Smart Bulbs",
      slug: "Philips Hue Smart Bulbs",
      price: 49.99,
      originalPrice: null,
      image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      vendor: "Smart Home Solutions",
      rating: 4.7,
      reviewCount: 891,
      isNew: true,
      discount: null,
      isWishlisted: false
    },
    {
      id: 14,
      name: "Yeti Rambler Tumbler",
      slug: "Yeti Rambler Tumbler",
      price: 34.99,
      originalPrice: null,
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      vendor: "Outdoor Gear",
      rating: 4.6,
      reviewCount: 1245,
      isNew: true,
      discount: null,
      isWishlisted: false
    },
    {
      id: 15,
      name: "Patagonia Fleece Jacket",
      slug: "Patagonia Fleece Jacket",
      price: 199.99,
      originalPrice: null,
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      vendor: "Adventure Outfitters",
      rating: 4.8,
      reviewCount: 678,
      isNew: true,
      discount: null,
      isWishlisted: true
    }
  ];

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  
  // Fetch featured products with categories
  const { data: featuredProductsData } = useProducts(
    { refetchOnMount: true }
  );

  useEffect(() => {
  if (featuredProductsData?.payload?.data) {
    setFeaturedProducts(featuredProductsData.payload.data);
  }
}, [featuredProductsData]);

  // Update featured products when data is loaded
  useEffect(() => {
    if (featuredProductsData?.payload?.data) {
      setFeaturedProducts(featuredProductsData.payload.data);
    }
  }, [featuredProductsData]);
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { data } = useShoppingCart();
  const [guestId, setGuestId] = useState<string | null>(null);

  useEffect(() => {
    const guestLocal = localStorage.getItem('guest_id');
    if (guestLocal) {
      setGuestId(guestLocal);
    } else if (data?.payload?.id) {
      const newGuestId = data.payload.id;
      localStorage.setItem('guest_id', newGuestId);
      setGuestId(newGuestId);
    }
  }, [data]);
  

  return (
    <GuestLayout>
      <Head title="Home" />

      {/* Hero Banner Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner />
        </div>
      </section>


      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CategoryGrid />
        </div>
      </section>


      <section className="px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <ProductSection
            title="Featured Products"
            subtitle="Handpicked items from our top-rated vendors"
            products={featuredProducts}
            // viewAllLink="/product-listing-category-browse?featured=true"
            viewAllLink="/product-listing?featured=true"
            sectionId="featured"
          />
        </div>
      </section>

      <ProductHighlight />

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ProductSection
            title="Best Sellers"
            subtitle="Most popular products loved by our customers"
            products={bestSellers}
            viewAllLink="/product-listing?bestsellers=true"
            sectionId="bestsellers"
          />
        </div>
      </section>

      <DealOfTheDay />

      <VendorSpotlight />

      <ServiceBlock />

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ProductSection
            title="New Arrivals"
            subtitle="Latest products just added to our marketplace"
            products={newArrivals}
            viewAllLink="/product-listing?new=true"
            sectionId="new-arrivals"
          />
        </div>
      </section>

      <NewsletterSignup />
    </GuestLayout >
  );
};

export default Homepage;