import Icon from '@/components/AppIcon';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

import { Select } from '@/shadcn/ui/select';

const ProductsTab = ({ products, categories }) => {
    const [sortBy, setSortBy] = useState('newest');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    console.log(viewMode);

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'popular', label: 'Most Popular' },
        { value: 'rating', label: 'Highest Rated' },
    ];

    const categoryOptions = [{ value: 'all', label: 'All Categories' }, ...categories?.map((cat) => ({ value: cat?.id, label: cat?.name }))];

    const filteredProducts = products?.filter((product) => selectedCategory === 'all' || product?.categoryId === selectedCategory);

    const ProductCard = ({ product }) => (
        <div className="group overflow-hidden rounded-lg border border-border bg-card transition-shadow duration-200 hover:shadow-lg">
            <Link href={route('product-detail', product?.id)} className="block">
                <div className="relative aspect-square overflow-hidden">
                    <img
                        src={product?.image}
                        alt={product?.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product?.discount && (
                        <div className="bg-error absolute top-2 left-2 rounded px-2 py-1 text-xs font-medium text-white">-{product?.discount}%</div>
                    )}
                    {product?.isNew && <div className="bg-success absolute top-2 right-2 rounded px-2 py-1 text-xs font-medium text-white">New</div>}
                </div>

                <div className="p-4">
                    <h3 className="text-text-primary mb-2 line-clamp-2 font-medium transition-colors duration-200 group-hover:text-primary">
                        {product?.name}
                    </h3>

                    <div className="mb-2 flex items-center gap-1">
                        <div className="flex items-center">
                            {[...Array(5)]?.map((_, i) => (
                                <Icon
                                    key={i}
                                    name="Star"
                                    size={14}
                                    className={`${i < Math.floor(product?.rating) ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <span className="text-text-secondary text-sm">({product?.reviewCount})</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-primary">${product?.price}</span>
                            {product?.originalPrice && <span className="text-text-secondary text-sm line-through">${product?.originalPrice}</span>}
                        </div>
                        <div className="text-text-secondary flex items-center gap-1 text-xs">
                            <Icon name="Package" size={12} />
                            <span>{product?.stock} left</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Filters and Controls */}
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                    <Select
                        options={categoryOptions}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        placeholder="All Categories"
                        className="w-48"
                    />
                    <Select options={sortOptions} value={sortBy} onChange={setSortBy} placeholder="Sort by" className="w-48" />
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-text-secondary text-sm">{filteredProducts?.length} products</span>

                    <div className="flex items-center rounded-lg border border-border">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 ${
                                viewMode === 'grid' ? 'rounded-tl-lg rounded-bl-lg bg-secondary text-primary' : 'text-secondary hover:text-primary'
                            } transition-colors duration-200`}
                        >
                            <Icon name="Grid3X3" size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 ${
                                viewMode === 'list' ? 'rounded-tr-lg rounded-br-lg bg-secondary text-primary' : 'text-secondary hover:text-primary'
                            } transition-colors duration-200`}
                        >
                            <Icon name="List" size={16} />
                        </button>
                    </div>
                </div>
            </div>
            {/* Products Grid */}
            {filteredProducts?.length > 0 ? (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                    {filteredProducts?.map((product) => (
                        <ProductCard key={product?.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center">
                    <Icon name="Package" size={48} className="text-text-secondary mx-auto mb-4" />
                    <h3 className="text-text-primary mb-2 text-lg font-medium">No products found</h3>
                    <p className="text-text-secondary">Try adjusting your filters or check back later for new products.</p>
                </div>
            )}
        </div>
    );
};

export default ProductsTab;
