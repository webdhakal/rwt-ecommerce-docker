// src/types/Payment.ts

export interface Payment {
    id: number;
    orderId: number;
    amount: number;
    method: 'credit_card' | 'paypal';
    status: 'pending' | 'completed' | 'failed';
    createdAt: string; // ISO date string
}

export interface PaymentProps {
    payment: Payment;
    onRetryPayment: (paymentId: number) => void;
}
