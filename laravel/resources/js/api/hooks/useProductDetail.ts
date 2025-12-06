import { AlternateApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import { ProductDetail } from '@/types/Product';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getProductDetail } from '../endpoints/product-details.api';

export const useProductDetail = (
    slug: string,
    params?: ParamsI,
    { refetchOnMount = false }: { refetchOnMount?: boolean } = {},
): UseQueryResult<AlternateApiResponse<ProductDetail>, Error> => {
    return useQuery<AlternateApiResponse<ProductDetail>, Error>({
        queryKey: [`product-${slug}`],
        queryFn: () => getProductDetail({ params, slug }),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};
