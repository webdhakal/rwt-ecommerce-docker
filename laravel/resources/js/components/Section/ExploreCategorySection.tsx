import { randomImage } from '@/Libs/Helper';
import { Categories } from '@/MOCK_DATA';
import { cn } from '@/shadcn/lib/utils';
import { Badge } from '@/shadcn/ui/badge';
import { AnimatedSection } from '../AnimatedSection';
import CategorySlider from '../Sliders/CategorySlider';

const ExploreCategorySection = () => {
    return (
        <AnimatedSection className={cn('my-y container mt-12 px-4 md:px-8')}>
            <div className="hidden items-center gap-12 lg:flex">
                <div className="relative aspect-[4/3] w-1/2 overflow-hidden rounded-xl shadow-md">
                    <img
                        src={randomImage(1240)}
                        alt="Featured category"
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <Badge
                        variant="secondary"
                        className="absolute top-4 right-4 rounded-lg bg-primary/80 px-3 py-1 text-sm font-medium text-white shadow-lg"
                    >
                        50% Off
                    </Badge>
                </div>

                <div className="w-1/2 space-y-6">
                    <div>
                        <h2 className="text-7xl leading-tight font-extrabold text-gray-900">Explore</h2>
                        <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-7xl leading-tight font-extrabold text-transparent">
                            Categories
                        </h2>
                        <p className="font-secondary mt-4 text-lg leading-relaxed text-gray-600">
                            Discover our wide range of products across various categories. From electronics to fashion, we've got you covered.
                        </p>
                    </div>
                    <CategorySlider categoryData={Categories} />
                </div>
            </div>
            <div className="mt-10 lg:hidden">
                <CategorySlider categoryData={Categories} />
            </div>
        </AnimatedSection>
    );
};

export default ExploreCategorySection;
