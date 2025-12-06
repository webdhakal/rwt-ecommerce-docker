import { VariantProps } from 'class-variance-authority';
import { ReactElement, ReactNode } from 'react';
import { Config } from 'ziggy-js';
import { MenuItemProps } from './Menu';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface FlashMessagePayload {
    id: string;
    name: string;
    status: number;
}
export interface FlashMessage {
    type: string;
    message: string;
    status: string;
    success: any;
    error: any;
    payload: FlashMessagePayload;
}

export type Translations = {
    [key: string]: string;
};

type CompactData = Record<string, string>; // Adjust value type if needed

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    page?: {
        compact?: CompactData;
    };
    menus: MenuItemProps[];
    flash: FlashMessage;
    appName: string;
    ziggy: Config & { location: string };
    language: Translations;
};

export type StatusCode = 503 | 500 | 404 | 403;

export interface ErrorMessage {
    title: string;
    description: string;
}

export interface ErrorPageProps {
    status: StatusCode;
}

interface ButtonWithLoadingProps extends ButtonProps {
    className?: string;
    processing: boolean;
    label: React.ReactNode;
    variant?: VariantProps;
    onclick?: () => void;
}

interface CloseButtonProps extends ButtonProps {
    onClick?: () => void;
}

export type BreadcrumbItemType = {
    label?: string;
    href?: string;
};

export interface BreadcrumbsProps {
    breadcrumbs: BreadcrumbItemType[];
}

export interface SidebarItem {
    title: string;
    url?: string;
    icon?: string | ComponentType<{}>;
    isActive?: boolean;
    group?: string;
    items?: SidebarItem[];
}

interface NavigationSubMenu {
    name: string;
    href: string;
    icon: ReactNode;
    current: boolean;
    permission?: string | null;
    role?: string | null;
    subs: NavigationSubMenu[];
}

interface NavigationGroupItemProps {
    group: string;
    permission?: string | null;
    role?: string | null;
    menu: NavigationSubMenu[];
}

interface NavigationProps {
    navigations: NavigationGroupItemProps[];
}

export interface NavigationLinkItem {
    href: string;
    current: boolean;
    icon: ReactElement;
    name: string;
}

interface UseOpenSubMenuItem {
    current: boolean;
    subMenu: UseOpenSubMenuItem[];
}

interface UseOpenNavigationItem {
    subMenu: UseOpenSubMenuItem[];
}

export interface UseOpenSubMenuProps {
    navigations: UseOpenNavigationItem[];
}

export interface NavigationGroupProps {
    nav: NavigationGroupItemProps;
    openMenuIdx: number;
    handleMenuClick: (index: number) => void;
}

export interface CollapsibleMenuProps {
    menu: NavigationSubMenu;
    isOpen: boolean;
    onOpenChange?: (open: boolean) => void;
}
