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
