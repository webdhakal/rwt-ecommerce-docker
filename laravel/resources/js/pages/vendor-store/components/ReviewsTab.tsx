import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { Select } from '@/shadcn/ui/select';
import { useState } from 'react';

const ReviewsTab = ({ reviews, averageRating, ratingBreakdown, totalReviews }) => {
    const [sortBy, setSortBy] = useState('newest');
    const [filterRating, setFilterRating] = useState('all');

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'highest', label: 'Highest Rating' },
        { value: 'lowest', label: 'Lowest Rating' },
        { value: 'helpful', label: 'Most Helpful' },
    ];

    const ratingFilterOptions = [
        { value: 'all', label: 'All Ratings' },
        { value: '5', label: '5 Stars' },
        { value: '4', label: '4 Stars' },
        { value: '3', label: '3 Stars' },
        { value: '2', label: '2 Stars' },
        { value: '1', label: '1 Star' },
    ];

    const filteredReviews = reviews?.filter((review) => filterRating === 'all' || review?.rating?.toString() === filterRating);

    const ReviewCard = ({ review }) => (
        <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-4">
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                    <img src={review?.avatar} alt={review?.customerName} className="h-full w-full object-cover" />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center justify-between">
                        <div>
                            <h4 className="text-text-primary font-medium">{review?.customerName}</h4>
                            <div className="mt-1 flex items-center gap-2">
                                <div className="flex items-center">
                                    {[...Array(5)]?.map((_, i) => (
                                        <Icon
                                            key={i}
                                            name="Star"
                                            size={14}
                                            className={`${i < review?.rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-text-secondary text-sm">{review?.date}</span>
                            </div>
                        </div>

                        {review?.isVerified && (
                            <div className="bg-success/10 text-success flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium">
                                <Icon name="Shield" size={12} />
                                <span>Verified</span>
                            </div>
                        )}
                    </div>

                    <p className="text-text-secondary mb-4">{review?.comment}</p>

                    {review?.images && review?.images?.length > 0 && (
                        <div className="mb-4 flex gap-2">
                            {review?.images?.map((image, index) => (
                                <div key={index} className="h-16 w-16 overflow-hidden rounded-lg">
                                    <img src={image} alt={`Review image ${index + 1}`} className="h-full w-full object-cover" />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button className="text-text-secondary flex items-center gap-1 text-sm transition-colors duration-200 hover:text-primary">
                                <Icon name="ThumbsUp" size={14} />
                                <span>Helpful ({review?.helpfulCount})</span>
                            </button>
                            <button className="text-text-secondary text-sm transition-colors duration-200 hover:text-primary">Reply</button>
                        </div>

                        {review?.productName && <div className="text-text-secondary text-sm">Product: {review?.productName}</div>}
                    </div>

                    {review?.vendorResponse && (
                        <div className="mt-4 border-l-2 border-border pl-4">
                            <div className="mb-2 flex items-center gap-2">
                                <Icon name="Store" size={14} className="text-primary" />
                                <span className="text-sm font-medium text-primary">Vendor Response</span>
                                <span className="text-text-secondary text-sm">{review?.vendorResponse?.date}</span>
                            </div>
                            <p className="text-text-secondary text-sm">{review?.vendorResponse?.message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Rating Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
                        <div className="mb-6 text-center">
                            <div className="text-text-primary mb-2 text-4xl font-bold">{averageRating}</div>
                            <div className="mb-2 flex items-center justify-center">
                                {[...Array(5)]?.map((_, i) => (
                                    <Icon
                                        key={i}
                                        name="Star"
                                        size={20}
                                        className={`${i < Math.floor(averageRating) ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <div className="text-text-secondary text-sm">{totalReviews} reviews</div>
                        </div>

                        <div className="space-y-2">
                            {ratingBreakdown?.map((rating) => (
                                <div key={rating?.stars} className="flex items-center gap-2">
                                    <span className="text-text-secondary w-6 text-sm">{rating?.stars}</span>
                                    <Icon name="Star" size={12} className="fill-current text-yellow-400" />
                                    <div className="h-2 flex-1 rounded-full bg-muted">
                                        <div className="h-2 rounded-full bg-yellow-400" style={{ width: `${rating?.percentage}%` }} />
                                    </div>
                                    <span className="text-text-secondary w-8 text-sm">{rating?.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-3">
                    {/* Filters */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                        <Select
                            options={ratingFilterOptions}
                            value={filterRating}
                            onChange={setFilterRating}
                            placeholder="Filter by rating"
                            className="w-full sm:w-48"
                        />
                        <Select options={sortOptions} value={sortBy} onChange={setSortBy} placeholder="Sort by" className="w-full sm:w-48" />
                    </div>

                    {/* Reviews */}
                    <div className="space-y-6">
                        {filteredReviews?.length > 0 ? (
                            filteredReviews?.map((review) => <ReviewCard key={review?.id} review={review} />)
                        ) : (
                            <div className="py-12 text-center">
                                <Icon name="MessageSquare" size={48} className="text-text-secondary mx-auto mb-4" />
                                <h3 className="text-text-primary mb-2 text-lg font-medium">No reviews found</h3>
                                <p className="text-text-secondary">Try adjusting your filters or check back later for new reviews.</p>
                            </div>
                        )}
                    </div>

                    {/* Load More */}
                    {filteredReviews?.length > 0 && (
                        <div className="mt-8 text-center">
                            <Button variant="outline">Load More Reviews</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewsTab;
