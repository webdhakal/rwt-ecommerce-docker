import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { Select } from '@/shadcn/ui/select';

const ReviewsTab = ({ reviews, averageRating, ratingBreakdown, totalReviews }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' },
    { value: 'helpful', label: 'Most Helpful' }
  ];

  const ratingFilterOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const filteredReviews = reviews?.filter(review =>
    filterRating === 'all' || review?.rating?.toString() === filterRating
  );

  const ReviewCard = ({ review }) => (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={review?.avatar}
            alt={review?.customerName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-medium text-text-primary">{review?.customerName}</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={`${i < review?.rating
                        ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-secondary">{review?.date}</span>
              </div>
            </div>

            {review?.isVerified && (
              <div className="flex items-center gap-1 px-2 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
                <Icon name="Shield" size={12} />
                <span>Verified</span>
              </div>
            )}
          </div>

          <p className="text-text-secondary mb-4">{review?.comment}</p>

          {review?.images && review?.images?.length > 0 && (
            <div className="flex gap-2 mb-4">
              {review?.images?.map((image, index) => (
                <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                <Icon name="ThumbsUp" size={14} />
                <span>Helpful ({review?.helpfulCount})</span>
              </button>
              <button className="text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                Reply
              </button>
            </div>

            {review?.productName && (
              <div className="text-sm text-text-secondary">
                Product: {review?.productName}
              </div>
            )}
          </div>

          {review?.vendorResponse && (
            <div className="mt-4 pl-4 border-l-2 border-border">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Store" size={14} className="text-primary" />
                <span className="text-sm font-medium text-primary">Vendor Response</span>
                <span className="text-sm text-text-secondary">{review?.vendorResponse?.date}</span>
              </div>
              <p className="text-sm text-text-secondary">{review?.vendorResponse?.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-text-primary mb-2">{averageRating}</div>
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={20}
                    className={`${i < Math.floor(averageRating)
                      ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                  />
                ))}
              </div>
              <div className="text-sm text-text-secondary">{totalReviews} reviews</div>
            </div>

            <div className="space-y-2">
              {ratingBreakdown?.map((rating) => (
                <div key={rating?.stars} className="flex items-center gap-2">
                  <span className="text-sm text-text-secondary w-6">{rating?.stars}</span>
                  <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${rating?.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-text-secondary w-8">{rating?.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-3">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select
              options={ratingFilterOptions}
              value={filterRating}
              onChange={setFilterRating}
              placeholder="Filter by rating"
              className="w-full sm:w-48"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="w-full sm:w-48"
            />
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {filteredReviews?.length > 0 ? (
              filteredReviews?.map((review) => (
                <ReviewCard key={review?.id} review={review} />
              ))
            ) : (
              <div className="text-center py-12">
                <Icon name="MessageSquare" size={48} className="mx-auto text-text-secondary mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No reviews found</h3>
                <p className="text-text-secondary">
                  Try adjusting your filters or check back later for new reviews.
                </p>
              </div>
            )}
          </div>

          {/* Load More */}
          {filteredReviews?.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline">
                Load More Reviews
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsTab;