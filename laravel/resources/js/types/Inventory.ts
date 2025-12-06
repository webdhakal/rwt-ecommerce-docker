// src/types/Inventory.ts

export interface InventoryItem {
    productId: number;
    quantityAvailable: number;
    restockDate?: string; // ISO date string
}

export interface Inventory {
    items: InventoryItem[];
}

export interface InventoryProps {
    inventory: Inventory;
    onRestock: (productId: number, quantity: number) => void;
}
