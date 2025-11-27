import { Package, CheckCircle, Truck, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { Button } from '@/shadcn/ui/button';
import { Badge } from '@/shadcn/ui/badge';
import { Alert, AlertDescription } from '@/shadcn/ui/alert';
import { Separator } from '@/shadcn/ui/separator';

const orders = [
    { id: "ORD001", date: "Nov 15, 2025", status: "Delivered", total: 899, items: 2 },
    { id: "ORD002", date: "Nov 10, 2025", status: "Shipped", total: 1299, items: 1 },
    { id: "ORD003", date: "Nov 05, 2025", status: "Cancelled", total: 549, items: 1 },
    { id: "ORD004", date: "Oct 28, 2025", status: "Delivered", total: 2499, items: 3 },
];

const getStatusIcon = (status: string) => {
    switch (status) {
        case "Delivered": return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
        case "Shipped": return <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
        case "Cancelled": return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
        default: return <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
    }
};

export default function OrdersTab() {
    return (
        <Card className="shadow-xl border">
            <CardHeader>
                <CardTitle className="text-2xl">My Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <Alert className="border-primary/20 bg-primary/5">
                        <Package className="h-4 w-4" />
                        <AlertDescription>You have 4 orders in the last 30 days</AlertDescription>
                    </Alert>
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <Card key={order.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {getStatusIcon(order.status)}
                                            <div>
                                                <p className="font-semibold text-lg">Order #{order.id}</p>
                                                <p className="text-sm text-muted-foreground">{order.date} • {order.items} items</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Badge variant={order.status === 'Delivered' ? 'default' : order.status === 'Shipped' ? 'secondary' : 'destructive'}>
                                                {order.status}
                                            </Badge>
                                            <p className="text-2xl font-bold mt-2">Rs. {order.total}</p>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="flex justify-end gap-3">
                                        <Button variant="outline">View Details</Button>
                                        <Button className="bg-primary hover:bg-primary/90">Buy Again</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}