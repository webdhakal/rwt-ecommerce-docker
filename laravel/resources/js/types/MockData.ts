import React, { ComponentType, ReactNode } from 'react';
import { IconType } from 'react-icons';
import { FlashMessagePayload, PageProps } from '.';
import { ProductType } from './Product';

export type CustomSiteProps = PageProps & {
    recentProductsTabs: string[];
};

export interface TabFilterProduct extends PageProps {
    product: { [key: string]: { data: Array<ProductType> } };
}

export interface Review {
    userId: number;
    comment: string;
    rating: number;
    createdAt: string; // You might want to use Date type if you handle dates
}

interface TrackingStep {
    title: string;
    status: 'completed' | 'current' | 'upcoming' | 'canceled';
    timestamp?: string;
    location?: string;
    trackingNumber?: string;
    carrier?: string;
    shippedDate?: string;
    subSteps?: {
        description: string;
        timestamp: string;
        location: string;
    }[];
}

export interface MockProducts {
    id: number;
    name: string;
    description: string;
    price: number;
    unit: string;
    discount: number;
    badge?: string;
    salesEndsIn?: Date;
    freeShipping?: boolean;
    category: string;
    imageUrl: string;
    stock: number;
    rating: number;
    information: Array<{
        label: string;
        value: string;
    }>;
    vendorName?: string;
    reviews: Review[];
    trackingSteps?: TrackingStep[];
}

export interface DashboardSidebarItem {
    id: number;
    title: string;
    icon?: string; // Optional icon class or component
    subMenu?: DashboardSidebarItem[]; // Optional sub-menu items
}

export type CategoiryList = {
    name: string;
    icon: IconType;
    href: string;
};

export type RecentlyViewedList = {
    image: string;
    name: string;
    price: number;
    discount?: number;
    newArrival?: boolean;
};

export type ServiceBlockType = {
    icon: IconType;
    title: string;
    description: string;
};

export type Attributes = {
    name: string;
    value: string[];
};

type ProductBrief = {
    detail: {
        description: string;
        features: string[];
        additionalInfo: Array<{
            label: string;
            value: string;
        }>;
    };
    information: Array<{
        label: string;
        value: string;
    }>;
    reviews: Array<{
        profileImage: string;
        name: string;
        description: string;
        rating: number;
    }>;
};

export type ProductDetailType = {
    image: string[];
    name: string;
    rating: number;
    reviews: number;
    inStock: boolean;
    price: number;
    discount: number;
    description: string;
    attributes: Attributes[];
    canReturn: boolean;
    freeDelivery: boolean;
    code: string;
    productBrief: ProductBrief;
};
export type TagsDataType = {
    title: string;
    href: string;
};

export type Item = {
    id: number;
    name: string;
};

export type BlogDataType = {
    category: string;
    title: string;
    date: string;
    views: number;
    readTimeInMinutes: number;
    image: string;
};

export type Coupon = {
    id: string;
    title: string;
    code: string;
    discount: { on: string; subCategory?: string };
    discountValue: { type: 'amount' | 'percentage'; value: number };
    expireDate: string;
    status: 'published' | 'draft';
};

export type MasonryImageType = {
    src: string;
    width: number;
    height: number;
    name: string;
    alt: string;
    type: string;
};

export type TableColumnsType<T = any> = {
    value: string;
    label: string;
    icon: ComponentType<React.SVGProps<SVGSVGElement>>;
    body?: (item: T) => ReactNode;
    className?: string;
};

export type Post = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    author: string;
    categories: { id: number; name: string }[];
    user: { name: string };
    status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
    created_at: string;
};

export type Category = {
    id: number | string;
    slug: string;
    name: string;
};

export type QuickAccessCategory = {
    id: number | string;
    slug: string;
    name: string;
    href: string;
    submenu: {
        name: string;
        href: string;
    }[];
};

export type DeliveryOption = {
    id: number | string;
    title: string;
    subtitle: string;
    // icon: LucideIcon
    icon: string;
};

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type MetaLink = {
    url: null | string;
    label: string;
    active: boolean;
};

export type Meta = {
    current_page: number;
    from: number;
    to: number;
    last_page: number;
    per_page: number;
    total: number;
    path: string;
    links: MetaLink[];
};

export type PaginationLinks = {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
};

export type Links = {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
};

export type Pagination = {
    links: PaginationLinks;
    meta: Meta;
};

export interface CustomPostPageProps extends PageProps {
    posts: { data: Post[]; links: Links; meta: Meta };
    filters: Filters;
    categories: Category[];
}
export interface CustomPostEditPageProps extends PageProps {
    post: Post;
}
export interface CustomProductPageProps extends PageProps {
    products: { data: ProductType[]; links: Links; meta: Meta };
    filters: Filters;
    categories: Category[];
}

export interface CustomProductPageProps extends CustomPageProps<ProductType> {
    products: PaginatedData<ProductType>;
}

export interface CustomDeliveryOptionPageProps extends PageProps {
    deliveryOptions: { data: DeliveryOption[]; links: Links; meta: Meta };
    filters: Filters;
}

export interface CustomCategoryPageProps extends PageProps {
    categories: { data: Category[]; links: Links; meta: Meta };
    filters: Filters;
}

export interface SearchInputProps {
    placeholder?: string;
    search: string | null;
    setParams: (params: any) => void;
    params: any;
    setTimeDebounce: (time: number) => void;
}

export type FileProps = {
    id: string;
    file_name: string;
    mime_type: string;
    custom_properties: any;
    generated_conversions: any;
    url: string;
    collection_name: string;
};

export type UserProps = {
    sn: number;
    id: string;
    name: string;
    status: boolean;
    slug: string;
    content: Array<{
        href: string;
        icon: string;
        id: number;
        name: string;
        slug: string;
    }>;
};

export type MenuProps = {
    sn: number;
    id: string;
    name: string;
    status: boolean;
    slug: string;
    created_at: string;
    content: Array<{
        href: string;
        icon: string;
        id: number;
        name: string;
        slug: string;
    }>;
};

export type FaqProps = {
    sn: number;
    id: string;
    question: string;
    answer: string;
    status: boolean;
};
export type NewsletterProps = {
    id: string;
    email: string;
    is_subscribed: boolean;
};

export type MediaUploadProps = {
    sn: number;
    id: string;
    title: string;
    description: string;
    status: boolean;
    files?: FileProps[];
};

export type TestinomialProps = {
    sn: number;
    id: string;
    initials: string;
    name: string;
    message: string;
    status: boolean;
    rating: number;
    position: string;
    files?: FileProps[];
};

export type BlogProps = {
    id: string;
    name: string;
    description: string;
    sub_title: string;
    categories: {
        id: string;
        name: string;
    };
    tags: string;
    date: string;
    readTimeInMinutes: number;
    image: string;
    status: boolean;
};

export type DeliveryMan = {
    sn: number;
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    status: string;
    firebase_token: string | null;
    dob: string | null;
    vehicle_type_id: number | null;
    credentials: { license_number: string; nid_number: string } | null;
};

export type ContactProps = {
    sn: number;
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
};

export type ColorProps = {
    sn: number;
    id: string;
    name: string;
    color_code: string;
    slug: string;
};

export type CategoryProps = {
    sn: number;
    id: string;
    name: string;
    slug: string;
    parent?: CategoryProps | null;
    description?: string;
    status: boolean;
};

export type UnitProps = {
    sn: number;
    id: string;
    name: string;
    status: boolean;
};

export type DeliveryOptionProps = {
    sn: number;
    id: string;
    title: string;
    sub_title: string;
    icon: string;
    status?: boolean;
};

export type SizeProps = {
    sn: number;
    id: string;
    name: string;
    size_code: string;
    slug?: string;
};

export type TagsProps = {
    id: string;
    name: string;
    slug: string;
    created_at: string;
};

export type BranchProps = {
    id: string;
    name: string;
    status: boolean;
    start_time: string;
    break_start: string;
    break_end: string;
    end_time: string;
    created_at: string;
    relation: {
        address: {
            address_line1: string;
            address_line2: string;
            landmark: string;
            country: string;
            state: string;
            city: string;
        };
        setting: {
            site_name: string;
            email: {
                primary: string;
                secondary: string;
            };
            phone: {
                primary: string;
            };
            social_links: {
                facebook: string;
                insta: string;
            };
        };
    };
};

export type VehicleTypeProp = {
    id: string;
    name: string;
    status: boolean;
    created_at: string;
};

export type ProductAttributeProps = {
    id: string;
    name: string;
    terms: string[];
    created_at: string;
};

export type HubProps = {
    id: string;
    name: string;
    status: boolean;
    description: string;
    created_at: string;
};

export type CompactCategoryCreate = {
    parentCategory: Array<Record<string, string>>;
    types: Array<Record<string, string>>;
};

export interface MenuPayload extends PageProps {
    data: MenuProps[];
    pagination: Pagination;
}

export type BrandProps = {
    id: string;
    sn: number;
    uuid: string;
    name: string;
    status: boolean;
    description: string;
    slug: string;
};

export type BadgeProps = {
    id: string;
    sn: number;
    uuid: string;
    name: string;
    sale_count: number;
    for: string;
    type: string;
    status: boolean;
    create_at: string;
    updated_at: string;
    deleted_at: string;
};

export interface PaginatedData<T> {
    data: T[];
    links: Links;
    meta: Meta;
}

export type MediaType = {
    id: string | number;
    url: string;
    type: string;
    name: string;
    alt?: string;
    size: number;
    height?: number;
    width?: number;
};

export interface CustomMediaPageProps extends PageProps {
    images: Array<MediaType>;
    videos: Array<MediaType>;
    files: Array<MediaType>;
}

export interface CustomPageProps<T> extends PageProps {
    filters: Filters;
    [key: string]: any; // optional to allow other props if needed
}

// export interface CustomMenuPageProps extends CustomPageProps<Menus> {
//   all_menus: PaginatedData<Menus>
// }

export interface CustomMenuEditPageProps extends CustomPageProps<MenuProps> {
    page_post: {
        [key: string]: any;
    };
}

export interface CustomBrandPageProps extends CustomPageProps<BrandProps> {
    all_brands: PaginatedData<BrandProps>;
}

export type Roles = {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    permissions: string[];
};

export type RoleProps = {
    id: string;
    name: string;
    guard_name: string;
    permissions: PermissionType;
    created_at: string;
};

export type PermissionType = Array<{ module: string; data: Array<{ id: string; name: string }> }>;

export type CompactRoleCreate = {
    allPermissions: PermissionType;
    role: { data: RoleProps };
};

export interface CustomRolePageProps extends PageProps {
    roles: { data: Roles[]; links: Links; meta: Meta };
    filters: Filters;
    categories: Category[];
}

export interface ZoomableImageProps {
    src: string;
    alt: string;
    className?: string;
    imgClassName?: string;
    zoomScale?: number;
}

// BACKEND_CHECK_NEEDED.
export type Filters = {
    search: string | null;
    limit: number | null;
    col: string | null;
    sort: 'asc' | 'desc' | null;
    filters: any;
};

export type TableColumn<T = any> = {
    value: string;
    label: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    sortable?: boolean;
    body?: (item: T) => React.ReactNode;
    className?: string;
};

export type OpenEditInSheetType = {
    status: boolean;
    data: { payload: FlashMessagePayload };
};

type DataTableRoutes<T> = {
    create?: { href: string; hasSheet?: boolean; sheetContent?: () => ReactNode };
    edit?: { href: string; hasSheet?: boolean; sheetContent?: (item: T) => ReactNode };
    show?: { href: string; sheetContent?: (item: T) => ReactNode };
    destroy?: string;
};
export type DataTableProps<T> = {
    data: T[];
    options: {
        columns: TableColumn<T>[];
        filters?: Filters;
        categories?: Category[];
        sortableColumns?: string[];
        searchPlaceholder?: string;
        bulkActions?: Array<{
            label: string;
            action: (selected: any) => void;
        }>;
        actions: DataTableRoutes<T>;
        pagination: Pagination;
        tableFilters?: {
            title: string;
            filter: string;
            options: { value: string; label: string }[];
        }[];
    };
};

// update the types later after backend integration.
export type Role = {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions: string[];
};
export interface CustomRoleEditPageProps extends PageProps {
    role: Role;
}
export type CustomPermissionState = Record<string, { parent: boolean; children: Record<string, boolean> }>;
export type RolePermission = Array<any>;
export type Permission = {
    id: number;
    menu_name: string;
    name: string;
    guard_name: string;
    created_at: string | null;
    updated_at: string | null;
};

export interface MultiCheckboxProps {
    data: Record<string, Permission[]>;
    selectedPermissions: RolePermission;
    onChange: (newState: CustomPermissionState) => void;
}
export interface CustomPermissionPageProps extends PageProps {
    role: Role;
    permissions: Record<string, Permission[]>;
    rolePermissions: RolePermission;
}

export type SidebarCategories = {
    name: string;
    value: string;
    numberOfItems: number;
};

export type SidebarTags = {
    id: number;
    title: string;
};

export type SidebarGallery = {
    name: string;
    image: string;
    href: string;
};

export type Color = {
    id: number;
    color: string;
    count: number;
};
export type RefundReasonProps = {
    id: string;
    name: string;
    status: boolean;
    created_at: string;
};
export type StaticOptionProps = {
    id: string;
    option_name: string;
    option_value: string;
    option_setting: any;
    created_at: string;
};
export type Size = {
    id: number;
    name: string;
    size: string;
    count: number;
};

export type ProductAttributes = {
    colors: Color[];
    size: Size[];
};

export type PriceRange = {
    highest: number;
    lowest: number;
};

export type ShopPageFilters = {
    categories: SidebarCategories[];
    attribute: ProductAttributes;
    tags: SidebarTags[];
    price: PriceRange;
    gallery: SidebarGallery[];
};

export type ProductVariantType = {
    id: number;
    'variant-name': string;
    price: string;
    color: string[];
    size: string[];
    'base-price': string;
    status: boolean;
    stock: string;
};

export type WithID = {
    id: string;
    uuid?: string;
};
