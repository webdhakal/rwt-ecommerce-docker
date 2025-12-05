export interface City {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  country_id: number;
  country_code: string;
  latitude: string;
  longitude: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocationResponse {
  status: string;
  method: string;
  message: string;
  payload: {
    cities: City[];
  };
}
