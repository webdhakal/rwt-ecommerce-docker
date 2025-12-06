import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { Link } from '@inertiajs/react';
import { useRef, useState } from 'react';
import ProductCard from './ProductCard';

const ProductSection = ({ title, subtitle, products, viewAllLink, sectionId }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    const itemsPerView = {
        mobile: 2,
        tablet: 3,
        desktop: 4,
        large: 5,
    };

    const canScrollLeft = currentIndex > 0;
    const canScrollRight = currentIndex < products?.length - itemsPerView?.mobile;

    const scrollLeft = () => {
        if (canScrollLeft) {
            setCurrentIndex((prev) => Math.max(0, prev - 1));
        }
    };

    const scrollRight = () => {
        if (canScrollRight) {
            setCurrentIndex((prev) => Math.min(products?.length - itemsPerView?.mobile, prev + 1));
        }
    };

    const scrollToIndex = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section className="py-8 lg:py-12">
            {/* Section Header */}
            <div className="mb-6 flex items-center justify-between lg:mb-8">
                <div>
                    <h2 className="text-text-primary mb-2 text-2xl font-bold lg:text-3xl">{title}</h2>
                    {subtitle && <p className="text-text-secondary">{subtitle}</p>}
                </div>

                {/* Desktop Navigation */}
                <div className="hidden items-center space-x-4 lg:flex">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={scrollLeft}
                            disabled={!canScrollLeft}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors duration-200 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Previous products"
                        >
                            <Icon name="ChevronLeft" size={18} />
                        </button>
                        <button
                            onClick={scrollRight}
                            disabled={!canScrollRight}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors duration-200 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Next products"
                        >
                            <Icon name="ChevronRight" size={18} />
                        </button>
                    </div>

                    {viewAllLink && (
                        <Link href={viewAllLink}>
                            <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
                                View All
                            </Button>
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
                        className="scrollbar-hide flex space-x-4 overflow-x-auto pb-4"
                        style={{ scrollSnapType: 'x mandatory' }}
                    >
                        {products?.map((product) => (
                            <div key={product?.id} className="w-48 flex-shrink-0 sm:w-56" style={{ scrollSnapAlign: 'start' }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {/* Mobile Scroll Indicators */}
                    <div className="mt-4 flex justify-center space-x-2">
                        {Array.from({ length: Math.ceil(products?.length / itemsPerView?.mobile) })?.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToIndex(index * itemsPerView?.mobile)}
                                className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                                    Math.floor(currentIndex / itemsPerView?.mobile) === index ? 'bg-accent' : 'bg-border'
                                }`}
                                aria-label={`Go to page ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden gap-6 lg:grid lg:grid-cols-4 xl:grid-cols-5">
                    {products?.slice(0, 10)?.map((product) => (
                        <ProductCard key={product?.id} product={product} />
                    ))}
                </div>
            </div>
            {/* Mobile View All Button */}
            {viewAllLink && (
                <div className="mt-6 text-center lg:hidden">
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
