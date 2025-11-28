import { queryParamsBuilder } from '@/helpers/query-params-builder';
import { AlternateApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import { Product } from '@/types/Product';
import { FilterState } from '@/types/Sidebar';
import api from '../clients/axiosClient';

export const getProducts = async ({
  params = {},
  queryFilters = {},
}: {
  params?: Record<string, any>;
  queryFilters?: FilterState;
}): Promise<AlternateApiResponse<Product[]>> => {
  // Convert params to query string
  const paramsString = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      paramsString.append(key, String(value));
    }
  });
  
  // Combine with queryFilters
  const queryString = queryParamsBuilder(queryFilters);
  const fullQueryString = [queryString, paramsString.toString()]
    .filter(Boolean)
    .join('&');
  
  const response = await api.get(`/public/products?${fullQueryString}`);
  return response.data as AlternateApiResponse<Product[]>;
};
