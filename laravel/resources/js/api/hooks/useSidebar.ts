import { AlternateApiResponse } from '@/interfaces/api.interface';
import { SidebarData } from '@/types/Sidebar';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getSidebar } from '../endpoints/sidebar.api';

export const useSidebar = ({ refetchOnMount = false }: { refetchOnMount?: boolean } = {}): UseQueryResult<
    AlternateApiResponse<SidebarData>,
    Error
> => {
    return useQuery<AlternateApiResponse<SidebarData>, Error>({
        queryKey: ['product-sidebar'],
        queryFn: () => getSidebar(),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};
