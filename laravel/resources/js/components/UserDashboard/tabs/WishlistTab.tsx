import { ShoppingCart, Trash2, TrendingDown, Star, BadgeCheck, CheckCircle, Truck, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { Button } from '@/shadcn/ui/button';
import { Badge } from '@/shadcn/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs';

const wishlistItems = [
    { id: 1, name: "Monster Truck Toy Cars Push Cars For Toddlers", price: 133, originalPrice: 240, discount: 45, store: "Deal Den", inStock: true },
    { id: 2, name: "Wireless Bluetooth Earbuds with Noise Cancellation", price: 899, originalPrice: 1999, discount: 55, store: "TechHub", inStock: true },
];

const orders = [
    { id: "ORD001", date: "Nov 15, 2025", status: "Delivered", total: 899, items: 2 },
    { id: "ORD002", date: "Nov 10, 2025", status: "Shipped", total: 1299, items: 1 },
    { id: "ORD003", date: "Nov 05, 2025", status: "Cancelled", total: 549, items: 1 },
    { id: "ORD004", date: "Oct 28, 2025", status: "Delivered", total: 2499, items: 3 },
];

const followedStores = [
    { id: 1, name: "TechHub Official", followers: "128K", rating: 4.8, verified: true },
    { id: 2, name: "Fashion Factory", followers: "89K", rating: 4.6, verified: true },
    { id: 3, name: "Home Essentials", followers: "56K", rating: 4.9, verified: false },
];

const getStatusIcon = (status: string) => {
    switch (status) {
        case "Delivered": return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
        case "Shipped": return <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
        case "Cancelled": return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
        default: return <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
    }
};

export default function WishlistTab() {
    return (
        <Card className="shadow-xl border">
            <CardHeader>
                <CardTitle className="text-2xl">My Wishlist & Followed Stores</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="wishlist-items" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="wishlist-items">Wishlist ({wishlistItems.length})</TabsTrigger>
                        <TabsTrigger value="purchases">Past Purchases</TabsTrigger>
                        <TabsTrigger value="stores">Followed Stores ({followedStores.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="wishlist-items" className="space-y-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">Your Wishlist</h3>
                            <Button className="bg-primary hover:bg-primary/90">Add All to Cart</Button>
                        </div>
                        {wishlistItems.map((item) => (
                            <div key={item.id} className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-6">
                                    <div className="bg-muted border-2 border-dashed rounded-xl w-24 h-24 flex-shrink-0" />
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-medium text-foreground line-clamp-2">{item.name}</h4>
                                                <p className="text-sm text-muted-foreground mt-1">{item.store}</p>
                                            </div>
                                            <Button variant="ghost" size="icon"><Trash2 className="h-5 w-5 text-muted-foreground" /></Button>
                                        </div>
                                        <div className="mt-4 flex items-center gap-4">
                                            <div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-2xl font-bold text-primary">Rs. {item.price}</span>
                                                    <span className="text-lg text-muted-foreground line-through">Rs. {item.originalPrice}</span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                                        <TrendingDown className="h-3 w-3 mr-1" /> -{item.discount}%
                                                    </Badge>
                                                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Price dropped</span>
                                                </div>
                                            </div>
                                            <Button className="bg-primary hover:bg-primary/90 ml-auto">
                                                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="purchases">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                            {orders.map((order) => (
                                <Card key={order.id}>
                                    <CardContent className="flex items-center justify-between py-4">
                                        <div className="flex items-center gap-4">
                                            {getStatusIcon(order.status)}
                                            <div>
                                                <p className="font-medium">Order #{order.id}</p>
                                                <p className="text-sm text-muted-foreground">{order.date} • {order.items} items</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Badge variant={order.status === 'Delivered' ? 'default' : order.status === 'Shipped' ? 'secondary' : 'destructive'}>
                                                {order.status}
                                            </Badge>
                                            <p className="text-lg font-semibold mt-1">Rs. {order.total}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="stores">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {followedStores.map((store) => (
                                <Card key={store.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-muted border-2 border-dashed rounded-full w-16 h-16" />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-semibold">{store.name}</h4>
                                                    {store.verified && <BadgeCheck className="h-5 w-5 text-blue-500" />}
                                                </div>
                                                <p className="text-sm text-muted-foreground">{store.followers} followers</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                                    <span className="text-sm font-medium">{store.rating}</span>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">Unfollow</Button>
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