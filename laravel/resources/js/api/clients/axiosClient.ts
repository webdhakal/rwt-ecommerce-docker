import { logger } from '@/logger';
import { errorHandlers, useErrorStore } from '@/store/error.store';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ROUTES } from '../routes';

// Environment configuration
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

logger.log(BASE_URL);
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10);

// Types
interface CustomAxiosConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

interface ApiError {
    message: string;
    statusCode?: number;
    data?: unknown;
    isNetworkError?: boolean;
    isServerError?: boolean;
    type?: 'auth' | 'network' | 'validation' | 'server' | 'client';
}

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    // withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // Ensure headers exist
        config.headers = config.headers || {};

        // Add auth token if available
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.warn('Failed to retrieve auth token from storage', error);
        }

        // Add request timestamp
        config.headers['X-Request-Timestamp'] = Date.now();

        return config;
    },
    (error: AxiosError) => {
        logger.error(error);
        errorHandlers.showServerError('Failed to setup request');
        return Promise.reject({
            message: 'Failed to setup request',
            isNetworkError: false,
            isServerError: false,
        });
    },
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as CustomAxiosConfig;
        const isNetworkError = !error.response;
        const isServerError = error.response?.status ? error.response.status >= 500 : false;

        // Skip error modal for client errors (400-499) from auth/me endpoint
        const isAuthMeEndpoint = originalRequest.url?.includes(ROUTES.AUTH.ME);
        const isClientError = error.response?.status ? error.response.status >= 400 && error.response.status <= 499 : false;

        if (isAuthMeEndpoint && isClientError) {
            return Promise.reject({
                message: error.response?.data?.message || 'Authentication required',
                statusCode: error.response?.status,
                isNetworkError: false,
                isServerError: false,
                type: 'auth',
            });
        }

        // Handle network errors
        if (isNetworkError) {
            errorHandlers.showNetworkError();
            return Promise.reject({
                message: 'Network connection issue - please check your internet',
                isNetworkError: true,
                isServerError: false,
            });
        }

        // Log error details
        logger.log(`❌ API Error [${error.response?.status}]:`, {
            url: originalRequest.url,
            status: error.response?.status,
            data: error.response?.data,
            config: error.config,
        });

        // Handle 401 Unauthorized (token refresh flow)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh`, {
                        refreshToken,
                    });

                    localStorage.setItem('authToken', refreshResponse.data.accessToken);
                    localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);

                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
                    }

                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('refreshToken');
                errorHandlers.showAuthError();
                return Promise.reject(refreshError);
            }
        }

        // Handle all other error responses
        if (error.response) {
            const errorData = error.response.data || {};
            const status = error.response.status;
            const errorType = status >= 500 ? 'server' : status === 401 || status === 403 ? 'auth' : status === 400 ? 'validation' : 'client';

            const apiError: ApiError = {
                message: errorData.message || getDefaultErrorMessage(status),
                statusCode: status,
                data: errorData,
                isNetworkError: false,
                isServerError: isServerError,
                type: errorType,
            };

            useErrorStore.getState().showError(apiError);
            return Promise.reject(apiError);
        }

        // Fallback for any unhandled error case
        errorHandlers.showServerError('An unexpected error occurred');
        return Promise.reject({
            message: 'An unexpected error occurred',
            isNetworkError: false,
            isServerError: false,
        });
    },
);

// Helper function for default error messages
function getDefaultErrorMessage(status: number): string {
    switch (status) {
        case 400:
            return 'Invalid request data';
        case 401:
            return 'Session expired - please login again';
        case 403:
            return "You don't have permission for this action";
        case 404:
            return 'Requested resource not found';
        case 429:
            return 'Too many requests - please slow down';
        case 500:
            return 'Our servers are having issues - please try again later';
        case 502:
            return 'Bad gateway - our servers are temporarily unavailable';
        case 503:
            return "Service unavailable - we're doing maintenance";
        case 504:
            return 'Gateway timeout - our servers are busy';
        default:
            return `Request failed with status ${status}`;
    }
}

// API methods with proper typing
const api = {
    get: <T>(url: string, config?: CustomAxiosConfig) => axiosInstance.get<T>(url, config),
    post: <T>(url: string, data?: unknown, config?: CustomAxiosConfig) => axiosInstance.post<T>(url, data, config),
    put: <T>(url: string, data?: unknown, config?: CustomAxiosConfig) => axiosInstance.put<T>(url, data, config),
    delete: <T>(url: string, config?: CustomAxiosConfig) => axiosInstance.delete<T>(url, config),
    patch: <T>(url: string, data?: unknown, config?: CustomAxiosConfig) => axiosInstance.patch<T>(url, data, config),
};

export default api;
