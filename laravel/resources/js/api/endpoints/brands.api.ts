import { AlternateApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import { Brand } from '@/types/Brands';
import api from '../clients/axiosClient';

export const getBrands = async ({ params }: { params?: ParamsI }): Promise<AlternateApiResponse<Brand[]>> => {
    const response = await api.get(`/public/faqs`, { ...params });
    return response.data as AlternateApiResponse<Brand[]>;
};
