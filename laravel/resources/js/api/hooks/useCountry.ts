import { AlternateApiResponse } from '@/interfaces/ .interface';
import { ParamsI } from '@/store/interface';
import { City } from '@/types/Country';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {getLocations} from '@/api/endpoints/countries.api';

export const useGetLocation = (
    params?: ParamsI,
    { refetchOnMount = false }: { refetchOnMount?: boolean } = {},
): UseQueryResult<AlternateApiResponse<City[]>> => {
    return useQuery({
        queryKey: ['location', params],
        queryFn: () => getLocations({ params }),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};
