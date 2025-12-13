import { AlternateApiResponse } from '@/interfaces/api.interface';
import api from '../clients/axiosClient';
import { ROUTES } from '../routes';

// ---- Types ----
export interface LoginPayload {
    login: string;
    password: string;
    remember_me?: boolean;
}

export interface RegisterPayload {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirm_password: string;
}

export interface ForgotPasswordPayload {
    email: string;
}

interface ForgotPasswordResponse {
    message: string;
    user_id: string;
}

export interface ResetPasswordPayload {
    token: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface ChangePasswordPayload {
    old_password: string;
    new_password: string;
    confirm_password: string;
}

export interface UpdateProfilePayload {
    name?: string;
    email?: string;
    phone?: string;
    address_line1?: string;
    address_line2?: string;
    country?: string;
    state?: string;
    files?: File[];
    // Add other profile fields as needed
}

export interface VerifyPasswordTokenPayload {
    token: string;
    email: string;
}

export interface VerifyOtpPayload {
    user_id: string;
    otp: string;
}

export interface AuthResponse {
    access_token: string;
    refreshToken: string;
    auth: any; // Replace with your actual auth user type
}

// ---- LOGIN ----
export const login = async (payload: LoginPayload): Promise<AlternateApiResponse<AuthResponse>> => {
    const res = await api.post('/login', payload);
    return res.data;
};

// ---- REGISTER ----
export const register = async (payload: RegisterPayload): Promise<AlternateApiResponse<AuthResponse>> => {
    const res = await api.post('/register', payload);
    return res.data;
};

// ---- ME ----
export const me = async (): Promise<AlternateApiResponse<any>> => {
    const res = await api.get(ROUTES.AUTH.ME);
    return res.data;
};

// ---- FORGOT PASSWORD ----
export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<AlternateApiResponse<ForgotPasswordResponse>> => {
    const res = await api.post('/forgot-password', payload);
    return res.data;
};

// ---- VERIFY OTP ----
export const verifyOtp = async (payload: VerifyOtpPayload): Promise<AlternateApiResponse<{ token: string }>> => {
    const res = await api.post('/reset-password', payload);
    return res.data;
};

// ---- VERIFY PASSWORD TOKEN ----
export const verifyPasswordToken = async (payload: VerifyPasswordTokenPayload): Promise<AlternateApiResponse<any>> => {
    const res = await api.post(ROUTES.AUTH.VERIFY_PASSWORD_TOKEN, payload);
    return res.data;
};

// ---- RESET PASSWORD ----
export const resetPassword = async (payload: ResetPasswordPayload): Promise<AlternateApiResponse<any>> => {
    const res = await api.post(ROUTES.AUTH.RESET_PASSWORD, payload);
    return res.data;
};

// ---- REFRESH TOKEN ----
export const refreshToken = async (): Promise<AlternateApiResponse<AuthResponse>> => {
    const res = await api.get(ROUTES.AUTH.REFRESH);
    return res.data;
};

// ---- LOGOUT ----
export const logout = async (): Promise<AlternateApiResponse<any>> => {
    const res = await api.post(ROUTES.AUTH.LOGOUT);
    return res.data;
};

// ---- UPDATE PROFILE ----
export const updateProfile = async (payload: UpdateProfilePayload | FormData) => {
    const isFormData = payload instanceof FormData;

    const res = await api.post(ROUTES.AUTH.UPDATE_PROFILE, payload, isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined);

    return res.data;
};

// ---- CHANGE PASSWORD ----
export const changePassword = async (payload: ChangePasswordPayload): Promise<AlternateApiResponse<{ message: string }>> => {
    const res = await api.post(ROUTES.AUTH.CHANGE_PASSWORD, payload);
    return res.data;
};
