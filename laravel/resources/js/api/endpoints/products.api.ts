import { queryParamsBuilder } from '@/helpers/query-params-builder';
import { AlternateApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import { Product } from '@/types/Product';
import { FilterState } from '@/types/Sidebar';
import api from '../clients/axiosClient';

export const getProducts = async ({
    params,
    queryFilters,
}: {
    params?: ParamsI;
    queryFilters: FilterState;
}): Promise<AlternateApiResponse<Product[]>> => {
    console.log(queryParamsBuilder(queryFilters));
    const response = await api.get(`/public/products?${queryParamsBuilder(queryFilters)}`, { ...params });
    return response.data as AlternateApiResponse<Product[]>;
};
