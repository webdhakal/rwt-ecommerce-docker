import { ParamsI } from '@/store/interface';
import { useQuery } from '@tanstack/react-query';
import { getTeamDetail } from '../endpoints/teams.api';

export const useTeamDetail = (id: string | number, params?: ParamsI, { refetchOnMount = false }: { refetchOnMount?: boolean } = {}) => {
    return useQuery({
        queryKey: ['team-detail', id],
        queryFn: () => getTeamDetail({ id, params }),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};
