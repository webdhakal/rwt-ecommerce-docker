import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from '@inertiajs/react';
import { toast } from '@/shadcn/hooks/use-toast';
import * as authApi from '@/api/endpoints/auth.api';
import { User } from '@/interfaces/user.interface';
import { AxiosResponse } from 'axios';

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
        onSuccess: (data: AxiosResponse) => {
            // Store tokens in localStorage (note: consider more secure alternatives)
            if (data.payload) {
                localStorage.setItem('authToken', data.payload.access_token);
                localStorage.setItem('refreshToken', data.payload.refreshToken);
            }
            
            // Invalidate and refetch user data
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
            
            toast({
                title: data.data?.message || 'Login successful',
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
        onSuccess: (data: AxiosResponse<{ payload: { access_token: string, refreshToken: string, auth: User } }>) => {
            // Update tokens in localStorage
            if (data.data?.payload) {
                localStorage.setItem('authToken', data.data.payload.access_token);
                localStorage.setItem('refreshToken', data.data.payload.refreshToken);
            }
            
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
            
            toast({
                title: data.data?.message || 'Registration successful',
                description: 'Redirecting to dashboard...'
            });
            
            setTimeout(() => {
                window.location.href = "/login";
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
        select: (data) => data.payload // Directly return the payload
    });
};

// ---- useForgotPassword Hook ----
export const useForgotPassword = () => {
    return useMutation({
        mutationFn: authApi.forgotPassword,
        onSuccess: (data: AxiosResponse<{ message: string }>) => {
            toast({
                title: data.data?.message || 'OTP sent',
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
        onSuccess: (data: AxiosResponse<{ message: string, payload: { token: string } }>) => {
            toast({
                title: data.data?.message || 'OTP verified',
                description: 'Please set your new password.'
            });
            // Store the reset token in localStorage for the reset password page
            if (data.data?.payload?.token) {
                localStorage.setItem('resetToken', data.data.payload.token);
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
        onSuccess: (data: AxiosResponse<{ message: string }>) => {
            toast({
                title: data.data?.message || 'Password reset successful',
                description: 'You can now login with your new password.'
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
        onSuccess: (data: AxiosResponse) => {
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
            window.location.href = "/login";
        }
    });
};

// ---- useUpdateProfile Hook ----
export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const { data: userData } = useMe(); // Get the current user data
    
    return useMutation({
        mutationFn: authApi.updateProfile,
        onSuccess: async (data: AxiosResponse) => {
            if (!data.data?.payload) {
                try {
                    const updatedUser = await queryClient.fetchQuery(authKeys.me(), () => 
                        authApi.me()
                    );
                    
                    // const authData = localStorage.getItem('auth');
                    // if (authData && updatedUser?.data?.payload) {
                    //     const auth = JSON.parse(authData);
                    //     localStorage.setItem('auth', JSON.stringify({ 
                    //         ...auth, 
                    //         ...updatedUser.data.payload
                    //     }));
                    // }
                    
                    toast({
                        title: data.data?.message || 'Profile updated successfully',
                        variant: 'default'
                    });
                    return;
                } catch (error) {
                    console.error('Failed to fetch updated user data:', error);
                }
            }
            
            // If we have payload, proceed with the original logic
            queryClient.setQueryData(authKeys.me(), (oldData: any) => ({
                ...oldData,
                ...(data.data?.payload || {})
            }));
            
            const authData = localStorage.getItem('auth');
            if (authData && data.data?.payload) {
                const auth = JSON.parse(authData);
                localStorage.setItem('auth', JSON.stringify({ 
                    ...auth, 
                    ...data.data.payload
                }));
            }
            
            toast({
                title: data.data?.message || 'Profile updated successfully',
                variant: 'default'
            });
        },
        onError: (error: any) => {
            toast({
                title: 'Failed to update profile',
                description: error.response?.data?.message || error.message,
                variant: 'destructive'
            });
            throw error;
        }
    });
};

// ---- useChangePassword Hook ----
export const useChangePassword = () => {
    return useMutation({
        mutationFn: authApi.changePassword,
        onSuccess: (data: AxiosResponse) => {
            toast({
                title: data.message || 'Password changed successfully',
                description: 'Please login again with your new password.',
                variant: 'default'
            });
            
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            
            setTimeout(() => {
                window.location.href = route('login');
            }, 2000);
        },
        onError: (error: any) => {
            toast({
                title: 'Failed to change password',
                description: error.response?.data?.message || error.message,
                variant: 'destructive'
            });
            throw error;
        }
    });
};

// ---- useLogout Hook ----
export const useLogout = () => {
    const queryClient = useQueryClient();
    // const navigate = useNavigate();
    
    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: (data: AxiosResponse) => {
            // Clear all auth-related data from localStorage
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            
            // Invalidate all queries
            queryClient.clear();
            
            toast({
                title: data.message || 'Logged out successfully',
                description: 'You have been logged out.'
            });
            
            // Navigate to login page
            window.location.href = (route('login'));
        },
        onError: (error: any) => {
            // Even if there's an error, we'll still clear local storage and redirect
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('auth');
            queryClient.clear();
            
            toast({
                title: 'Logged out',
                description: 'You have been logged out.'
            });
            
            window.location.href = (route('login'));
        }
    });
};