'use client';

import { ArrowRight, CreditCard, Heart, MapPin, Menu, Package, Star, Store, User } from 'lucide-react';
import { useEffect, useState } from 'react';

import GuestLayout from '@/layouts/guest-layout';
import { Card, CardContent } from '@/shadcn/ui/card';
import { Head } from '@inertiajs/react';

// Change from named imports to default imports
import AddressesTab from '@/components/UserDashboard/tabs/AddressesTab'; // Fixed the extra 's' here
import OrdersTab from '@/components/UserDashboard/tabs/OrdersTab';
import PaymentsTab from '@/components/UserDashboard/tabs/PaymentsTab';
import ProfileTab from '@/components/UserDashboard/tabs/ProfileTab';
import ReviewsTab from '@/components/UserDashboard/tabs/ReviewsTab';
import WishlistTab from '@/components/UserDashboard/tabs/WishlistTab';

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
        window.history.replaceState(null, '', `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`);
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
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        {/* Mobile Sidebar Toggle */}
                        <div className="relative mb-4 lg:hidden">
                            <button
                                className="flex w-full items-center justify-between gap-2 rounded-lg border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-accent"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                <div className="flex items-center gap-2">
                                    <Menu className="h-5 w-5" />
                                    <span className="font-medium">{MENU_ITEMS.find((item) => item.tab === activeTab)?.label}</span>
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
                                <Card className="absolute top-full z-50 mt-2 w-full border-2 shadow-xl">
                                    <CardContent className="p-2">
                                        <nav className="space-y-1">
                                            {MENU_ITEMS.map((item) => (
                                                <button
                                                    key={item.label}
                                                    onClick={() => {
                                                        setActiveTab(item.tab);
                                                        setSidebarOpen(false);
                                                    }}
                                                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all ${
                                                        activeTab === item.tab
                                                            ? 'bg-primary/10 font-medium text-primary'
                                                            : 'text-foreground hover:bg-secondary'
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
                        <aside className="hidden lg:col-span-1 lg:block">
                            <Card className="border shadow-lg">
                                <CardContent className="pt-6">
                                    <h2 className="mb-4 text-lg font-semibold">My Account</h2>
                                    <nav className="space-y-2">
                                        {MENU_ITEMS.map((item) => (
                                            <button
                                                key={item.label}
                                                onClick={() => setActiveTab(item.tab)}
                                                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all ${
                                                    activeTab === item.tab
                                                        ? 'bg-primary/10 font-medium text-primary shadow-sm'
                                                        : 'text-foreground hover:bg-secondary'
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
                        <main className="lg:col-span-3">{renderTabContent()}</main>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
