import { Badge } from '@/shadcn/ui/badge';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shadcn/ui/table';
import { CheckCircle, Clock, Package, Truck, XCircle } from 'lucide-react';
// import { cn } from '@/lib/utils';

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

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'Delivered':
            return 'default';
        case 'Shipped':
            return 'outline';
        case 'Cancelled':
            return 'destructive';
        default:
            return 'secondary';
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
                        <span>{orders.length} orders in the last 30 days</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-2 rounded-lg">
                <div className="relative overflow-x-auto rounded-md border">
                    <Table className="w-full">
                        <TableHeader className="bg-muted/50 sm:table-header-group">
                            <TableRow>
                                <TableHead className="text-center">#</TableHead>
                                <TableHead className="text-center">Order</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-center">Date</TableHead>
                                <TableHead className="text-center">Items</TableHead>
                                <TableHead className="text-center">Total</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order, index) => (
                                <TableRow key={order.id} className="group border-b hover:bg-muted/50 text-center">
                                    {/* mobile view */}
                                    {/* <TableCell className="block py-4 px-4 sm:hidden">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0">{getStatusIcon(order.status)}</div>

                                            <div className="flex flex-col gap-1 flex-1">
                                                <div className="font-medium">Order #{order.id}</div>

                                                <div className="flex items-center gap-2 text-xs">
                                                    <Badge variant={getStatusVariant(order.status)} className="h-5 text-[10px]">
                                                        {order.status}
                                                    </Badge>
                                                    <span className="text-muted-foreground">
                                                        {order.items} {order.items > 1 ? "items" : "item"}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="font-semibold">Rs. {order.total}</span>

                                                    <div className="flex gap-2">
                                                        <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                                                            Details
                                                        </Button>
                                                        <Button size="sm" className="h-8 px-2 text-xs">
                                                            Buy Again
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell> */}


                                    {/* Desktop View */}
                                    <TableCell className=" py-4 sm:table-cell">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className=" py-4 pl-6 pr-4 font-medium sm:table-cell">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-shrink-0">
                                                {getStatusIcon(order.status)}
                                            </div>
                                            <span>#{order.id}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className=" py-4 sm:table-cell text-center">
                                        <Badge variant={getStatusVariant(order.status)} className="h-6">
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground sm:table-cell">
                                        {order.date}
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground sm:table-cell">
                                        {order.items} {order.items > 1 ? 'items' : 'item'}
                                    </TableCell>
                                    <TableCell className=" py-4 font-medium sm:table-cell sm:text-right">
                                        Rs. {order.total}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center items-center gap-2">
                                            <Button variant="outline" size="sm" className="h-8">
                                                Details
                                            </Button>
                                            <Button size="sm" className="h-8">
                                                Buy Again
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {orders.length === 0 && (
                        <div className="flex h-32 items-center justify-center text-muted-foreground">
                            No orders found
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
