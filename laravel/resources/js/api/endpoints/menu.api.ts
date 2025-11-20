import { AlternateApiResponse } from '@/interfaces/api.interface';
import { Menu } from '@/types/Menu';
import api from '../clients/axiosClient';

export const getMenu = async (): Promise<AlternateApiResponse<Menu[]>> => {
    const response = await api.get(`/public/menus`);
    return response.data as AlternateApiResponse<Menu[]>;
};
