import { AlternateApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import { Product } from '@/types/Product';
import api from '../clients/axiosClient';

interface SearchProductsParams extends ParamsI {
    search?: string;
    search_type?: 'advance' | 'basic';
    with?: string[];
    filters?: Record<string, any>;
}

export const searchProducts = async (params: SearchProductsParams): Promise<AlternateApiResponse<Product[]>> => {
    const { filters, with: withParams, ...restParams } = params;

    // Build the final params object
    const requestParams: Record<string, any> = {
        ...restParams,
        ...(withParams && { with: withParams }), // Pass with as is
    };

    // Add filters with proper format
    if (filters && Object.keys(filters).length > 0) {
        Object.entries(filters).forEach(([key, value]) => {
            requestParams[`filters[${key}]`] = value;
        });
    }

    const response = await api.get('/public/products', {
        params: requestParams,
    });

    return response.data as AlternateApiResponse<Product[]>;
};
