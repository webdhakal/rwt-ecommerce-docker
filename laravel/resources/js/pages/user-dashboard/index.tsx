'use client';

import { useState, useEffect } from 'react';
import {
    Heart, ShoppingCart, Package, User, MapPin, CreditCard, Star, Store,
    ArrowRight, Trash2, BadgeCheck, TrendingDown, Truck, Clock, CheckCircle,
    XCircle, Home, Plus, Edit, CreditCard as CardIcon, Banknote, Loader2, Lock, Mail, Phone, Calendar, Eye, EyeOff, Menu, X
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/shadcn/ui/card';
import { Button } from '@/shadcn/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar';
import { Badge } from '@/shadcn/ui/badge';
import { Label } from '@/shadcn/ui/label';
import { Input } from '@/shadcn/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs';
import { Separator } from '@/shadcn/ui/separator';
import { Alert, AlertDescription } from '@/shadcn/ui/alert';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

const DEFAULT_TAB = 'profile';

export default function UserDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const getInitialTab = () => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const urlTab = params.get('tab');
            return urlTab || DEFAULT_TAB;
        }
        return DEFAULT_TAB;
    };

    const [activeTab, setActiveTab] = useState(getInitialTab);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (activeTab === DEFAULT_TAB) {
            params.delete('tab');
        } else {
            params.set('tab', activeTab);
        }
        window.history.replaceState(
            null,
            '',
            `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`
        );
    }, [activeTab]);

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
            case "Delivered": return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
            case "Shipped": return <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
            case "Cancelled": return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
            default: return <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
        }
    };

    const [isLoading, setIsLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!) : null;

    const [formData, setFormData] = useState({
        name: auth?.name || '',
        email: auth?.email || 'john@example.com',
        phone: auth?.phone || '+1234567890',
        address: auth?.address || '123 Main St, City, Country',
        dob: auth?.dob || '1990-01-01',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent, isPasswordForm = false) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        alert(isPasswordForm ? 'Password updated successfully!' : 'Profile updated successfully!');
    };

    return (
        <>
            {/* Mobile Sidebar Toggle */}

            <GuestLayout>
                <Head title="User Dashboard" />
                <div className="min-h-screen bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <div className="lg:hidden mb-4 relative">
                                <button
                                    className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg border shadow-sm bg-card hover:bg-accent transition-colors"
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                >
                                    <div className="flex items-center gap-2">
                                        <Menu className="h-5 w-5" />
                                        <span className="font-medium">
                                            {[
                                                { icon: User, label: 'Manage My Account', tab: 'profile' },
                                                { icon: Package, label: 'My Orders', tab: 'orders' },
                                                { icon: Heart, label: 'Wishlist & Stores', tab: 'wishlist' },
                                                { icon: Star, label: 'My Reviews', tab: 'reviews' },
                                                { icon: MapPin, label: 'Address Book', tab: 'addresses' },
                                                { icon: CreditCard, label: 'Payment Options', tab: 'payments' },
                                                { icon: Store, label: 'Sell on Platform', tab: 'sell' },
                                            ].find(item => item.tab === activeTab)?.label}
                                        </span>
                                    </div>
                                    <svg
                                        className={`h-5 w-5 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {sidebarOpen && (
                                    <Card className="absolute top-full mt-2 w-full z-50 shadow-xl border-2">
                                        <CardContent className="p-2">
                                            <nav className="space-y-1">
                                                {[
                                                    { icon: User, label: 'Manage My Account', tab: 'profile' },
                                                    { icon: Package, label: 'My Orders', tab: 'orders' },
                                                    { icon: Heart, label: 'Wishlist & Stores', tab: 'wishlist' },
                                                    { icon: Star, label: 'My Reviews', tab: 'reviews' },
                                                    { icon: MapPin, label: 'Address Book', tab: 'addresses' },
                                                    { icon: CreditCard, label: 'Payment Options', tab: 'payments' },
                                                    { icon: Store, label: 'Sell on Platform', tab: 'sell' },
                                                ].map((item) => (
                                                    <button
                                                        key={item.label}
                                                        onClick={() => {
                                                            setActiveTab(item.tab);
                                                            setSidebarOpen(false);
                                                        }}
                                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${activeTab === item.tab
                                                            ? 'bg-primary/10 text-primary font-medium'
                                                            : 'hover:bg-secondary text-foreground'
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
                                )}
                            </div>

                            {/* Desktop Sidebar */}
                            <aside className="hidden lg:block lg:col-span-1">
                                <Card className="shadow-lg border">
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
                                                        ? 'bg-primary/10 text-primary font-medium shadow-sm'
                                                        : 'hover:bg-secondary text-foreground'
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
                                <Card className="shadow-xl border">
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
                                        )}

                                        {/* My Orders */}
                                        {activeTab === 'orders' && (
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
                                        )}

                                        {/* My Reviews */}
                                        {activeTab === 'reviews' && (
                                            <div className="space-y-6">
                                                {reviews.map((review) => (
                                                    <Card key={review.id}>
                                                        <CardContent className="pt-6">
                                                            <div className="flex items-start gap-4">
                                                                <div className="bg-muted border-2 border-dashed rounded-xl w-20 h-20 flex-shrink-0" />
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2">
                                                                        <h4 className="font-medium">{review.product}</h4>
                                                                        <span className="text-sm text-muted-foreground">• {review.date}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1 my-2">
                                                                        {[...Array(5)].map((_, i) => (
                                                                            <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground/30'}`} />
                                                                        ))}
                                                                    </div>
                                                                    <p className="text-foreground">{review.comment}</p>
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
                                                        <Card key={addr.id} className={addr.isDefault ? "ring-2 ring-primary" : ""}>
                                                            <CardContent className="pt-6">
                                                                <div className="flex items-start justify-between">
                                                                    <div className="flex items-center gap-3">
                                                                        <Home className="h-6 w-6 text-muted-foreground" />
                                                                        <div>
                                                                            <p className="font-semibold">{addr.type} {addr.isDefault && <Badge className="ml-2">Default</Badge>}</p>
                                                                            <p className="text-sm text-foreground mt-1">{addr.name}</p>
                                                                            <p className="text-sm text-muted-foreground">{addr.address}</p>
                                                                            <p className="text-sm text-muted-foreground">{addr.phone}</p>
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
                                                        <Card key={payment.id} className={payment.isDefault ? "ring-2 ring-primary" : ""}>
                                                            <CardContent className="pt-6">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-4">
                                                                        {payment.type === "card" ? <CardIcon className="h-8 w-8 text-muted-foreground" /> : <Banknote className="h-8 w-8 text-muted-foreground" />}
                                                                        <div>
                                                                            <p className="font-semibold">{payment.type === "card" ? `${payment.brand} •••• ${payment.last4}` : payment.label}</p>
                                                                            {payment.type === "card" && <p className="text-sm text-muted-foreground">Expires {payment.expiry}</p>}
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
                                            <div className="container mx-auto px-4 py-8">
                                                <div className="space-y-6">
                                                    <div>
                                                        <h1 className="text-3xl font-bold">Account Settings</h1>
                                                        <p className="text-muted-foreground">
                                                            Manage your account settings and update your personal information
                                                        </p>
                                                    </div>

                                                    <Tabs defaultValue="profile" className="w-full">
                                                        <TabsList className="grid w-full grid-cols-2">
                                                            <TabsTrigger value="profile" className="flex items-center gap-2">
                                                                <User className="h-4 w-4" />
                                                                <span>Profile</span>
                                                            </TabsTrigger>
                                                            <TabsTrigger value="password" className="flex items-center gap-2">
                                                                <Lock className="h-4 w-4" />
                                                                <span>Password</span>
                                                            </TabsTrigger>
                                                        </TabsList>

                                                        {/* Profile Tab */}
                                                        <TabsContent value="profile">
                                                            <Card>
                                                                <CardHeader>
                                                                    <CardTitle>Profile Information</CardTitle>
                                                                    <CardDescription>Update your account's profile information.</CardDescription>
                                                                </CardHeader>
                                                                <form onSubmit={(e) => handleSubmit(e, false)}>
                                                                    <CardContent className="space-y-4">
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                            <div className="space-y-2">
                                                                                <Label htmlFor="name">Full Name</Label>
                                                                                <div className="relative">
                                                                                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                                                    <Input
                                                                                        id="name"
                                                                                        className="pl-10"
                                                                                        value={formData.name}
                                                                                        onChange={handleInputChange}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className="space-y-2">
                                                                                <Label htmlFor="email">Email</Label>
                                                                                <div className="relative">
                                                                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                                                    <Input
                                                                                        id="email"
                                                                                        type="email"
                                                                                        className="pl-10"
                                                                                        value={formData.email}
                                                                                        onChange={handleInputChange}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className="space-y-2">
                                                                                <Label htmlFor="phone">Phone Number</Label>
                                                                                <div className="relative">
                                                                                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                                                    <Input
                                                                                        id="phone"
                                                                                        type="tel"
                                                                                        className="pl-10"
                                                                                        value={formData.phone}
                                                                                        onChange={handleInputChange}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className="space-y-2">
                                                                                <Label htmlFor="dob">Date of Birth</Label>
                                                                                <div className="relative">
                                                                                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                                                    <Input
                                                                                        id="dob"
                                                                                        type="date"
                                                                                        className="pl-10"
                                                                                        value={formData.dob}
                                                                                        onChange={handleInputChange}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="address">Address</Label>
                                                                            <div className="relative">
                                                                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                                                <textarea
                                                                                    id="address"
                                                                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                                                    value={formData.address}
                                                                                    onChange={handleInputChange}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </CardContent>
                                                                    <CardFooter>
                                                                        <Button type="submit" disabled={isLoading}>
                                                                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                                            Save Changes
                                                                        </Button>
                                                                    </CardFooter>
                                                                </form>
                                                            </Card>
                                                        </TabsContent>

                                                        {/* Password Tab */}
                                                        <TabsContent value="password">
                                                            <Card>
                                                                <CardHeader>
                                                                    <CardTitle>Update Password</CardTitle>
                                                                    <CardDescription>Change your password here.</CardDescription>
                                                                </CardHeader>
                                                                <form onSubmit={(e) => handleSubmit(e, true)}>
                                                                    <CardContent className="space-y-4">
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="currentPassword">Current Password</Label>
                                                                            <div className="relative">
                                                                                <Input
                                                                                    id="currentPassword"
                                                                                    type={showCurrentPassword ? "text" : "password"}
                                                                                    value={formData.currentPassword}
                                                                                    onChange={handleInputChange}
                                                                                    className="pr-10"
                                                                                />
                                                                                <button
                                                                                    type="button"
                                                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                                                >
                                                                                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="newPassword">New Password</Label>
                                                                            <div className="relative">
                                                                                <Input
                                                                                    id="newPassword"
                                                                                    type={showNewPassword ? "text" : "password"}
                                                                                    value={formData.newPassword}
                                                                                    onChange={handleInputChange}
                                                                                    className="pr-10"
                                                                                />
                                                                                <button
                                                                                    type="button"
                                                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                                                >
                                                                                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                                                            <div className="relative">
                                                                                <Input
                                                                                    id="confirmPassword"
                                                                                    type={showConfirmPassword ? "text" : "password"}
                                                                                    value={formData.confirmPassword}
                                                                                    onChange={handleInputChange}
                                                                                    className="pr-10"
                                                                                />
                                                                                <button
                                                                                    type="button"
                                                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                                >
                                                                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </CardContent>
                                                                    <CardFooter>
                                                                        <Button type="submit" disabled={isLoading}>
                                                                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                                            Update Password
                                                                        </Button>
                                                                    </CardFooter>
                                                                </form>
                                                            </Card>
                                                        </TabsContent>
                                                    </Tabs>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </main>
                        </div>
                    </div>
                </div >
            </GuestLayout >
        </>
    );
}