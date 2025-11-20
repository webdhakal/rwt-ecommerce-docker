import { ApiResponse } from '@/interfaces/api.interface';
import { ParamsI } from '@/store/interface';
import { Reviews } from '@/types/review.types';
import api from '../clients/axiosClient';

// type ReviewProps = {
//     params: ParamsI;
// };

export const getReviews = async ({ id, params }: { id: string; params?: ParamsI }): Promise<ApiResponse<Reviews[]>> => {
    const response = await api.get(`/public/ground-reviews/${id}`, { ...params });
    return response.data as ApiResponse<Reviews[]>;
};
