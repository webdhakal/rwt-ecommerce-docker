// src/types/Notification.ts

export interface Notification {
    id: number;
    message: string;
    type: 'info' | 'success' | 'error';
    createdAt: string; // ISO date string
}

export interface NotificationProps {
    notifications: Notification[];
    onDismiss: (notificationId: number) => void;
}
