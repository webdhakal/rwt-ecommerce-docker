export interface User {
    id: number;
    name: string;
    email: string;
    role: 'customer' | 'admin';
    avatar?: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

export interface UserProps {
    user: User;
    onLogout: () => void;
}
