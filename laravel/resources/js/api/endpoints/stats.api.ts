import { AlternateApiResponse, PaginationMeta } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import api from '../clients/axiosClient';

interface TournamentProps {
    params?: ParamsI;
}

export interface TeamStats {
    id?: string;
    name?: string;
    matches_played?: number;
    wins?: number;
    draws?: number;
    losses?: number;
    goals_scored?: number;
    goals_against?: number;
    match_points?: number;
    win_rate?: string;
    goal_difference?: number;
    goal_rate?: string;
}

interface PlayerStats {
    [key: string]: unknown;
}

interface statsData {
    id?: string;
    name?: string;
    code?: string;
    goals_against?: number;
}

interface StatisticsData {
    leagues?: {
        avgGoalsPerMatch?: number;
        league_stats?: {
            total_goals?: number;
            total_matches?: number;
            goal_difference?: number;
            top_scorers?: statsData[];
            top_assists?: statsData[];
            best_defences?: statsData[];
        };
    }[];
    players?: {
        data?: PlayerStats[];
        pagination?: PaginationMeta;
    };
    teams?: {
        data?: TeamStats[];
        pagination?: PaginationMeta;
    };
}

export const getTournamentStats = async ({
    data,
}: {
    data: { id?: string; team?: string; player?: string };
}): Promise<AlternateApiResponse<StatisticsData>> => {
    const response = await api.post('/stats/league', { ...data });
    return response.data as AlternateApiResponse<StatisticsData>;
};

export const getTeamStats = async ({ id }: { id: string }): Promise<AlternateApiResponse<StatisticsData>> => {
    const response = await api.post('/stats/teams', { team: id });
    return response.data as AlternateApiResponse<StatisticsData>;
};
