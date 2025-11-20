import { AlternateApiResponse } from '@/interfaces/api.interface';
import { SidebarData } from '@/types/Sidebar';
import api from '../clients/axiosClient';

export const getSidebar = async (): Promise<AlternateApiResponse<SidebarData>> => {
    const response = await api.get(`/public/product-sidebar`);
    return response.data as AlternateApiResponse<SidebarData>;
};
