// src/types/Promotion.ts

export interface Promotion {
    id: number;
    title: string;
    discountPercentage: number;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
}

export interface PromotionProps {
    promotions: Promotion[];
    onApplyPromotion: (promotionId: number) => void;
}