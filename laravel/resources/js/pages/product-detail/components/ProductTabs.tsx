import Icon from '@/components/AppIcon';
import { Product } from '@/types/Product';
import { useState } from 'react';

const ProductTabs = ({ product }: { product: Product }) => {
    const [activeTab, setActiveTab] = useState('description');

    const tabs = [
        { id: 'description', label: 'Description', icon: 'FileText' },
        { id: 'specifications', label: 'Specifications', icon: 'List' },
        { id: 'shipping', label: 'Shipping', icon: 'Truck' },
        { id: 'reviews', label: 'Reviews', icon: 'Star' },
    ];

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Icon key={index} name="Star" size={16} className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-border'} />
        ));
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'description':
                return (
                    <div className="prose max-w-none">
                        <p className="text-text-secondary leading-relaxed whitespace-pre-line">{product?.description}</p>
                    </div>
                );

            case 'specifications':
                return (
                    <div className="space-y-4">
                        {Object.entries(product.specifications).map(([category, specs]) => (
                            <div key={category}>
                                <h4 className="text-text-primary mb-3 font-medium capitalize">{category?.replace(/([A-Z])/g, ' $1')?.trim()}</h4>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {Object.entries(specs)?.map(([key, value]) => (
                                        <div key={key} className="flex justify-between border-b border-border py-2">
                                            <span className="text-text-secondary capitalize">{key?.replace(/([A-Z])/g, ' $1')?.trim()}:</span>
                                            <span className="text-text-primary font-medium">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'shipping':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <h4 className="text-text-primary font-medium">Shipping Options</h4>
                                {product.shippingOptions.map((option, index) => (
                                    <div key={index} className="bg-surface flex items-center justify-between rounded-lg p-3">
                                        <div className="flex items-center space-x-3">
                                            <Icon name="Truck" size={16} className="text-text-secondary" />
                                            <div>
                                                <div className="text-text-primary font-medium">{option?.name}</div>
                                                <div className="text-text-secondary text-sm">{option?.duration}</div>
                                            </div>
                                        </div>
                                        <span className="text-text-primary font-medium">{option?.price === 0 ? 'Free' : `$${option?.price}`}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-text-primary font-medium">Return Policy</h4>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-2 p-3">
                                        <Icon name="RotateCcw" size={16} className="text-success mt-0.5" />
                                        <span className="text-text-secondary text-sm">30-day return window</span>
                                    </div>
                                    <div className="flex items-start space-x-2 p-3">
                                        <Icon name="Package" size={16} className="text-success mt-0.5" />
                                        <span className="text-text-secondary text-sm">Original packaging required</span>
                                    </div>
                                    <div className="flex items-start space-x-2 p-3">
                                        <Icon name="CreditCard" size={16} className="text-success mt-0.5" />
                                        <span className="text-text-secondary text-sm">Full refund available</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'reviews':
                return (
                    <div className="space-y-6">
                        {/* Review Summary */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="text-text-primary text-4xl font-bold">{product?.rating}</div>
                                    <div className="mt-1 flex items-center justify-center space-x-1">{renderStars(product?.rating)}</div>
                                    <div className="text-text-secondary mt-1 text-sm">Based on {product?.reviewCount} reviews</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1]?.map((stars) => {
                                    const count = product?.reviewDistribution?.[stars] || 0;
                                    const percentage = (count / product?.reviewCount) * 100;
                                    return (
                                        <div key={stars} className="flex items-center space-x-2">
                                            <span className="text-text-secondary w-8 text-sm">{stars}★</span>
                                            <div className="h-2 flex-1 rounded-full bg-border">
                                                <div className="bg-warning h-2 rounded-full" style={{ width: `${percentage}%` }} />
                                            </div>
                                            <span className="text-text-secondary w-8 text-sm">{count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* Individual Reviews */}
                        <div className="space-y-4">
                            {product?.reviews?.map((review) => (
                                <div key={review?.id} className="rounded-lg border border-border p-4">
                                    <div className="mb-3 flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                                                <span className="text-sm font-medium text-white">{review?.author?.charAt(0)?.toUpperCase()}</span>
                                            </div>
                                            <div>
                                                <div className="text-text-primary font-medium">{review?.author}</div>
                                                <div className="flex items-center space-x-1">{renderStars(review?.rating)}</div>
                                            </div>
                                        </div>
                                        <span className="text-text-secondary text-sm">{review?.date}</span>
                                    </div>

                                    <p className="text-text-secondary mb-3">{review?.comment}</p>

                                    {review?.images && review?.images?.length > 0 && (
                                        <div className="mb-3 flex space-x-2">
                                            {review?.images?.map((image, index) => (
                                                <div key={index} className="bg-surface h-16 w-16 overflow-hidden rounded-lg">
                                                    <img src={image} alt={`Review image ${index + 1}`} className="h-full w-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-4 text-sm">
                                        <button className="text-text-secondary flex items-center space-x-1 hover:text-primary">
                                            <Icon name="ThumbsUp" size={14} />
                                            <span>Helpful ({review?.helpfulCount})</span>
                                        </button>
                                        <button className="text-text-secondary hover:text-primary">Reply</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-background">
            {/* Tab Navigation */}
            <div className="border-b border-border">
                <div className="flex space-x-0 overflow-x-auto">
                    {tabs?.map((tab) => (
                        <button
                            key={tab?.id}
                            onClick={() => setActiveTab(tab?.id)}
                            className={`flex items-center space-x-2 border-b-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                                activeTab === tab?.id
                                    ? 'border-accent text-accent'
                                    : 'text-text-secondary hover:text-text-primary border-transparent hover:border-border'
                            }`}
                        >
                            <Icon name={tab?.icon} size={16} />
                            <span>{tab?.label}</span>
                            {tab?.id === 'reviews' && (
                                <span className="text-text-secondary rounded-full bg-muted px-2 py-0.5 text-xs">{product?.reviewCount}</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
            {/* Tab Content */}
            <div className="py-6">{renderTabContent()}</div>
        </div>
    );
};

export default ProductTabs;
