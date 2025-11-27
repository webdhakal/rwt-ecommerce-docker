import { AlternateApiResponse } from '@/interfaces/api.interface';
import api from '../clients/axiosClient';
import { AxiosRequestConfig } from 'axios';
import CartItem from '@/types/Cart';

export const getCartItems = async (cartId?: string): Promise<AlternateApiResponse<CartItem[]>> => {
  const config: AxiosRequestConfig = {
    headers: cartId ? { 'X-CART-ID': cartId } : undefined
  };
  const response = await api.get('/carts', config);
  
  return response.data as AlternateApiResponse<CartItem[]>;
};  

export interface CartItemRequest {
  variant: string;
  quantity: number;
}

export const storeCart = async (cartItem: CartItemRequest, cartId?: string): Promise<AlternateApiResponse<CartItem>> => {
  const config: AxiosRequestConfig = {
    headers: cartId ? { 'X-CART-ID': cartId } : undefined
  };
  const response = await api.post('/carts', cartItem, config);
  return response.data as AlternateApiResponse<CartItem>;
};

export const updateCartItem = async (
  cartId: string, 
  itemId: string,
  data: { variant: string; quantity: number }
): Promise<AlternateApiResponse<CartItem>> => {
  const config: AxiosRequestConfig = {
    headers: { 'X-CART-ID': cartId }
  };
  const response = await api.put(`/carts/${itemId}`, data, config);
  return response.data as AlternateApiResponse<CartItem>;
};

export const removeCartItem = async (cartId: string, itemId: string): Promise<AlternateApiResponse<CartItem>> => {
  const config: AxiosRequestConfig = {
    headers: { 'X-CART-ID': cartId }
  };
  const response = await api.delete(`/carts/${itemId}`, config);
  return response.data as AlternateApiResponse<CartItem>;
};