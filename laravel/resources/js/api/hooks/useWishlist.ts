import { useQuery, useMutation } from '@tanstack/react-query';
import { getWishlist, storeWishlist, deleteWishlist, deleteWishlistProduct } from '../endpoints/wishlist.api';
import { WishlistItem, WishlistResponse } from '@/types/Wishlist';

export const getWishlistData = () => {
  return useQuery<WishlistResponse, Error>({
    queryKey: ['wishlist'],
    queryFn: async () => {
          return await getWishlist();
    },
    
  });
};

export const storeWishlistData = (product : string) => {
  return useMutation<WishlistItem[], Error>({
    mutationFn: async (product: string) => {
      return await storeWishlist(product);
    },
  });
};


export const deleteWishlistData = (id : string) => {
  return useMutation<WishlistItem[], Error>({
    mutationFn: async (id: string) => {
      return await deleteWishlist(id);
    },
  });
};

export const deleteWishlistProductData = () => {
  return useMutation<WishlistItem[], Error>({
    mutationFn: async () => {
      return await deleteWishlistProduct();
    },
  });
};