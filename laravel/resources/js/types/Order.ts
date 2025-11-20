// src/types/Order.ts

import { CartItem } from "./Cart";

export interface Order {
    id: number;
    userId: number;
    items: CartItem[];
    totalAmount: number;
    status: 'pending' | 'completed' | 'canceled';
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

export interface OrderProps {
    order: Order;
    onReorder: (orderId: number) => void;
}