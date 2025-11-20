import { AlternateApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import { Faq } from '@/types/Faqs';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getFaqs } from '../endpoints/faqs.api';

export const useFaqs = (
    params?: ParamsI,
    { refetchOnMount = false }: { refetchOnMount?: boolean } = {},
): UseQueryResult<AlternateApiResponse<Faq[]>, Error> => {
    return useQuery<AlternateApiResponse<Faq[]>, Error>({
        queryKey: ['faqs'],
        queryFn: () => getFaqs({ params }),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};
