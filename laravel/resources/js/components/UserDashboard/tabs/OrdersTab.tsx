import { Badge } from '@/shadcn/ui/badge';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { CheckCircle, Clock, Package, Truck, XCircle } from 'lucide-react';

const orders = [
    { id: 'ORD001', date: 'Nov 15, 2025', status: 'Delivered', total: 899, items: 2 },
    { id: 'ORD002', date: 'Nov 10, 2025', status: 'Shipped', total: 1299, items: 1 },
    { id: 'ORD003', date: 'Nov 05, 2025', status: 'Cancelled', total: 549, items: 1 },
    { id: 'ORD004', date: 'Oct 28, 2025', status: 'Delivered', total: 2499, items: 3 },
];

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Delivered':
            return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
        case 'Shipped':
            return <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
        case 'Cancelled':
            return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
        default:
            return <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
    }
};

export default function OrdersTab() {
    return (
        <Card className="border shadow-xl">
            <CardHeader className="px-4 sm:px-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-xl sm:text-2xl">My Orders</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Package className="h-4 w-4 flex-shrink-0" />
                        <span>4 orders in the last 30 days</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
                <div className="divide-y">
                    {orders.map((order) => (
                        <div key={order.id} className="p-4 transition-colors hover:bg-muted/50 sm:rounded-lg sm:p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 flex-shrink-0">
                                        {getStatusIcon(order.status)}
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="text-base font-medium sm:text-base">Order #{order.id}</p>
                                            <Badge
                                                variant={
                                                    order.status === 'Delivered'
                                                        ? 'default'
                                                        : order.status === 'Shipped'
                                                            ? 'outline'
                                                            : 'destructive'
                                                }
                                                className="h-6 text-xs md:h-8 md:text-sm"
                                            >
                                                {order.status}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {order.date} • {order.items} {order.items > 1 ? 'items' : 'item'}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-col-reverse items-start gap-3 sm:mt-0 sm:flex-row sm:items-center sm:gap-4">
                                    <p className="text-lg font-semibold sm:text-right">Rs. {order.total}</p>
                                    <div className="flex w-full gap-2 sm:w-auto">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 flex-1 sm:flex-none sm:px-4"
                                        >
                                            <span className="sm:hidden">Details</span>
                                            <span className="hidden sm:inline">View Details</span>
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="h-8 flex-1 sm:flex-none sm:px-4"
                                        >
                                            <span className="sm:hidden">Buy</span>
                                            <span className="hidden sm:inline">Buy Again</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
