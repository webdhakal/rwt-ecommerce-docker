import { AlternateApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import { Product } from '@/types/Product';
import { FilterState } from '@/types/Sidebar';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getProducts } from '../endpoints/products.api';

export const useProducts = (
    params?: ParamsI,
    queryFilters?: FilterState,
    { refetchOnMount = false }: { refetchOnMount?: boolean } = {},
): UseQueryResult<AlternateApiResponse<Product[]>, Error> => {
    return useQuery<AlternateApiResponse<Product[]>, Error>({
        queryKey: ['products', queryFilters],
        queryFn: () => getProducts({ params, queryFilters: queryFilters as FilterState }),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};
