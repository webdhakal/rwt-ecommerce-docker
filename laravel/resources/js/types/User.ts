export interface User {
    id: number;
    name: string;
    email: string;
    role: 'customer' | 'admin';
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

export interface UserProps {
    user: User;
    onLogout: () => void;
}

export interface Receiptent{
    first_name:string;
    last_name:string;
    email:string;
    phone:string;
}