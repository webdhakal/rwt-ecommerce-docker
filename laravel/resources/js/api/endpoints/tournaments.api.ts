import { AlternateApiResponse, ApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import { Tournament } from '@/types/tournament.types';
import api from '../clients/axiosClient';

interface TournamentProps {
    params?: ParamsI;
}

export const getTournaments = async ({ params }: TournamentProps): Promise<ApiResponse<Tournament[]>> => {
    const response = await api.get('/public/games', { ...params });
    return response.data as ApiResponse<Tournament[]>;
};

export const getTournamentDetail = async ({ params }: TournamentProps): Promise<AlternateApiResponse<Tournament>> => {
    const response = await api.get(`/public/games/${params?.id}`, { ...params });
    return response.data as AlternateApiResponse<Tournament>;
};

export const getTournamentMatches = async ({ params }: TournamentProps): Promise<ApiResponse<Tournament[]>> => {
    const response = await api.get(`/public/games`, { ...params });
    return response.data as ApiResponse<Tournament[]>;
};

export const getTournamentMatchDetail = async ({ id, params }: { id: string; params?: ParamsI }): Promise<AlternateApiResponse<Tournament>> => {
    const response = await api.get(`/public/games/${id}`, { ...params });
    return response.data as AlternateApiResponse<Tournament>;
};
