import { ParamsI } from '@/store/interface';
import { useMutation, useQuery } from '@tanstack/react-query';
import { bookArena, getArenaAvailability, getArenaDetail, getArenas } from '../endpoints/arenas.api';

export const useArenas = (params?: ParamsI, { refetchOnMount = false }: { refetchOnMount?: boolean } = {}) => {
    return useQuery({
        queryKey: ['arenas', params],
        queryFn: () => getArenas({ params }),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};

export const useArenaDetail = (id: string, params?: ParamsI, { refetchOnMount = false }: { refetchOnMount?: boolean } = {}) => {
    return useQuery({
        queryKey: ['arena-detail', params],
        queryFn: () => getArenaDetail({ id, params }),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};

export const useArenaAvailability = (
    ground: string,
    branch: string,
    date?: string,
    { refetchOnMount = false }: { refetchOnMount?: boolean } = {},
) => {
    return useQuery({
        queryKey: ['arena-availability', branch, ground, date],
        // queryFn: () => getArenaAvailability({ branch, ground }),
        queryFn: () => {
            if (!branch || !ground) throw new Error('Branch and ground are required');
            return getArenaAvailability({ branch, ground, date });
        },
        enabled: !!branch && !!ground, // Only run when both values exist
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};

export const useBookArena = () => {
    return useMutation({
        mutationFn: ({
            body,
        }: {
            body: {
                custom_fields: {
                    creator: {
                        name: string;
                        phone: string;
                        email: string;
                    };
                };
                relation: {
                    ground: string;
                    branch: string;
                };
                start_at: string;
                notes?: string;
            };
        }) => bookArena({ body }),
        onSuccess: (data) => {
            return data;
        },
    });
};
