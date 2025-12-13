export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
    phone?: string | null;
    address?: string | null;
    created_at?: string;
    updated_at?: string;
    // Add other user fields as needed
}
export interface RegisterVendorData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company_name: string;
    address: string;
    password: string;
    password_confirmation: string;
}
