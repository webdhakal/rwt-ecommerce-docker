// src/types/Order.ts

import { CartItem } from "./Cart";
import { Receiptent } from "./User";
import { Address } from "./Address";

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

export interface OrderItem {
  id: string; // Assuming the blank key is meant to be "id"
  quantity: number;
  unit_amount: number;
  total_amount: number;
}
export interface OrderRelation {
  orderItems: OrderItem[];
  fromAddress: string[]; // Array of address IDs
  addresses: Address[];
}

export interface OrderSend {
  grand_total: number;
  payment_method: string;
  discount_amount?: number;
  payment_status: string;
  notes: string;
  user: Receiptent;
  relation: OrderRelation;
}