import { AlternateApiResponse } from '@/interfaces/api.interface';
import api from '../clients/axiosClient';

export interface Country {
    id: number;
    name: string;
    iso2: string;
    iso3: string;
    // ... other country fields
}

export interface State {
    id: number;
    country_id: number;
    name: string;
    state_code: string;
    type: string;
    // ... other state fields
}

export interface LocationResponse {
    country: Country;
    states: State[];
    cities: any[]; // You can define a proper type for cities if needed
}

export const getLocations = async (): Promise<AlternateApiResponse<LocationResponse>> => {
    const response = await api.get('/public/locations');
    return response.data as AlternateApiResponse<LocationResponse>;
};

export const getLocationById = async (id: string | number): Promise<AlternateApiResponse<Location>> => {
    const response = await api.get(`/public/locations/${id}`);
    return response.data as AlternateApiResponse<Location>;
};
