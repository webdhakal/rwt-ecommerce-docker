// src/store/error.store.ts
import { create } from 'zustand';

type ErrorAction = {
    label: string;
    action: () => void | Promise<void>;
};

interface ApiError {
    message: string;
    statusCode?: number;
    data?: unknown;
    isNetworkError?: boolean;
    isServerError?: boolean;
    type?: 'auth' | 'network' | 'validation' | 'server' | 'client';
    actions?: ErrorAction[];
}

interface ErrorState {
    error: ApiError | null;
    showError: (error: Omit<ApiError, 'actions'> & { actions?: ErrorAction[] }) => void;
    clearError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
    error: null,
    showError: (error) => set({ error }),
    clearError: () => set({ error: null }),
}));

// Helper functions for common error types
export const errorHandlers = {
    showNetworkError: () => {
        useErrorStore.getState().showError({
            message: 'Network connection issue - please check your internet',
            isNetworkError: true,
            type: 'network',
            actions: [
                {
                    label: 'Retry',
                    action: () => window.location.reload(),
                },
            ],
        });
    },
    showAuthError: (message = 'Session expired - please login again') => {
        useErrorStore.getState().showError({
            message,
            statusCode: 401,
            type: 'auth',
            actions: [
                {
                    label: 'Login',
                    action: () => {
                        window.location.href = '/login';
                        localStorage.removeItem('authToken');
                        localStorage.removeItem('refreshToken');
                    },
                },
            ],
        });
    },
    showServerError: (message = 'Our servers are having issues - please try again later') => {
        useErrorStore.getState().showError({
            message,
            isServerError: true,
            type: 'server',
            actions: [
                {
                    label: 'Retry',
                    action: () => window.location.reload(),
                },
                {
                    label: 'Contact Support',
                    action: () => window.open('mailto:support@example.com'),
                },
            ],
        });
    },
};
