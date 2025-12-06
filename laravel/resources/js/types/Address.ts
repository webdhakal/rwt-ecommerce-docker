// src/types/Address.ts

export interface Address {
    id: number;
    userId: number;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface AddressProps {
    addresses: Address[];
    onAddAddress: (address: Omit<Address, 'id'>) => void;
    onDeleteAddress: (addressId: number) => void;
}
