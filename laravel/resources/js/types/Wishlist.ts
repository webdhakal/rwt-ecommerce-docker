// src/types/Wishlist.ts

export interface WishlistItem {
    productId: number;
    addedAt: string; // ISO date string
}

export interface Wishlist {
    items: WishlistItem[];
}

export interface WishlistProps {
    wishlist: Wishlist;
    onRemoveFromWishlist: (productId: number) => void;
}
