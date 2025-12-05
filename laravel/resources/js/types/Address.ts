// src/types/Address.ts

export interface Address {
  phone: string;
  email: string;
  custom_fields: AddressCustomFields;
  timezone?: string;
  address_line1?: string;
  address_line2?: string;
  landmark?: string;
  country: string;
  state: string;
  city: string;
  postal_code?: string;
  latitude?: string;
  longitude?: string;
}


export interface AddressProps {
    addresses: Address[];
    onAddAddress: (address: Omit<Address, 'id'>) => void;
    onDeleteAddress: (addressId: number) => void;
}
export interface AddressCustomFields {
  is_shipping?: boolean;
  is_billing?: boolean;
  default?: boolean;
}