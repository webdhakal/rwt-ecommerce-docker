// src/types/Checkout.ts

import { Cart } from './Cart';

export interface CheckoutForm {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    paymentMethod: 'credit_card' | 'paypal';
}

export interface CheckoutProps {
    cart: Cart;
    onCheckout: (form: CheckoutForm) => void;
}
