import { useQuery } from '@tanstack/react-query';
import { getLocations } from '../endpoints/location.api';

export const useLocations = () => {
    return useQuery({
        queryKey: ['locations'],
        queryFn: getLocations,
    });
};

export const useLocation = () => {
    const { data, ...rest } = useLocations();

    return {
        country: data?.payload?.country,
        states: data?.payload?.states || [],
        ...rest,
    };
};
