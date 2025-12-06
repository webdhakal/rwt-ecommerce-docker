import Icon from '@/components/Common/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

interface Vendor {
    id: number;
    name: string;
    description: string;
    logo: string;
    banner: string;
    rating: number;
    reviewCount: number;
    productCount: number;
    categories: string[];
    isVerified: boolean;
    joinedYear: number;
}

const VendorSpotlight: React.FC = () => {
    const [currentVendorIndex, setCurrentVendorIndex] = useState<number>(0);
    const featuredVendors: Vendor[] = [
        {
            id: 1,
            name: 'TechHub Electronics',
            description: 'Premium electronics and gadgets with 5+ years of excellence in customer service and quality products.',
            logo: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
            banner: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
            rating: 4.8,
            reviewCount: 2847,
            productCount: 1250,
            categories: ['Electronics', 'Gadgets', 'Accessories'],
            isVerified: true,
            joinedYear: 2019,
        },
        {
            id: 2,
            name: 'Fashion Forward',
            description: 'Trendy clothing and accessories for the modern lifestyle. Curated collections from emerging designers.',
            logo: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
            banner: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
            rating: 4.6,
            reviewCount: 1923,
            productCount: 890,
            categories: ['Fashion', 'Accessories', 'Shoes'],
            isVerified: true,
            joinedYear: 2020,
        },
        {
            id: 3,
            name: 'Home Essentials Co.',
            description: 'Transform your living space with our carefully selected home decor, furniture, and lifestyle products.',
            logo: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
            banner: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
            rating: 4.7,
            reviewCount: 1456,
            productCount: 675,
            categories: ['Home', 'Furniture', 'Decor'],
            isVerified: true,
            joinedYear: 2018,
        },
    ];

    const nextVendor = (): void => {
        setCurrentVendorIndex((prev) => (prev === featuredVendors.length - 1 ? 0 : prev + 1));
    };

    const prevVendor = (): void => {
        setCurrentVendorIndex((prev) => (prev === 0 ? featuredVendors.length - 1 : prev - 1));
    };

    const currentVendor = featuredVendors[currentVendorIndex];

    const renderStars = (rating: number): JSX.Element[] => {
        const stars: JSX.Element[] = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Icon key={i} name="Star" size={14} className="fill-current text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<Icon key="half" name="Star" size={14} className="fill-current text-yellow-400 opacity-50" />);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars?.push(<Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />);
        }

        return stars;
    };

    return (
        <section className="bg-surface py-8 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-8 text-center lg:mb-12">
                    <h2 className="text-text-primary mb-4 text-2xl font-bold lg:text-3xl">Featured Vendors</h2>
                    <p className="text-text-secondary mx-auto max-w-2xl">
                        Discover trusted sellers who consistently deliver quality products and exceptional customer service
                    </p>
                </div>

                {/* Vendors Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {featuredVendors?.map((vendor) => (
                        <div
                            key={vendor?.id}
                            className="group overflow-hidden rounded-lg border border-border bg-background transition-all duration-300 hover:shadow-lg"
                        >
                            {/* Vendor Banner */}
                            <div className="relative h-32 overflow-hidden">
                                <img
                                    src={vendor?.banner}
                                    alt={`${vendor?.name} banner`}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                                {/* Verified Badge */}
                                {vendor?.isVerified && (
                                    <div className="bg-success absolute top-3 right-3 flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium text-white">
                                        <Icon name="CheckCircle" size={12} />
                                        <span>Verified</span>
                                    </div>
                                )}
                            </div>

                            {/* Vendor Info */}
                            <div className="p-6">
                                {/* Logo and Basic Info */}
                                <div className="mb-4 flex items-start space-x-4">
                                    <div className="relative -mt-8">
                                        <div className="bg-surface h-16 w-16 overflow-hidden rounded-full border-4 border-background">
                                            <img src={vendor?.logo} alt={`${vendor?.name} logo`} className="h-full w-full object-cover" />
                                        </div>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-text-primary mb-1 truncate text-lg font-bold">{vendor?.name}</h3>
                                        <div className="mb-2 flex items-center space-x-2">
                                            <div className="flex items-center space-x-1">{renderStars(vendor?.rating)}</div>
                                            <span className="text-text-secondary text-sm">
                                                {vendor?.rating} ({vendor?.reviewCount})
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-text-secondary mb-4 line-clamp-3 text-sm">{vendor?.description}</p>

                                {/* Stats */}
                                <div className="mb-4 grid grid-cols-2 gap-4">
                                    <div className="bg-surface rounded p-2 text-center">
                                        <div className="text-text-primary font-semibold">{vendor?.productCount?.toLocaleString()}</div>
                                        <div className="text-text-secondary text-xs">Products</div>
                                    </div>
                                    <div className="bg-surface rounded p-2 text-center">
                                        <div className="text-text-primary font-semibold">{new Date()?.getFullYear() - vendor?.joinedYear}+ years</div>
                                        <div className="text-text-secondary text-xs">Experience</div>
                                    </div>
                                </div>

                                {/* Categories */}
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-1">
                                        {vendor?.categories?.slice(0, 3)?.map((category) => (
                                            <span key={category} className="text-text-secondary rounded-full bg-muted px-2 py-1 text-xs">
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Button */}
                                <Link href="/vendor-store-profile">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        icon="Store"
                                        iconPosition="left"
                                        className="transition-all duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                                    >
                                        Visit Store
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Vendors */}
                <div className="mt-8 text-center lg:mt-12">
                    <Link href="/vendor-store-profile">
                        <Button variant="outline" size="lg" iconName="ArrowRight" iconPosition="right">
                            Explore All Vendors
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default VendorSpotlight;
