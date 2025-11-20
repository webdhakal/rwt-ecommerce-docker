import { ParamsI } from '@/store/interface';
import { useQuery } from '@tanstack/react-query';
import { getReviews } from '../endpoints/reviews.api';

export const useReviews = (id: string, params?: ParamsI, { refetchOnMount = false }: { refetchOnMount?: boolean } = {}) => {
    return useQuery({
        queryKey: ['reviews', params],
        queryFn: () => getReviews({ id, params }),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};
