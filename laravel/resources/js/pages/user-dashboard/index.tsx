'use client';

import { useState } from 'react';
import {
    Heart, ShoppingCart, Package, User, MapPin, CreditCard, Star, Store,
    ArrowRight, Trash2, BadgeCheck, TrendingDown, Truck, Clock, CheckCircle,
    XCircle, Home, Plus, Edit, CreditCard as CardIcon, Banknote
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { Button } from '@/shadcn/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar';
import { Badge } from '@/shadcn/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs';
import { Separator } from '@/shadcn/ui/separator';
import { Alert, AlertDescription } from '@/shadcn/ui/alert';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState('wishlist');

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

    const addresses = [
        { id: 1, type: "Home", name: "Pramesh Dhakal", address: "Kupondole, Lalitpur, Nepal", phone: "+977 9841234567", isDefault: true },
        { id: 2, type: "Office", name: "Pramesh Dhakal", address: "Pulchowk, Lalitpur", phone: "+977 9812345678", isDefault: false },
    ];

    const payments = [
        { id: 1, type: "card", last4: "4242", brand: "Visa", expiry: "12/27", isDefault: true },
        { id: 2, type: "cod", label: "Cash on Delivery", isDefault: false },
    ];

    const reviews = [
        { id: 1, product: "Wireless Earbuds", rating: 5, date: "Nov 12, 2025", comment: "Amazing sound quality and battery life!" },
        { id: 2, product: "Smart Watch", rating: 4, date: "Oct 20, 2025", comment: "Good but app needs improvement." },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Delivered": return <CheckCircle className="h-5 w-5 text-green-600" />;
            case "Shipped": return <Truck className="h-5 w-5 text-blue-600" />;
            case "Cancelled": return <XCircle className="h-5 w-5 text-red-600" />;
            default: return <Clock className="h-5 w-5 text-yellow-600" />;
        }
    };

    return (
        <>
            <GuestLayout>
                <Head title="User Dashboard" />
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {/* Sidebar */}
                            <aside className="lg:col-span-1">
                                <Card className="shadow-lg border-0">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg">My Account</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <nav className="space-y-2">
                                            {[
                                                { icon: User, label: 'Manage My Account', tab: 'profile' },
                                                { icon: Package, label: 'My Orders', tab: 'orders' },
                                                { icon: Heart, label: 'My Wishlist & Followed Stores', tab: 'wishlist' },
                                                { icon: Star, label: 'My Reviews', tab: 'reviews' },
                                                { icon: MapPin, label: 'Address Book', tab: 'addresses' },
                                                { icon: CreditCard, label: 'Payment Options', tab: 'payments' },
                                                { icon: Store, label: 'Sell on Platform', tab: 'sell' },
                                            ].map((item) => (
                                                <button
                                                    key={item.label}
                                                    onClick={() => setActiveTab(item.tab)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${activeTab === item.tab
                                                        ? 'bg-orange-50 text-orange-600 font-medium shadow-sm'
                                                        : 'hover:bg-gray-100 text-gray-700'
                                                        }`}
                                                >
                                                    <item.icon className="h-5 w-5" />
                                                    <span>{item.label}</span>
                                                    {activeTab === item.tab && <ArrowRight className="ml-auto h-4 w-4" />}
                                                </button>
                                            ))}
                                        </nav>
                                    </CardContent>
                                </Card>
                            </aside>

                            {/* Main Content */}
                            <main className="lg:col-span-3">
                                <Card className="shadow-xl border-0">
                                    <CardHeader>
                                        <CardTitle className="text-2xl">
                                            {activeTab === 'wishlist' && 'My Wishlist & Followed Stores'}
                                            {activeTab === 'orders' && 'My Orders'}
                                            {activeTab === 'reviews' && 'My Reviews & Ratings'}
                                            {activeTab === 'addresses' && 'Address Book'}
                                            {activeTab === 'payments' && 'Payment Options'}
                                            {activeTab === 'profile' && 'Manage My Account'}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>

                                        {/* My Wishlist & Stores */}
                                        {activeTab === 'wishlist' && (
                                            <Tabs defaultValue="wishlist-items" className="w-full">
                                                <TabsList className="grid w-full grid-cols-3 mb-8">
                                                    <TabsTrigger value="wishlist-items">Wishlist ({wishlistItems.length})</TabsTrigger>
                                                    <TabsTrigger value="purchases">Past Purchases</TabsTrigger>
                                                    <TabsTrigger value="stores">Followed Stores ({followedStores.length})</TabsTrigger>
                                                </TabsList>

                                                <TabsContent value="wishlist-items" className="space-y-6">
                                                    <div className="flex justify-between items-center mb-6">
                                                        <h3 className="text-lg font-semibold">Your Wishlist</h3>
                                                        <Button className="bg-orange-500 hover:bg-orange-600">Add All to Cart</Button>
                                                    </div>
                                                    {wishlistItems.map((item) => (
                                                        <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                                            <div className="flex items-start gap-6">
                                                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 flex-shrink-0" />
                                                                <div className="flex-1">
                                                                    <div className="flex items-start justify-between">
                                                                        <div>
                                                                            <h4 className="font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                                                                            <p className="text-sm text-gray-500 mt-1">{item.store}</p>
                                                                        </div>
                                                                        <Button variant="ghost" size="icon"><Trash2 className="h-5 w-5 text-gray-400" /></Button>
                                                                    </div>
                                                                    <div className="mt-4 flex items-center gap-4">
                                                                        <div>
                                                                            <div className="flex items-baseline gap-2">
                                                                                <span className="text-2xl font-bold text-orange-600">Rs. {item.price}</span>
                                                                                <span className="text-lg text-gray-400 line-through">Rs. {item.originalPrice}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-2 mt-2">
                                                                                <Badge variant="secondary" className="bg-green-100 text-green-700">
                                                                                    <TrendingDown className="h-3 w-3 mr-1" /> -{item.discount}%
                                                                                </Badge>
                                                                                <span className="text-sm font-medium text-green-600">Price dropped</span>
                                                                            </div>
                                                                        </div>
                                                                        <Button className="bg-orange-500 hover:bg-orange-600 ml-auto">
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
                                                                            <p className="text-sm text-gray-500">{order.date} • {order.items} items</p>
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
                                                                        <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16" />
                                                                        <div className="flex-1">
                                                                            <div className="flex items-center gap-2">
                                                                                <h4 className="font-semibold">{store.name}</h4>
                                                                                {store.verified && <BadgeCheck className="h-5 w-5 text-blue-500" />}
                                                                            </div>
                                                                            <p className="text-sm text-gray-500">{store.followers} followers</p>
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
                                        )}

                                        {/* My Orders */}
                                        {activeTab === 'orders' && (
                                            <div className="space-y-6">
                                                <Alert className="border-orange-200 bg-orange-50">
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
                                                                            <p className="text-sm text-gray-500">{order.date} • {order.items} items</p>
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
                                                                    <Button className="bg-orange-500 hover:bg-orange-600">Buy Again</Button>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* My Reviews */}
                                        {activeTab === 'reviews' && (
                                            <div className="space-y-6">
                                                {reviews.map((review) => (
                                                    <Card key={review.id}>
                                                        <CardContent className="pt-6">
                                                            <div className="flex items-start gap-4">
                                                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 flex-shrink-0" />
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2">
                                                                        <h4 className="font-medium">{review.product}</h4>
                                                                        <span className="text-sm text-gray-500">• {review.date}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1 my-2">
                                                                        {[...Array(5)].map((_, i) => (
                                                                            <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                                                                        ))}
                                                                    </div>
                                                                    <p className="text-gray-700">{review.comment}</p>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        )}

                                        {/* Address Book */}
                                        {activeTab === 'addresses' && (
                                            <div className="space-y-6">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-lg font-semibold">Your Addresses</h3>
                                                    <Button><Plus className="mr-2 h-4 w-4" /> Add Address</Button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {addresses.map((addr) => (
                                                        <Card key={addr.id} className={addr.isDefault ? "ring-2 ring-orange-500" : ""}>
                                                            <CardContent className="pt-6">
                                                                <div className="flex items-start justify-between">
                                                                    <div className="flex items-center gap-3">
                                                                        <Home className="h-6 w-6 text-gray-400" />
                                                                        <div>
                                                                            <p className="font-semibold">{addr.type} {addr.isDefault && <Badge className="ml-2">Default</Badge>}</p>
                                                                            <p className="text-sm text-gray-700 mt-1">{addr.name}</p>
                                                                            <p className="text-sm text-gray-600">{addr.address}</p>
                                                                            <p className="text-sm text-gray-600">{addr.phone}</p>
                                                                        </div>
                                                                    </div>
                                                                    <Button variant="ghost" size="icon"><Edit className="h-5 w-5" /></Button>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Payment Options */}
                                        {activeTab === 'payments' && (
                                            <div className="space-y-6">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-lg font-semibold">Payment Methods</h3>
                                                    <Button><Plus className="mr-2 h-4 w-4" /> Add Payment Method</Button>
                                                </div>
                                                <div className="space-y-4">
                                                    {payments.map((payment) => (
                                                        <Card key={payment.id} className={payment.isDefault ? "ring-2 ring-orange-500" : ""}>
                                                            <CardContent className="pt-6">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-4">
                                                                        {payment.type === "card" ? <CardIcon className="h-8 w-8 text-gray-600" /> : <Banknote className="h-8 w-8 text-gray-600" />}
                                                                        <div>
                                                                            <p className="font-semibold">{payment.type === "card" ? `${payment.brand} •••• ${payment.last4}` : payment.label}</p>
                                                                            {payment.type === "card" && <p className="text-sm text-gray-600">Expires {payment.expiry}</p>}
                                                                        </div>
                                                                    </div>
                                                                    {payment.isDefault && <Badge>Default</Badge>}
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Profile */}
                                        {activeTab === 'profile' && (
                                            <div className="text-center py-12">
                                                <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500">Profile management coming soon!</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </main>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
}