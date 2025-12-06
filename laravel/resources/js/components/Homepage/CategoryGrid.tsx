import Icon from '@/components/Common/AppIcon';
import { Link } from '@inertiajs/react';
import React from 'react';

interface CategoryItem {
    id: number;
    name: string;
    description: string;
    image: string;
    icon: IconProps['name'];
    productCount: string;
    color: string;
}

const CategoryGrid: React.FC = () => {
    const categories: CategoryItem[] = [
        {
            id: 1,
            name: 'Electronics',
            description: 'Smartphones, laptops & gadgets',
            image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
            icon: 'Smartphone',
            productCount: '2,500+',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            id: 2,
            name: 'Fashion',
            description: 'Clothing, shoes & accessories',
            image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
            icon: 'Shirt',
            productCount: '3,200+',
            color: 'from-pink-500 to-rose-500',
        },
        {
            id: 3,
            name: 'Home & Garden',
            description: 'Furniture, decor & tools',
            image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
            icon: 'Home',
            productCount: '1,800+',
            color: 'from-green-500 to-emerald-500',
        },
        {
            id: 4,
            name: 'Sports & Fitness',
            description: 'Equipment & activewear',
            image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
            icon: 'Dumbbell',
            productCount: '950+',
            color: 'from-orange-500 to-red-500',
        },
        {
            id: 5,
            name: 'Books & Media',
            description: 'Books, movies & music',
            image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
            icon: 'Book',
            productCount: '4,100+',
            color: 'from-purple-500 to-indigo-500',
        },
        {
            id: 6,
            name: 'Health & Beauty',
            description: 'Skincare, makeup & wellness',
            image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
            icon: 'Heart',
            productCount: '1,600+',
            color: 'from-teal-500 to-cyan-500',
        },
    ];

    return (
        <section className="py-8 lg:py-12">
            <div className="mb-8">
                <h2 className="text-text-primary mb-2 text-2xl font-bold lg:text-3xl">Shop by Category</h2>
                <p className="text-text-secondary">Discover products across our most popular categories</p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
                {categories?.map((category) => (
                    <Link
                        key={category?.id}
                        href={`/product-listing-category-browse?category=${encodeURIComponent(category?.name)}`}
                        className="group block"
                    >
                        <div className="bg-surface relative overflow-hidden rounded-lg border border-border transition-all duration-300 group-hover:scale-105 hover:shadow-lg">
                            {/* Category Image */}
                            <div className="relative h-32 overflow-hidden sm:h-40 lg:h-32">
                                {/* <img
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                /> */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-t ${category?.color} opacity-20 transition-opacity duration-300 group-hover:opacity-30`}
                                ></div>

                                {/* Icon Overlay */}
                                <div className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
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
                    href="/product-listing-category-browse"
                    className="inline-flex items-center space-x-2 font-medium text-accent transition-colors duration-200 hover:text-accent/80"
                >
                    <span>View All Categories</span>
                    <Icon name="ArrowRight" size={16} />
                </Link>
            </div>
        </section>
    );
};

export default CategoryGrid;
