'use client';

import { useState, useEffect } from 'react';
import {
    Heart, Package, User, MapPin, CreditCard, Star, Store,
    ArrowRight, Menu
} from 'lucide-react';

import { Card, CardContent } from '@/shadcn/ui/card';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

// Change from named imports to default imports
import ProfileTab from '@/components/UserDashboard/tabs/ProfileTab';
import OrdersTab from '@/components/UserDashboard/tabs/OrdersTab';
import WishlistTab from '@/components/UserDashboard/tabs/WishlistTab';
import ReviewsTab from '@/components/UserDashboard/tabs/ReviewsTab';
import AddressesTab from '@/components/UserDashboard/tabs/AddressesTab';  // Fixed the extra 's' here
import PaymentsTab from '@/components/UserDashboard/tabs/PaymentsTab';

const DEFAULT_TAB = 'profile';

const MENU_ITEMS = [
    { icon: User, label: 'Manage My Account', tab: 'profile' },
    { icon: Package, label: 'My Orders', tab: 'orders' },
    { icon: Heart, label: 'My Wishlist & Followed Stores', tab: 'wishlist' },
    { icon: Star, label: 'My Reviews', tab: 'reviews' },
    { icon: MapPin, label: 'Address Book', tab: 'addresses' },
    { icon: CreditCard, label: 'Payment Options', tab: 'payments' },
    { icon: Store, label: 'Sell on Platform', tab: 'sell' },
];

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

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileTab />;
            case 'orders':
                return <OrdersTab />;
            case 'wishlist':
                return <WishlistTab />;
            case 'reviews':
                return <ReviewsTab />;
            case 'addresses':
                return <AddressesTab />;
            case 'payments':
                return <PaymentsTab />;
            default:
                return <ProfileTab />;
        }
    };

    return (
        <GuestLayout>
            <Head title="User Dashboard" />
            <div className="min-h-screen bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Mobile Sidebar Toggle */}
                        <div className="lg:hidden mb-4 relative">
                            <button
                                className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg border shadow-sm bg-card hover:bg-accent transition-colors"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                <div className="flex items-center gap-2">
                                    <Menu className="h-5 w-5" />
                                    <span className="font-medium">
                                        {MENU_ITEMS.find(item => item.tab === activeTab)?.label}
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
                                            {MENU_ITEMS.map((item) => (
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
                                <CardContent className="pt-6">
                                    <h2 className="text-lg font-semibold mb-4">My Account</h2>
                                    <nav className="space-y-2">
                                        {MENU_ITEMS.map((item) => (
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
                            {renderTabContent()}
                        </main>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}