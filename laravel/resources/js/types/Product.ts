// export interface Product {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     categoryId: number;
//     imageUrl: string;
//     stock: number;
//     createdAt: string; // ISO date string
//     updatedAt: string; // ISO date string
// }

import { BrandProps } from './MockData';

type ProductInformation = {
    label: string;
    value: string;
};

type Review = {
    userId: number;
    comment: string;
    rating: number;
    createdAt: string;
};

type TrackingSubStep = {
    description: string;
    timestamp: string;
    location: string;
};

type TrackingStep = {
    title: string;
    status: 'completed' | 'current' | 'upcoming';
    carrier?: string;
    shippedDate?: string;
    trackingNumber?: string;
    subSteps?: TrackingSubStep[];
};

type GalleryImage = {
    imageUrl: string;
};

export type RelatedProduct = {
    id: string;
    name: string;
    description: string;
    price: number;
    unit: number;
    discount: number;
    badge: number;
    freeShipping: boolean;
    saledEndsIn: string;
    category: string;
    imageUrl: string;
};

export interface ProductProps {
    id: string;
    name: string;
    slug: string;
    description: string;
    summary: string;
    has_variant: boolean;
    price: number;
    brand: BrandProps;
    unit: any; // change later when backend updated.
    discount: number;
    badge: string;
    freeShipping: boolean;
    saledEndsIn: string;
    category: string;
    imageUrl: string;
    gallery: GalleryImage[];
    relatedProducts: ProductProps[];
    stock: number;
    rating: number;
    information: ProductInformation[];
    vendorName: string;
    reviews: Review[];
    trackingSteps: TrackingStep[];
    tags: Array<string>;
    highlights: Array<{
        start_at: Date;
        end_at: Date;
        type: string;
        status: boolean;
        product_id: number;
    }>;
    variants: Array<{
        id: string;
        status: boolean;
        base_price: string;
        color: string;
        price: string;
        size: string;
        stock: number;
    }>;
}

export interface ProductColor {
    id: string;
    name: string;
    color_code: string;
    created_at: string;
}

export interface ProductSize {
    id: string;
    name: string;
    size_code: string;
    created_at: string;
}

// export interface ProductVariant {
//     id: string;
//     color: ProductColor;
//     size: ProductSize;
//     price: string;
//     base_price: string;
//     status: boolean;
//     stock: number;
//     created_at: string;
// }

export interface Product {
  initials: string | null;
  id: string;
  name: string;
  slug: string;
  sku: string;
  code: string;
  status: string;
  summary: string;
  short_description: string;
  description: string;
  specifications: Record<string, string>;
  features: string[];
  stock_status: string;
  stock: number;
  in_wishlist: boolean;
  is_published: boolean;
  is_featured: boolean;
  rating: number;
  reviews_count: number;
  has_variant: boolean;
  price: string;
  price_range: string;
  colors: string[];
  sizes: string[];
  variant_count: number;
  default_attributes: any[];
  variants: ProductVariant[];
  shipping_methods: any[];
  warranty: string;
  created_at: string;
}

export type ProductCategories ={
    id:string;
    initial:string;
    name:string;
    slug:string;
    type:string;
}
export type ProductVariant = {
    initials: string | null;
    id: string;
    name: string | null;
    color: {
        id: string;
        name: string;
        color_code: string;
        created_at: string;
    } | null;
    size: {
        id: string;
        name: string;
        size_code: string;
        created_at: string;
    } | null;
    price: string;
    unit_weight: string;
    previous_price: string;
    cost_per_item: string;
    attributes: any;
    base_price: string;
    status: boolean;
    sku_suffix: string;
    stock: number;
    is_backorder: boolean;
    created_at: string;
};

export type ProductDetail = {
    id: string;
    name: string;
    slug: string;
    sku: string | null;
    code: string | null;
    status: string;
    summary: string | null;
    short_description: string | null;
    description: string | null;
    shippingOptions: Array<{ name: string; duration: string; price: number }>;
    specifications: Record<string, string>;
    features: string[];
    stock: number;
    stock_status: string;
    base_price: string;
    price: string;
    in_wishlist: boolean;
    colors: string[];
    sizes: string[];
    original_price: string;
    rating: number | null;
    reviews_count: number;
    has_variant: boolean;
    variant_count: number;
    related_product: Product;
    variants: ProductVariant[];
    warranty: string | null;
    created_at: string;
};
