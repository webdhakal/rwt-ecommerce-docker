import { AlternateApiResponse } from '@/interfaces/api.interface';
import { Menu } from '@/types/Menu';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getMenu } from '../endpoints/menu.api';

export const useMenu = ({ refetchOnMount = false }: { refetchOnMount?: boolean } = {}): UseQueryResult<AlternateApiResponse<Menu[]>, Error> => {
    return useQuery<AlternateApiResponse<Menu[]>, Error>({
        queryKey: ['nav-menus'],
        queryFn: () => getMenu(),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};
