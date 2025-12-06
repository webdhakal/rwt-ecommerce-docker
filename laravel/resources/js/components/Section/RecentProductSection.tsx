import useHighlight from '@/hooks/useProductHighlight';
import { cn } from '@/shadcn/lib/utils';
import { ProductType } from '@/types/Product';
import DefaultSectionTitle from '@/utils/DefaultSectionTitle';
import { usePage } from '@inertiajs/react';
import { AnimatedSection } from '../AnimatedSection';
import ProductCard from '../Cards/ProductCard';

const RecentProductSection = () => {
    console.log(usePage().props);

    const recentlyViewed = useHighlight<ProductType>('recently_viewed');

    return (
        <AnimatedSection className={cn('container my-4')}>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <DefaultSectionTitle title="Recently Viewed" subtitle="Discover your browsing history and continue shopping" showButton={false} />
            </div>

            <div className="responsive-product-grid">
                {recentlyViewed?.map((item, index) => (
                    <ProductCard
                        product={item}
                        key={`${'recent-product' + index}`}
                        className={cn('duration-500')}
                        style={{ animationDelay: `${index * 300}ms` }}
                    />
                ))}
            </div>
        </AnimatedSection>
    );
};

export default RecentProductSection;
