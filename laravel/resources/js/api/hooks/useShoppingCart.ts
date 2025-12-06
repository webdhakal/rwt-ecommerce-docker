import { AlternateApiResponse } from '@/interfaces/api.interface';
import { CartItem } from '@/types/Cart'; // Make sure to import your CartItem type
import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { getCartItems, removeCartItem, storeCart, updateCartItem } from '../endpoints/shopping-cart.api';

interface UseShoppingCartOptions {
    refetchOnMount?: boolean;
    cartId?: string;
}

export const useShoppingCart = (
    options: UseShoppingCartOptions = { refetchOnMount: false },
): UseQueryResult<AlternateApiResponse<CartItem[]>, Error> => {
    const { refetchOnMount, cartId, ...restOptions } = options;

    return useQuery<AlternateApiResponse<CartItem[]>, Error>({
        queryKey: ['cart', cartId],
        queryFn: () => getCartItems(cartId),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
        ...restOptions,
    });
};

export const useStoreCart = () => {
    const queryClient = useQueryClient();
    return useMutation<
        AlternateApiResponse<CartItem>,
        Error,
        {
            variant: string; // Add variant ID
            quantity: number; // Add quantity
            cartId?: string; // Keep cartId as optional
        }
    >({
        mutationFn: ({ variant, quantity, cartId }) => storeCart({ variant, quantity }, cartId), // Pass as object to match API
        onSuccess: (data, variables) => {
            // Invalidate and refetch the cart items query
            queryClient.invalidateQueries({
                queryKey: ['cart', variables.cartId], // Include cartId in query key
            });
        },
    });
};

export const useDeleteCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation<
        AlternateApiResponse<CartItem>,
        Error,
        {
            itemId: string;
            cartId?: string;
        }
    >({
        mutationFn: ({ itemId, cartId }) => {
            if (!cartId) {
                throw new Error('Cart ID is required');
            }
            return removeCartItem(cartId, itemId);
        },
        onSuccess: (data, variables) => {
            // Invalidate and refetch the cart items query
            queryClient.invalidateQueries({
                queryKey: ['cart', variables.cartId],
            });
        },
    });
};

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation<
        AlternateApiResponse<CartItem>,
        Error,
        {
            itemId: string;
            variant: string;
            quantity: number;
            cartId?: string;
        }
    >({
        mutationFn: ({ itemId, variant, quantity, cartId }) => {
            if (!cartId) {
                throw new Error('Cart ID is required');
            }
            return updateCartItem(cartId, itemId, { variant, quantity });
        },
        onSuccess: (data, variables) => {
            // Invalidate and refetch the cart items query
            queryClient.invalidateQueries({
                queryKey: ['cart', variables.cartId],
            });
        },
    });
};
