import { useCategories } from '@/api/hooks/useCategories';
import Icon from '@/components/AppIcon';
import { Category } from '@/types/MockData';
import { Link } from '@inertiajs/react';
import CategoryGridSkeleton from './skeletons/CategoryGridSkeleton';

const CategoryGrid = () => {
    const { data: categories = [], isLoading } = useCategories(
        { params: { limit: 6 } }, // 👈 pass params
        { refetchOnMount: true },
    );

    const categoriesData = categories?.payload?.data;
    if (isLoading) return <CategoryGridSkeleton />;
    return (
        <section className="py-8 lg:py-12">
            <div className="mb-8">
                <h2 className="text-text-primary mb-2 text-2xl font-bold lg:text-3xl">Shop by Category</h2>
                <p className="text-text-secondary">Discover products across our most popular categories</p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
                {categoriesData?.map((category: Category) => (
                    <Link
                        key={category?.id}
                        href={`/product-listing?category=${encodeURIComponent(category?.name)}`}
                        className="group block"
                    >
                        <div className="bg-surface relative overflow-hidden rounded-lg border border-border transition-all duration-300 group-hover:scale-105 hover:shadow-lg">
                            {/* Category Image */}
                            <div className="relative h-32 overflow-hidden sm:h-40 lg:h-32">
                                <img
                                    src={category?.image}
                                    alt={category?.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div
                                    className={`absolute inset-0 bg-gradient-to-t ${category?.color} opacity-20 transition-opacity duration-300 group-hover:opacity-30`}
                                ></div>

                                {/* Icon Overlay */}
                                <div className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-background backdrop-blur-sm">
                                    <Icon name={category?.icon} size={16} className="text-primary" />
                                </div>
                            </div>

                            {/* Category Info */}
                            <div className="p-3 lg:p-4">
                                <h3 className="text-text-primary mb-1 text-sm font-semibold transition-colors duration-200 group-hover:text-accent lg:text-base">
                                    {category?.name}
                                </h3>
                                <p className="text-text-secondary mb-2 line-clamp-2 text-xs lg:text-sm">{category?.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-accent">{category?.productCount} items</span>
                                    <Icon
                                        name="ArrowRight"
                                        size={14}
                                        className="text-text-secondary transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
                                    />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* View All Categories Link */}
            <div className="mt-8 text-center">
                <Link
                    href={route('product-listing')}
                    className="inline-flex items-center space-x-2 font-medium text-foreground transition-colors duration-200 hover:text-foreground/80"
                >
                    <span>View All Categories</span>
                    <Icon name="ArrowRight" size={16} />
                </Link>
            </div>
        </section>
    );
};

export default CategoryGrid;
