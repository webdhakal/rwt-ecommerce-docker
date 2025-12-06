import Icon from '@/components/common/AppIcon';
import Button from '@/components/ui/Button';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const HeroBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const bannerData = [
        {
            id: 1,
            title: 'Summer Sale Extravaganza',
            subtitle: 'Up to 70% off on electronics and gadgets',
            description: 'Discover amazing deals on smartphones, laptops, and smart home devices from top brands.',
            image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            ctaText: 'Shop Now',
            ctaLink: '/product-listing-category-browse?category=Electronics',
            bgColor: 'from-blue-600 to-purple-700',
        },
        {
            id: 2,
            title: 'Fashion Forward',
            subtitle: 'New arrivals from premium brands',
            description: 'Explore the latest trends in clothing, accessories, and footwear for every style.',
            image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            ctaText: 'Explore Collection',
            ctaLink: '/product-listing-category-browse?category=Fashion',
            bgColor: 'from-pink-500 to-rose-600',
        },
        {
            id: 3,
            title: 'Home & Living',
            subtitle: 'Transform your space with style',
            description: 'Find furniture, decor, and home essentials to create your perfect living environment.',
            image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            ctaText: 'Shop Home',
            ctaLink: '/product-listing-category-browse?category=Home',
            bgColor: 'from-green-500 to-teal-600',
        },
    ];

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % bannerData?.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, bannerData?.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + bannerData?.length) % bannerData?.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % bannerData?.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    return (
        <div className="bg-surface relative h-64 w-full overflow-hidden rounded-lg sm:h-80 lg:h-96 xl:h-[500px]">
            {/* Banner Slides */}
            <div className="relative h-full w-full">
                {bannerData?.map((banner, index) => (
                    <div
                        key={banner?.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-r ${banner?.bgColor} opacity-90`}></div>
                        <img src={banner?.image} alt={banner?.title} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/30"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-white">
                            <div className="mx-auto max-w-4xl">
                                <h1 className="mb-2 text-2xl font-bold sm:mb-4 sm:text-3xl lg:text-5xl xl:text-6xl">{banner?.title}</h1>
                                <p className="mb-2 text-lg opacity-90 sm:mb-4 sm:text-xl lg:text-2xl">{banner?.subtitle}</p>
                                <p className="mx-auto mb-6 max-w-2xl text-sm opacity-80 sm:mb-8 sm:text-base lg:text-lg">{banner?.description}</p>
                                <Link href={banner?.ctaLink}>
                                    <Button variant="default" size="lg" className="bg-white px-8 py-3 font-semibold text-primary hover:bg-gray-100">
                                        {banner?.ctaText}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30"
                aria-label="Previous slide"
            >
                <Icon name="ChevronLeft" size={20} />
            </button>
            <button
                onClick={goToNext}
                className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30"
                aria-label="Next slide"
            >
                <Icon name="ChevronRight" size={20} />
            </button>
            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
                {bannerData?.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-3 w-3 rounded-full transition-all duration-200 ${
                            index === currentSlide ? 'scale-110 bg-white' : 'bg-white/50 hover:bg-white/70'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
            {/* Auto-play indicator */}
            <div className="absolute top-4 right-4">
                <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30"
                    aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
                >
                    <Icon name={isAutoPlaying ? 'Pause' : 'Play'} size={14} />
                </button>
            </div>
        </div>
    );
};

export default HeroBanner;
