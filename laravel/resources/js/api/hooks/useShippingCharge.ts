import { useQuery } from '@tanstack/react-query';
import { getsShippingCharge } from '../endpoints/shipping-charge.api';
import { LocationResponse } from '@/types/Country';

export const useShippingCharge = (stateId: number | number[]) => {
  return useQuery<LocationResponse, Error>({
    queryKey: ['shippingCharge', stateId],
    queryFn: async () => {
      if (!stateId || (Array.isArray(stateId) && stateId.length === 0)) {
        throw new Error('State ID is required');
      }
      return await getsShippingCharge(stateId);
    },
    enabled: !!stateId && (Array.isArray(stateId) ? stateId.length > 0 : true)
  });
};