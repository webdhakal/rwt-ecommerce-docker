import { Badge } from '@/shadcn/ui/badge';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
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
                    <TabsList className="mb-8 grid w-full grid-cols-3">
                        <TabsTrigger value="wishlist-items">Wishlist ({wishlistItems.length})</TabsTrigger>
                        <TabsTrigger value="purchases">Past Purchases</TabsTrigger>
                        <TabsTrigger value="stores">Followed Stores ({followedStores.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="wishlist-items">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Your Wishlist ({wishlistItems.length} items)</h3>
                            <Button variant="outline" size="sm" className="h-8">
                                <ShoppingCart className="mr-2 h-4 w-4" /> Add All to Cart
                            </Button>
                        </div>
                        <div className="divide-y rounded-lg border">
                            {wishlistItems.map((item) => (
                                <div key={item.id} className="p-4 transition-colors hover:bg-muted/50">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 flex-shrink-0 rounded-lg border-2 border-dashed bg-muted" />
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <h4 className="truncate font-medium text-foreground">{item.name}</h4>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                                                </Button>
                                            </div>
                                            <p className="truncate text-sm text-muted-foreground">{item.store}</p>
                                            <div className="mt-1 flex items-center gap-2">
                                                <span className="text-base font-semibold text-primary">Rs. {item.price}</span>
                                                <span className="text-sm text-muted-foreground line-through">Rs. {item.originalPrice}</span>
                                                <Badge
                                                    variant="secondary"
                                                    className="h-5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                >
                                                    <TrendingDown className="mr-1 h-3 w-3" /> {item.discount}%
                                                </Badge>
                                            </div>
                                        </div>
                                        <Button size="sm" className="ml-2 whitespace-nowrap">
                                            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="purchases">
                        <div className="space-y-4">
                            <h3 className="mb-4 text-lg font-semibold">Recent Orders</h3>
                            {orders.map((order) => (
                                <Card key={order.id}>
                                    <CardContent className="flex items-center justify-between py-4">
                                        <div className="flex items-center gap-4">
                                            {getStatusIcon(order.status)}
                                            <div>
                                                <p className="font-medium">Order #{order.id}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {order.date} • {order.items} items
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Badge
                                                variant={
                                                    order.status === 'Delivered'
                                                        ? 'default'
                                                        : order.status === 'Shipped'
                                                          ? 'secondary'
                                                          : 'destructive'
                                                }
                                            >
                                                {order.status}
                                            </Badge>
                                            <p className="mt-1 text-lg font-semibold">Rs. {order.total}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
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
