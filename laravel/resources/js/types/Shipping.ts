// src/types/Shipping.ts

export interface Shipping {
    id: number;
    orderId: number;
    addressId: number;
    shippingMethod: 'standard' | 'express';
    trackingNumber?: string;
    status: 'pending' | 'shipped' | 'delivered';
    createdAt: string; // ISO date string
}

export interface ShippingProps {
    shipping: Shipping;
    onUpdateShipping: (shippingId: number, updates: Partial<Shipping>) => void;
}