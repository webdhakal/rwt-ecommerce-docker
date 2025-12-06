// src/types/Review.ts

export interface Review {
    id: number;
    productId: number;
    userId: number;
    rating: number; // 1 to 5
    comment: string;
    createdAt: string; // ISO date string
}

export interface ReviewProps {
    reviews: Review[];
    onSubmitReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
}
