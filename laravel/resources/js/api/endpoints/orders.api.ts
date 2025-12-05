import { AlternateApiResponse } from '@/interfaces/api.interface';
import api from '../clients/axiosClient';
import { OrderSend } from '@/types/Order';

export const storeOrder = async (data: OrderSend): Promise<AlternateApiResponse<OrderSend>> => {
  const response = await api.post('/orders', data);
  return response.data as AlternateApiResponse<OrderSend>;
};