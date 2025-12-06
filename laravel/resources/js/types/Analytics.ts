// src/types/Analytics.ts

export interface SalesData {
    totalSales: number;
    totalOrders: number;
    totalCustomers: number;
    salesByMonth: { month: string; sales: number }[];
}

export interface AnalyticsProps {
    salesData: SalesData;
}
