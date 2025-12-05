import { useMutation } from '@tanstack/react-query';
import { storeOrder } from '../endpoints/orders.api';
import { OrderSend } from '@/types/Order';
import { AlternateApiResponse } from '@/interfaces/api.interface';

export const useOrder = () => {
  const createOrderMutation = useMutation<
    AlternateApiResponse<OrderSend>,
    Error,
    OrderSend
  >({
    mutationFn: (orderData: OrderSend) => storeOrder(orderData),
    onSuccess: (data) => {
      // Handle successful order creation
      console.log('Order created successfully:', data);
    },
    onError: (error) => {
      // Handle error
      console.error('Error creating order:', error);
    },
  });

  return {
    createOrder: createOrderMutation.mutate,
    isCreating: createOrderMutation.isPending,
    isSuccess: createOrderMutation.isSuccess,
    error: createOrderMutation.error,
    data: createOrderMutation.data,
  };
};