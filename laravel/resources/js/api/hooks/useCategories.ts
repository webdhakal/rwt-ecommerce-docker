import { AlternateApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import { Category } from '@/types/Category';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getCategories } from '../endpoints/categories.api';

export const useCategories = (
    params?: ParamsI,
    { refetchOnMount = false }: { refetchOnMount?: boolean } = {},
): UseQueryResult<AlternateApiResponse<Category[]>> => {
    return useQuery({
        queryKey: ['categories', params],
        queryFn: () => getCategories({ params }),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};
