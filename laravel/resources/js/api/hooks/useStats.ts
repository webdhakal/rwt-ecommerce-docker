import { useMutation } from '@tanstack/react-query';
import { getTeamStats, getTournamentStats } from '../endpoints/stats.api';

export const useTournamentStats = () => {
    return useMutation({
        mutationFn: ({ data }: { data: { league?: string; team?: string; player?: string } }) => getTournamentStats({ data }),
        onSuccess: (data) => {
            return data;
        },
    });
};

export const useTeamStats = () => {
    return useMutation({
        mutationFn: ({ id }: { id: string }) => getTeamStats({ id }),
        onSuccess: (data) => {
            return data;
        },
    });
};

// export const useUpdateCategory = () => {
//     return useMutation({
//         mutationFn: ({ data, id }: { data: CategoryDto; id: number | string }) => updateCategory({ id, data }),
//         onSuccess: (data) => {
//             return data;
//         },
//     });
// };
