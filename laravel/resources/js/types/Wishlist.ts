// src/types/Wishlist.ts
import { Product } from "./Product";

export interface WishlistItem {
  id: string;
  product: Product;
  created_at: string;
}

export interface Wishlist {
    items: WishlistItem[];
}

export interface WishlistProps {
    wishlist: Wishlist;
    onRemoveFromWishlist: (productId: number) => void;
}


export interface WishlistResponse {
  status: string;
  method: string;
  message: string;
  payload: {
    id: string;
    items: WishlistItem[];
    categories: any[];
    created_at: string;
  };
}