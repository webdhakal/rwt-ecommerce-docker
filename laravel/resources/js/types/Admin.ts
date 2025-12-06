// src/types/Admin.ts

export interface Admin {
    id: number;
    name: string;
    email: string;
    role: 'admin';
    createdAt: string; // ISO date string
}

export interface AdminProps {
    admin: Admin;
    onDeleteAdmin: (adminId: number) => void;
}
