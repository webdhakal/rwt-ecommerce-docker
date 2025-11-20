// src/types/Category.ts

export interface Category {
    id: number;
    name: string;
    slug: string;
    status: boolean;
    description?: string;
    image: string;
    created_at: string;
}

export interface CategoryProps {
    categories: Category[];
    onSelectCategory: (categoryId: number) => void;
}
