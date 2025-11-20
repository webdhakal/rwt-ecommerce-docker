import { AlternateApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import { Category } from '@/types/Category';
import api from '../clients/axiosClient';

export const getCategories = async ({ params }: { params?: ParamsI }): Promise<AlternateApiResponse<Category[]>> => {
    const response = await api.get(`/public/categories`, { ...params });
    return response.data as AlternateApiResponse<Category[]>;
};
