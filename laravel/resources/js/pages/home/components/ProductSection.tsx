import React, { useState, useRef } from 'react';
import ProductCard from './ProductCard';
import { Link } from '@inertiajs/react';
import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';

const ProductSection = ({ title, subtitle, products, viewAllLink, sectionId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const itemsPerView = {
    mobile: 2,
    tablet: 3,
    desktop: 4,
    large: 5
  };

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < products?.length - itemsPerView?.mobile;

  const scrollLeft = () => {
    if (canScrollLeft) {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (canScrollRight) {
      setCurrentIndex(prev => Math.min(products?.length - itemsPerView?.mobile, prev + 1));
    }
  };

  const scrollToIndex = (index) => {
    setCurrentIndex(index);
  };

  // Desktop carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const itemsPerSlide = 5; // Number of products to show per slide on desktop
  const totalSlides = Math.ceil(products?.length / itemsPerSlide) || 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Calculate the transform value based on current slide
  const getTransformValue = () => {
    if (slidesContainerRef.current) {
      const containerWidth = slidesContainerRef.current.offsetWidth;
      return `translateX(-${currentSlide * 100}%)`;
    }
    return 'translateX(0)';
  };

  return (
    <section className="py-8 lg:py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-text-secondary">
              {subtitle}
            </p>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <Icon name="ChevronLeft" size={18} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next slide"
            >
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>

          {viewAllLink && (
            <Link 
              to={viewAllLink} 
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View All
              <Icon name="ChevronRight" size={16} className="ml-1" />
            </Link>
          )}
        </div>
      </div>
      
      {/* Products Grid/Carousel */}
      <div className="relative">
        {/* Mobile Horizontal Scroll */}
        <div className="lg:hidden">
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {products?.map((product) => (
              <div
                key={product?.id}
                className="flex-shrink-0 w-48 sm:w-56"
                style={{ scrollSnapAlign: 'start' }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Mobile Scroll Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: Math.ceil(products?.length / itemsPerView?.mobile) })?.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index * itemsPerView?.mobile)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${Math.floor(currentIndex / itemsPerView?.mobile) === index
                  ? 'bg-accent' : 'bg-border'
                  }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:block">
        <div className="relative">
          <div 
            ref={slidesContainerRef}
            className="relative overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: getTransformValue() }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div 
                  key={slideIndex} 
                  className="w-full flex-shrink-0 grid grid-cols-5 gap-6"
                >
                  {products
                    ?.slice(
                      slideIndex * itemsPerSlide,
                      (slideIndex + 1) * itemsPerSlide
                    )
                    ?.map((product) => (
                      <div key={product.id} className="group">
                        <ProductCard product={product} showQuickAdd={true} />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Keep pagination dots */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      </div>


      {/* Mobile View All Button */}
      {viewAllLink && (
        <div className="lg:hidden text-center mt-6">
          <Link to={viewAllLink}>
            <Button variant="outline" iconName="ArrowRight" iconPosition="right">
              View All {title}
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProductSection;