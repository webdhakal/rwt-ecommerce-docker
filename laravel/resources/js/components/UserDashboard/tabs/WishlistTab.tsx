import { Badge } from '@/shadcn/ui/badge';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shadcn/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs';
import { BadgeCheck, CheckCircle, Clock, ShoppingCart, Star, Trash2, TrendingDown, Truck, XCircle } from 'lucide-react';

const wishlistItems = [
    { id: 1, name: 'Monster Truck Toy Cars Push Cars For Toddlers', price: 133, originalPrice: 240, discount: 45, store: 'Deal Den', inStock: true },
    {
        id: 2,
        name: 'Wireless Bluetooth Earbuds with Noise Cancellation',
        price: 899,
        originalPrice: 1999,
        discount: 55,
        store: 'TechHub',
        inStock: true,
    },
];

const orders = [
    { id: 'ORD001', date: 'Nov 15, 2025', status: 'Delivered', total: 899, items: 2 },
    { id: 'ORD002', date: 'Nov 10, 2025', status: 'Shipped', total: 1299, items: 1 },
    { id: 'ORD003', date: 'Nov 05, 2025', status: 'Cancelled', total: 549, items: 1 },
    { id: 'ORD004', date: 'Oct 28, 2025', status: 'Delivered', total: 2499, items: 3 },
];

const followedStores = [
    { id: 1, name: 'TechHub Official', followers: '128K', rating: 4.8, verified: true },
    { id: 2, name: 'Fashion Factory', followers: '89K', rating: 4.6, verified: true },
    { id: 3, name: 'Home Essentials', followers: '56K', rating: 4.9, verified: false },
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

export default function WishlistTab() {
    return (
        <Card className="border shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl">My Wishlist & Followed Stores</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="wishlist-items" className="w-full">
                    <TabsList
                        className="mb-8 flex sm:grid sm:grid-cols-3 gap-4 pl-12 md:pl-1 overflow-x-auto no-scrollbar">
                        <TabsTrigger value="wishlist-items" className="flex items-center gap-2">
                            Wishlist ({wishlistItems.length})
                        </TabsTrigger>

                        <TabsTrigger value="purchases" className="flex items-center gap-2">
                            Past Purchases
                        </TabsTrigger>

                        <TabsTrigger value="stores" className="flex items-center gap-2">
                            Followed Stores ({followedStores.length})
                        </TabsTrigger>
                    </TabsList>


                    <TabsContent value="wishlist-items">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Your Wishlist ({wishlistItems.length} items)</h3>
                            <Button variant="outline" size="sm" className="h-8">
                                <ShoppingCart className="mr-2 h-4 w-4" /> Add All to Cart
                            </Button>
                        </div>
                        <div className="relative overflow-x-auto rounded-md border">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead className="w-[50px]">#</TableHead>
                                        <TableHead className="min-w-[200px]">Product</TableHead>
                                        <TableHead className="text-center">Store</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                        <TableHead className="text-center">Discount</TableHead>
                                        <TableHead className="text-center">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {wishlistItems.map((item, index) => (
                                        <TableRow key={item.id} className="group hover:bg-muted/50">
                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-12 w-12 flex-shrink-0 rounded-md border bg-muted" />
                                                    <div className="min-w-0">
                                                        <h4 className="line-clamp-1 text-sm font-medium text-foreground">{item.name}</h4>
                                                        <div className="mt-0.5 flex items-center gap-2 sm:hidden">
                                                            <span className="text-sm font-semibold text-primary">Rs. {item.price}</span>
                                                            <span className="text-xs text-muted-foreground line-through">Rs. {item.originalPrice}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center text-sm">
                                                <span className="hidden sm:block">{item.store}</span>
                                                <div className="mt-1 sm:hidden">
                                                    <Badge variant="outline" className="text-xs">
                                                        {item.store}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-foreground">Rs. {item.price}</span>
                                                    <span className="text-xs text-muted-foreground line-through">Rs. {item.originalPrice}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    variant="secondary"
                                                    className="mx-auto h-6 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                >
                                                    <TrendingDown className="mr-1 h-3 w-3" /> {item.discount}%
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" className="h-8 w-8 p-0">
                                                        <ShoppingCart className="h-3 w-3" />
                                                        {/* <span className="hidden sm:inline">Add to Cart</span> */}
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {wishlistItems.length === 0 && (
                                <div className="flex h-32 items-center justify-center text-muted-foreground">
                                    No items in wishlist
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="purchases">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Recent Orders</h3>
                        </div>
                        <div className="relative overflow-x-auto rounded-md border">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead className="w-[50px]">#</TableHead>
                                        <TableHead className="text-center">Order</TableHead>
                                        <TableHead className="text-center">Status</TableHead>
                                        <TableHead className="text-center">Date</TableHead>
                                        <TableHead className="text-center">Items</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                        <TableHead className="text-center">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map((order, index) => (
                                        <TableRow key={order.id} className="group hover:bg-muted/50">
                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-shrink-0">
                                                        {getStatusIcon(order.status)}
                                                    </div>
                                                    <span className="font-medium">#{order.id}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    variant={
                                                        order.status === 'Delivered'
                                                            ? 'default'
                                                            : order.status === 'Shipped'
                                                                ? 'secondary'
                                                                : 'destructive'
                                                    }
                                                    className="mx-auto"
                                                >
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center text-sm text-muted-foreground">
                                                {order.date}
                                            </TableCell>
                                            <TableCell className="text-center text-sm text-muted-foreground">
                                                {order.items} {order.items > 1 ? 'items' : 'item'}
                                            </TableCell>
                                            <TableCell className="text-right font-medium">
                                                Rs. {order.total}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="outline" size="sm" className="h-8">
                                                        View Details
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
                    </TabsContent>

                    <TabsContent value="stores">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {followedStores.map((store) => (
                                <Card key={store.id} className="transition-shadow hover:shadow-md">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-16 w-16 rounded-full border-2 border-dashed bg-muted" />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-semibold">{store.name}</h4>
                                                    {store.verified && <BadgeCheck className="h-5 w-5 text-blue-500" />}
                                                </div>
                                                <p className="text-sm text-muted-foreground">{store.followers} followers</p>
                                                <div className="mt-1 flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                                                    <span className="text-sm font-medium">{store.rating}</span>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Unfollow
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
