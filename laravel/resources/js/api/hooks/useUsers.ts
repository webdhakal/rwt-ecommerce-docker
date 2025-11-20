import { ParamsI } from '@/store/interface';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../endpoints/users.api';

export const useUsers = (params?: ParamsI, { refetchOnMount = false }: { refetchOnMount?: boolean } = {}) => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers({ params }),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};
