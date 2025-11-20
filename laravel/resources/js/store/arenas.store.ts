// src/stores/auth.store.ts
import { ApiResponse } from '@/interfaces/api.interface';
import { ArenaI } from '@/interfaces/arena.interface';
import { create } from 'zustand';

interface ArenaState {
    arenas: ApiResponse<ArenaI[]>;
}

const initialState = {
    arenas: {
        data: {
            is_paginated: true,
            items: [],
            links: {
                next: null,
                prev: null,
            },
            meta: {
                total: 0,
                per_page: 0,
                current_page: 0,
                last_page: 0,
            },
        },
        success: false,
        method: 'GET',
        status: 'ok' as 'ok' | 'error',
    },
};

export const useArenaStore = create<ArenaState>(() => ({
    ...initialState,
}));
