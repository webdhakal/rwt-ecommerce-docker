import { ParamsI } from '@/store/interface';
import { useQuery } from '@tanstack/react-query';
import { getTournamentDetail, getTournamentMatchDetail, getTournamentMatches, getTournaments } from '../endpoints/tournaments.api';

export const useTournament = (params?: ParamsI, { refetchOnMount = false }: { refetchOnMount?: boolean } = {}) => {
    return useQuery({
        queryKey: ['tournament', params],
        queryFn: () => getTournaments({ params }),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};

export const useTournamentDetail = (params?: ParamsI, { refetchOnMount = false }: { refetchOnMount?: boolean } = {}) => {
    return useQuery({
        queryKey: ['tournament-detail', params],
        queryFn: () => getTournamentDetail({ params }),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};

export const useTournamentMatches = (params?: ParamsI, { refetchOnMount = false }: { refetchOnMount?: boolean } = {}) => {
    return useQuery({
        queryKey: ['tournament-detail', params],
        queryFn: () => getTournamentMatches({ params }),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};

export const useTournamentMatchDetail = (id: string, params?: ParamsI, { refetchOnMount = false }: { refetchOnMount?: boolean } = {}) => {
    return useQuery({
        queryKey: ['tournament-detail', params],
        queryFn: () => getTournamentMatchDetail({ id, params }),
        ...(refetchOnMount && { refetchOnMount: 'always' }),
    });
};
