import { AlternateApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import { Faq } from '@/types/Faqs';
import api from '../clients/axiosClient';

export const getFaqs = async ({ params }: { params?: ParamsI }): Promise<AlternateApiResponse<Faq[]>> => {
    const response = await api.get(`/public/faqs`, { ...params });
    return response.data as AlternateApiResponse<Faq[]>;
};
