import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { useBanner }  from '@/api/hooks/useSite-Setting';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [bannerData, setBannerData] = useState([]);

  const {data: bannersData} = useBanner(); 
  

  useEffect(() => {
    if (bannersData?.banners) {
      setBannerData(bannersData?.banners);
    }
  }, [bannersData]);

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
    <div className="relative w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] overflow-hidden rounded-lg bg-surface">
      {/* Banner Slides */}
      <div className="relative w-full h-full">
        {bannerData.map((banner, index) => (
          <div
            key={banner?.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${banner?.bgColor} opacity-90`}></div>
            <img
              src={banner?.files?.url}
              alt={banner?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4">
                  {banner?.name}
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-4 opacity-90">
                  {banner?.sub_title}
                </p>
                <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 opacity-80 max-w-2xl mx-auto">
                  {banner?.description}
                </p>
                <Link href={banner?.link} className='block'>
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-background cursor-pointer text-primary hover:bg-secondary/90 font-semibold px-8 py-3"
                  >
                    Shop Now
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
        className="absolute left-4 bottom-0 md:top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
        aria-label="Previous slide"
      >
        <Icon name="ChevronLeft" size={20} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 bottom-0 md:top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
        aria-label="Next slide"
      >
        <Icon name="ChevronRight" size={20} />
      </button>

      {/* Slide Indicators */}
      <div className="hidden md:flex absolute bottom-4 left-1/2 transform -translate-x-1/2 space-x-2">
        {bannerData?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide
              ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
          aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          <Icon name={isAutoPlaying ? 'Pause' : 'Play'} size={14} />
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;