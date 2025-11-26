import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@inertiajs/react';
import { toast } from '@/shadcn/hooks/use-toast';
import * as authApi from '@/api/endpoints/auth.api'

// Query Keys
export const authKeys = {
    all: ['auth'] as const,
    me: () => [...authKeys.all, 'me'] as const,
};

// ---- useLogin Hook ----
export const useLogin = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            // Store tokens in localStorage (note: consider more secure alternatives)
            if (data.payload) {
                localStorage.setItem('authToken', data.payload.access_token);
                localStorage.setItem('refreshToken', data.payload.refreshToken);
                localStorage.setItem('auth', JSON.stringify(data.payload.auth));
            }
            
            // Invalidate and refetch user data
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
            
            toast({
                title: data.message || 'Login successful',
                description: 'Redirecting to dashboard...'
            });
            
            // Redirect after short delay
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 500);
        },
        onError: (error: any) => {
            toast({
                title: 'Failed to login',
                description: error.response?.data?.message || error.message,
                variant: 'destructive'
            });
        }
    });
};

// ---- useRegister Hook ----
export const useRegister = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            if (data.payload) {
                localStorage.setItem('authToken', data.payload.access_token);
                localStorage.setItem('refreshToken', data.payload.refreshToken);
                localStorage.setItem('auth', JSON.stringify(data.payload.auth));
            }
            
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
            
            toast({
                title: data.message || 'Registration successful',
                description: 'Redirecting to dashboard...'
            });
            
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 500);
        },
        onError: (error: any) => {
            toast({
                title: 'Failed to register',
                description: error.response?.data?.message || error.message,
                variant: 'destructive'
            });
        }
    });
};

// ---- useMe Hook (Get Current User) ----
export const useMe = (enabled: boolean = true) => {
    const hasToken = !!localStorage.getItem('authToken');
    
    return useQuery({
        queryKey: authKeys.me(),
        queryFn: authApi.me,
        enabled: enabled && hasToken,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// ---- useForgotPassword Hook ----
export const useForgotPassword = () => {
    return useMutation({
        mutationFn: authApi.forgotPassword,
        onSuccess: (data) => {
            toast({
                title: data.message || 'OTP sent',
                description: 'Please check your email for the OTP code.'
            });
            window.location.href = route('reset-password');
        },
        onError: (error: any) => {
            toast({
                title: 'Failed to send OTP',
                description: error.response?.data?.message || error.message,
                variant: 'destructive'
            });
        }
    });
};

// ---- useVerifyOtp Hook ----
export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: authApi.verifyOtp,
        onSuccess: (data) => {
            toast({
                title: data.message || 'OTP verified',
                description: 'Please set your new password.'
            });
            // Store the reset token in localStorage for the reset password page
            if (data.payload?.token) {
                localStorage.setItem('resetToken', data.payload.token);
            }
            window.location.href = route('reset-password');
        },
        onError: (error: any) => {
            toast({
                title: 'Failed to verify OTP',
                description: error.response?.data?.message || error.message,
                variant: 'destructive'
            });
        }
    });
};

// ---- useVerifyPasswordToken Hook ----
export const useVerifyPasswordToken = () => {
    return useMutation({
        mutationFn: authApi.verifyPasswordToken,
        onError: (error: any) => {
            toast({
                title: 'Invalid or expired token',
                description: error.response?.data?.message || error.message,
                variant: 'destructive'
            });
        }
    });
};

// ---- useResetPassword Hook ----
export const useResetPassword = () => {
    return useMutation({
        mutationFn: authApi.resetPassword,
        onSuccess: (data) => {
            toast({
                title: data.message || 'Password reset successful',
                description: 'You can now login with your new password'
            });
            
            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);
        },
        onError: (error: any) => {
            toast({
                title: 'Failed to reset password',
                description: error.response?.data?.message || error.message,
                variant: 'destructive'
            });
        }
    });
};

// ---- useRefreshToken Hook ----
export const useRefreshToken = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: authApi.refreshToken,
        onSuccess: (data) => {
            if (data.payload) {
                localStorage.setItem('authToken', data.payload.access_token);
                localStorage.setItem('refreshToken', data.payload.refreshToken);
            }
            
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
        },
        onError: (error: any) => {
            // Clear tokens and redirect to login
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('auth');
            window.location.href = "/login";
        }
    });
};

// ---- useLogout Hook ----
export const useLogout = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: (data) => {
            // Clear all auth data
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('auth');
            
            // Clear all queries
            queryClient.clear();
            
            toast({
                title: data.message || 'Logged out successfully'
            });
            
            // Redirect to login
            setTimeout(() => {
                window.location.href = "/login";
            }, 500);
        },
        onError: (error: any) => {
            // Even on error, clear local data and redirect
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('auth');
            queryClient.clear();
            
            window.location.href = "/login";
        }
    });
};