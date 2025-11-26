import api from "../clients/axiosClient";
import { ROUTES } from "../routes";
import { AlternateApiResponse } from "@/interfaces/api.interface";

// ---- Types ----
export interface LoginPayload {
    login: string;
    password: string;
    remember_me?: boolean;
}

export interface RegisterPayload {
    name: string;
    email: string;
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
    return res;
};

// ---- REGISTER ----
export const register = async (payload: RegisterPayload): Promise<AlternateApiResponse<AuthResponse>> => {
    const res = await api.post('/register', payload);
    return res;
};

// ---- ME ----
export const me = async (): Promise<AlternateApiResponse<any>> => {
    const res = await api.get(ROUTES.AUTH.ME);
    return res;
};

// ---- FORGOT PASSWORD ----
export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<AlternateApiResponse<ForgotPasswordResponse>> => {
    const res = await api.post('/forgot-password', payload);
    return res;
};

// ---- VERIFY OTP ----
export const verifyOtp = async (payload: VerifyOtpPayload): Promise<AlternateApiResponse<{ token: string }>> => {
    const res = await api.post('/reset-password', payload);
    return res;
};

// ---- VERIFY PASSWORD TOKEN ----
export const verifyPasswordToken = async (payload: VerifyPasswordTokenPayload): Promise<AlternateApiResponse<any>> => {
    const res = await api.post(ROUTES.AUTH.VERIFY_PASSWORD_TOKEN, payload);
    return res;
};

// ---- RESET PASSWORD ----
export const resetPassword = async (payload: ResetPasswordPayload): Promise<AlternateApiResponse<any>> => {
    const res = await api.post(ROUTES.AUTH.RESET_PASSWORD, payload);
    return res;
};

// ---- REFRESH TOKEN ----
export const refreshToken = async (): Promise<AlternateApiResponse<AuthResponse>> => {
    const res = await api.get(ROUTES.AUTH.REFRESH);
    return res;
};

// ---- LOGOUT ----
export const logout = async (): Promise<AlternateApiResponse<any>> => {
    const res = await api.post(ROUTES.AUTH.LOGOUT);
    return res;
};