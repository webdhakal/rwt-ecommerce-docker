import { AlternateApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import { Brand } from '@/types/Brands';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getBrands } from '../endpoints/brands.api';

export const useFaqs = (
    params?: ParamsI,
    { refetchOnMount = false }: { refetchOnMount?: boolean } = {},
): UseQueryResult<AlternateApiResponse<Brand[]>, Error> => {
    return useQuery<AlternateApiResponse<Brand[]>, Error>({
        queryKey: ['faqs'],
        queryFn: () => getBrands({ params }),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};
