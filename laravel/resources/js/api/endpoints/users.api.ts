import { AlternateApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import api from '../clients/axiosClient';

export const getUsers = async ({ params }: { params?: ParamsI }): Promise<AlternateApiResponse<User>> => {
    const response = await api.get(`/public/users`, { ...params });
    return response.data as AlternateApiResponse<User>;
};
