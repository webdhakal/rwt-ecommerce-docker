import { AlternateApiResponse, ApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import { Arena, Availability } from '@/types/arena.types';
import api from '../clients/axiosClient';

interface ArenaProps {
    params?: ParamsI;
}

interface AvailabilityProps {
    branch: string;
    ground: string;
    date?: string;
}

export const getArenas = async ({ params }: ArenaProps): Promise<ApiResponse<Arena[]>> => {
    const response = await api.get('/public/grounds', { ...params });
    return response.data as ApiResponse<Arena[]>;
};

export const getArenaDetail = async ({ id, params }: { id: string; params?: ParamsI }): Promise<AlternateApiResponse<Arena>> => {
    const response = await api.get(`/public/grounds/${id}`, { ...params });
    return response.data as AlternateApiResponse<Arena>;
};

export const getArenaAvailability = async ({ branch, ground, date }: AvailabilityProps): Promise<ApiResponse<Availability>> => {
    const response = await api.get(`/availability`, {
        params: {
            branch,
            ground,
            ...(date && { date }),
        },
    });
    return response.data as ApiResponse<Availability>;
};

export const bookArena = async ({ body }: { body: unknown }): Promise<ApiResponse<undefined>> => {
    const response = await api.post('/public/appointments', body);
    return response.data as ApiResponse<undefined>;
};
