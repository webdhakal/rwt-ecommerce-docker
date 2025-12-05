import { AlternateApiResponse } from '@/interfaces/api.interface';
import api from '../clients/axiosClient';
import { Wishlist, WishlistItem } from '@/types/Wishlist'; 

export const getWishlist = async (cartId?: string): Promise<AlternateApiResponse<WishlistItem[]>> => {
  const response = await api.get('/wishlists');
  return response.data as AlternateApiResponse<WishlistItem[]>;
};  

export const storeWishlist = async (product:string): Promise<AlternateApiResponse<WishlistItem[]>> => {
 
  const response = await api.post('/wishlists', product);
  return response.data as AlternateApiResponse<WishlistItem[]>;
};

export const deleteWishlist = async(id:string): Promise<AlternateApiResponse<WishlistItem[]>> => {
  const response = await api.delete(`/wishlists/${id}`);
  return response.data as AlternateApiResponse<WishlistItem[]>;
};

export const deleteWishlistProduct = async(): Promise<AlternateApiResponse<WishlistItem[]>> => {
  const response = await api.delete(`/clear-wishlist`);
  return response.data as AlternateApiResponse<WishlistItem[]>;
};