import { AlternateApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import { Team } from '@/types/team.types';
import api from '../clients/axiosClient';

export const getTeamDetail = async ({ id, params }: { id: string | number; params?: ParamsI }): Promise<AlternateApiResponse<Team>> => {
    const response = await api.get(`/public/teams/${id}`, { ...params });
    return response.data as AlternateApiResponse<Team>;
};
