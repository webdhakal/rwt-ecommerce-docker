import { LocationResponse } from '@/types/Country';
import api from '../clients/axiosClient';
import { ParamsI } from '@/store/interface';


export const getLocations = async (params:ParamsI): Promise<LocationResponse> => {
  const response = await api.get('/public/locations', { ...params });
  return response.data as LocationResponse;
};

