import { LocationResponse } from '@/types/Country';
import api from '../clients/axiosClient';

export const getsShippingCharge = async (stateId: number | number[]): Promise<LocationResponse> => {
  const states = Array.isArray(stateId) ? stateId : [stateId];
  const params = new URLSearchParams();
  states.forEach((id, index) => {
    // Use direct string concatenation to avoid URL encoding
    params.append(`filters[${index}][state]`, id.toString());
  });

  // Manually construct the query string to match the exact format
  const queryString = Array.from(params.entries())
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const response = await api.get(`/public/shipping-charges?${queryString}`);
  return response.data as LocationResponse;
};