export type StatusCode = 503 | 500 | 404 | 403;

export interface ErrorMessage {
    title: string;
    description: string;
}

export interface ErrorPageProps {
    status: StatusCode;
}
