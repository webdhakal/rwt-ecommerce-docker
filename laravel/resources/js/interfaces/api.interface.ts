// src/interfaces/api.interface.ts
export interface PaginationMeta {
    total?: number; // Total number of items
    count?: number; // Number of items in current page
    per_page?: number; // Items per page
    current_page?: number; // Current page number
    total_pages?: number; // Total available pages (renamed from last_page)
    has_more?: boolean; // Whether there are more pages available
}

export interface PaginationLinks {
    next: string | null;
    prev: string | null;
}

export interface ApiResponse<T> {
    method: string;
    status: 'ok' | 'error';
    payload: {
        data: T;
        meta?: { timestamp: string };
        pagination?: PaginationMeta;
    };
}

export interface AlternateApiResponse<T> {
    method: string;
    message?: string;
    status: 'ok' | 'error';
    payload?: {
        data: T;
        pagination: PaginationMeta;
    };
}
