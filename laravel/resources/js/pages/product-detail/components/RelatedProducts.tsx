import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { Product } from '@/types/Product';
import { Link } from '@inertiajs/react';

const RelatedProducts = ({ products }: { products: Product[] }) => {
    const renderStars = (rating: number) =>
        Array.from({ length: 5 }, (_, i) => (
            <Icon key={i} name="Star" size={14} className={i < Math.floor(rating) ? 'text-warning fill-current' : 'text-border'} />
        ));

    return (
        <section className="w-full bg-background py-8">
            <h2 className="text-text-primary mb-6 text-xl font-bold lg:text-2xl">Related Products</h2>

            <div className="overflow-x-auto">
                <div className="flex gap-4 pb-4">
                    {products.map((product) => (
                        <div key={product.id} className="w-64 flex-shrink-0">
                            <div className="group bg-surface flex h-full flex-col overflow-hidden rounded-xl border border-border transition-all duration-300 hover:shadow-lg">
                                <Link href={route('product-detail', product.slug)}>
                                    <div className="relative aspect-square overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />

                                        <button className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 hover:bg-background">
                                            <Icon name="Heart" size={16} className="text-text-secondary hover:text-error" />
                                        </button>

                                        {product.discount && (
                                            <div className="bg-error text-error-foreground absolute top-2 left-2 rounded-md px-2 py-1 text-xs font-semibold">
                                                -{product.discount}%
                                            </div>
                                        )}
                                    </div>
                                </Link>

                                <div className="flex flex-1 flex-col gap-2 p-3">
                                    <Link
                                        href={route('product-detail', product.slug)}
                                        className="text-text-primary line-clamp-2 text-sm font-medium hover:text-accent"
                                    >
                                        {product.name}
                                    </Link>
                                    <div className="text-text-secondary text-xs">by {product.vendor || 'Unknown'}</div>

                                    <div className="flex items-center gap-1">
                                        {renderStars(product.rating)}
                                        <span className="text-text-secondary ml-1 text-xs">({product.reviewCount || 0})</span>
                                    </div>

                                    <div className="mt-1 flex items-center gap-2">
                                        <span className="text-text-primary text-lg font-bold">${product.price}</span>
                                        {product.originalPrice && (
                                            <span className="text-text-secondary text-sm line-through">${product.originalPrice}</span>
                                        )}
                                    </div>

                                    <Button variant="outline" size="sm" iconName="ShoppingCart" iconPosition="left" className="mt-auto">
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedProducts;
