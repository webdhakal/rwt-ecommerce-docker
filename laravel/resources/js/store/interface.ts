export interface ParamsI {
    data?: FormData | { [key: string]: unknown };
    closeModal?: () => void;
    logout?: () => void;
    params?:
        | string
        | {
              limit?: number;
              page?: number;
              [key: string]: unknown;
          };
    id?: string;
    // navigate?: Navigat;
    onClose?: () => void;
    actionBy?: string;
}

export interface PaginationState {
    page: number;
    limit: number;
}
