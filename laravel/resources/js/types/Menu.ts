// export interface MenuContent {
//     href: string;
//     icon: string;
//     title: string;
//     parent_id?: number | null;
// }

export interface MenuItemProps {
    id: number;
    title: string;
    href: string;
    name: string;
    icon: string;
    subMenu: MenuItemProps[];
}

export type Menu = {
    id: number;
    name: string;
    slug: string;
};
