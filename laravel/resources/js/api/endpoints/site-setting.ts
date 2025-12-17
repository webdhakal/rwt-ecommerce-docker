import { AlternateApiResponse } from '@/interfaces/api.interface';
import {Banner} from '@/types/Banners';
import api from '../clients/axiosClient';

export const getBanners = async (): Promise<AlternateApiResponse<Banner[]>> => {
    const response = await api.get(`/page/home`, );
    return response.data as AlternateApiResponse<Banner[]>;
};

export const getSiteSetting = async (): Promise<AlternateApiResponse<SiteSetting>> => {
    const response = await api.get(`/public/site-settings`, );
    return response.data as AlternateApiResponse<SiteSetting>;
};