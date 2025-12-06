// resources/js/api/hooks/useSearch.ts
import { Product } from '@/types/Product';
import { useQuery } from '@tanstack/react-query';
import { searchProducts } from '../endpoints/search-items.api';

interface SearchProductsParams {
    search?: string;
    search_type?: 'advance' | 'basic';
    with?: string[];
    filters?: Record<string, any>;
    [key: string]: any;
}

export const useSearch = (query: string) => {
    const searchParams: SearchProductsParams = {
        filters: {
            search: query,
        },
        search_type: 'advance',
        with: 'categories',
    };

    const {
        data: searchResults = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['search', query],
        queryFn: async () => {
            if (!query.trim()) return [];
            const response = await searchProducts(searchParams);
            return response.payload?.data || [];
        },
        enabled: !!query.trim(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
    });

    return {
        searchResults: searchResults as Product[],
        isLoading,
        isError,
        error: error as Error | null,
    };
};

export default useSearch;
