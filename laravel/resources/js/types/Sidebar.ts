export interface SidebarColor {
    id: string;
    color_code: string;
    slug: string;
}
export interface SidebarSize {
    id: string;
    size_code: string;
    slug: string;
}
export interface SidebarBrand {
    id: string;
    name: string;
    slug: string;
}
export interface SidebarVendor {
    id: string;
    name?: string;
    slug?: string;
}
export interface SidebarCategory {
    id: string;
    name: string;
    slug: string;
}
export interface SidebarPrice {
    min: string;
    max: string;
}

export interface SidebarData {
    colors: SidebarColor[];
    sizes: SidebarSize[];
    brands: SidebarBrand[];
    vendors: SidebarVendor[];
    categories: SidebarCategory[];
    price: SidebarPrice;
}

export interface FilterState {
    price_range?: { min: string; max: string };
    brands?: string[];
    vendors?: string[];
    categories?: string[];
    ratings?: number[];
    colors?: string[];
    sizes?: string[];
    sort_by?: string;
}

export interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    filters: FilterState;
    onFilterChange: (filterType: keyof FilterState, value: any) => void;
    onClearFilters: () => void;
    isMobile?: boolean;
    sidebar: SidebarData;
    onFiltersApply: () => void;
}
