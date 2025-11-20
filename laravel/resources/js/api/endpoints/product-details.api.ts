import { AlternateApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import { ProductDetail } from '@/types/Product';
import api from '../clients/axiosClient';

export const getProductDetail = async ({ params, slug }: { params?: ParamsI; slug: string }): Promise<AlternateApiResponse<ProductDetail>> => {
    const response = await api.get(`/public/products/${slug}`, { ...params });
    return response.data as AlternateApiResponse<ProductDetail>;
};
