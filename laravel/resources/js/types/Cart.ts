export interface CartItem {
    productId: number;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    totalAmount: number;
}

export interface CartProps {
    cart: Cart;
    onRemoveFromCart: (productId: number) => void;
    onUpdateQuantity: (productId: number, quantity: number) => void;
}
