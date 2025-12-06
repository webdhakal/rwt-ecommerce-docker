import Button from '@/components/Button';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Icon from '../../components/AppIcon';
import ActiveDeliveriesPanel from './components/ActiveDeliveriesPanel';
import EarningsOverview from './components/EarningsOverview';
import NavigationAssistant from './components/NavigationAssistant';
import PartnerProfileCard from './components/PartnerProfileCard';
import RouteOptimizationPanel from './components/RouteOptimizationPanel';
import ShiftActivationCard from './components/ShiftActivationCard';
import SupportCenter from './components/SupportCenter';

const DeliveryPartnerHub = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isOnline, setIsOnline] = useState(false);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [currentDelivery, setCurrentDelivery] = useState(null);

    // Mock data
    const partnerData = {
        name: 'Marcus Rodriguez',
        email: 'marcus.rodriguez@email.com',
        phone: '(555) 123-4567',
        avatar: 'https://images.unsplash.com/photo-1588178457501-31b7688a41a0',
        avatarAlt: 'Professional headshot of Hispanic man with short black hair and friendly smile wearing navy blue shirt',
        stats: {
            totalDeliveries: 1247,
            memberSince: 'Jan 2023',
        },
        verifications: {
            identity: true,
            background: true,
            vehicle: true,
            insurance: true,
        },
        vehicle: {
            type: 'Motorcycle',
            model: 'Honda CB300R 2024',
            license: 'ABC-1234',
        },
        serviceAreas: ['Downtown', 'Midtown', 'University District', 'Tech Quarter'],
    };

    const currentShift = isOnline
        ? {
            startTime: '8:30 AM',
            hoursOnline: '4.5',
            deliveries: 12,
            earnings: '127.50',
        }
        : null;

    const earningsData = {
        today: '127.50',
        week: '892.30',
        month: '3,456.80',
        total: '28,947.60',
        recent: [
            {
                description: 'Express delivery completed',
                amount: '15.50',
                time: '2 hours ago',
            },
            {
                description: 'Standard delivery + tip',
                amount: '12.75',
                time: '3 hours ago',
            },
            {
                description: 'Priority package delivered',
                amount: '18.25',
                time: '4 hours ago',
            },
            {
                description: 'Bulk delivery bonus',
                amount: '25.00',
                time: '5 hours ago',
            },
        ],
    };

    const performanceMetrics = {
        completionRate: 98.5,
        rating: 4.9,
        avgDeliveryTime: 22,
    };

    const activeDeliveries = [
        {
            id: 'DEL001',
            recipient: 'Sarah Johnson',
            address: '123 Oak Street, Downtown',
            pickupAddress: '456 Commerce Ave, Business District',
            senderPhone: '(555) 987-6543',
            customerPhone: '(555) 234-5678',
            customerAvatar: 'https://images.unsplash.com/photo-1717807670946-c793b0dc6392',
            customerAvatarAlt: 'Professional headshot of young woman with brown hair and warm smile wearing white blouse',
            priority: 'High',
            status: 'Ready for Pickup',
            distance: '2.3 mi',
            estimatedTime: '15 min',
            earnings: '14.50',
            instructions: 'Leave at front door if no answer. Ring doorbell twice.',
        },
        {
            id: 'DEL002',
            recipient: 'Michael Chen',
            address: '789 Pine Avenue, Midtown',
            pickupAddress: '321 Market Street, Shopping Center',
            senderPhone: '(555) 876-5432',
            customerPhone: '(555) 345-6789',
            customerAvatar: 'https://images.unsplash.com/photo-1687256457585-3608dfa736c5',
            customerAvatarAlt: 'Professional headshot of Asian man with black hair and glasses wearing dark suit',
            priority: 'Urgent',
            status: 'Picked Up',
            distance: '1.8 mi',
            estimatedTime: '12 min',
            earnings: '18.75',
            instructions: 'Business delivery - ask for reception desk.',
        },
        {
            id: 'DEL003',
            recipient: 'Emma Wilson',
            address: '456 Elm Drive, University District',
            pickupAddress: '654 Tech Blvd, Innovation Hub',
            senderPhone: '(555) 765-4321',
            customerPhone: '(555) 456-7890',
            customerAvatar: 'https://images.unsplash.com/photo-1658497735599-1834bfa6ccaa',
            customerAvatarAlt: 'Professional headshot of young blonde woman with bright smile wearing light blue top',
            priority: 'Medium',
            status: 'In Transit',
            distance: '3.1 mi',
            estimatedTime: '18 min',
            earnings: '16.25',
            instructions: 'Apartment 4B - use side entrance after 6 PM.',
        },
    ];

    const navigationDelivery = activeDeliveries?.find((d) => d?.status === 'In Transit') || null;

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
        { id: 'deliveries', label: 'Active Deliveries', icon: 'Package' },
        { id: 'navigation', label: 'Navigation', icon: 'Navigation' },
        { id: 'earnings', label: 'Earnings', icon: 'DollarSign' },
        { id: 'profile', label: 'Profile', icon: 'User' },
        { id: 'support', label: 'Support', icon: 'HelpCircle' },
    ];

    const handleToggleShift = () => {
        setIsOnline(!isOnline);
    };

    const handleOptimizeRoute = async (selectedDeliveries) => {
        setIsOptimizing(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsOptimizing(false);
        // Route optimization logic would go here
    };

    const handleStartDelivery = (deliveryId) => {
        const delivery = activeDeliveries?.find((d) => d?.id === deliveryId);
        setCurrentDelivery(delivery);
        setActiveTab('navigation');
    };

    const handleCompleteDelivery = (deliveryId) => {
        // Delivery completion logic would go here
        console.log('Completing delivery:', deliveryId);
    };

    const handleContactCustomer = (phone) => {
        // Customer contact logic would go here
        console.log('Contacting customer:', phone);
    };

    const handleStartNavigation = (deliveryId) => {
        // Navigation start logic would go here
        console.log('Starting navigation for:', deliveryId);
    };

    const handleReportIssue = (deliveryId) => {
        // Issue reporting logic would go here
        console.log('Reporting issue for:', deliveryId);
    };

    const handleContactSupport = (type) => {
        // Support contact logic would go here
        console.log('Contacting support:', type);
    };

    const handleReportEmergency = () => {
        // Emergency reporting logic would go here
        console.log('Reporting emergency');
    };

    const handleUpdateProfile = (profileData) => {
        // Profile update logic would go here
        console.log('Updating profile:', profileData);
    };

    useEffect(() => {
        if (navigationDelivery) {
            setCurrentDelivery(navigationDelivery);
        }
    }, [navigationDelivery]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <ShiftActivationCard
                                isOnline={isOnline}
                                onToggleShift={handleToggleShift}
                                currentShift={currentShift}
                                todayEarnings={earningsData?.today}
                            />

                            <ActiveDeliveriesPanel
                                deliveries={activeDeliveries?.slice(0, 3)}
                                onStartDelivery={handleStartDelivery}
                                onCompleteDelivery={handleCompleteDelivery}
                                onContactCustomer={handleContactCustomer}
                            />
                        </div>
                        <div className="space-y-6">
                            <PartnerProfileCard partnerData={partnerData} onUpdateProfile={handleUpdateProfile} />

                            <RouteOptimizationPanel
                                activeDeliveries={activeDeliveries}
                                onOptimizeRoute={handleOptimizeRoute}
                                isOptimizing={isOptimizing}
                            />
                        </div>
                    </div>
                );

            case 'deliveries':
                return (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <ActiveDeliveriesPanel
                            deliveries={activeDeliveries}
                            onStartDelivery={handleStartDelivery}
                            onCompleteDelivery={handleCompleteDelivery}
                            onContactCustomer={handleContactCustomer}
                        />

                        <RouteOptimizationPanel
                            activeDeliveries={activeDeliveries}
                            onOptimizeRoute={handleOptimizeRoute}
                            isOptimizing={isOptimizing}
                        />
                    </div>
                );

            case 'navigation':
                return (
                    <div className="mx-auto max-w-4xl">
                        <NavigationAssistant
                            currentDelivery={currentDelivery}
                            onStartNavigation={handleStartNavigation}
                            onReportIssue={handleReportIssue}
                        />
                    </div>
                );

            case 'earnings':
                return <EarningsOverview earningsData={earningsData} performanceMetrics={performanceMetrics} />;

            case 'profile':
                return (
                    <div className="mx-auto max-w-2xl">
                        <PartnerProfileCard partnerData={partnerData} onUpdateProfile={handleUpdateProfile} />
                    </div>
                );

            case 'support':
                return (
                    <div className="mx-auto max-w-4xl">
                        <SupportCenter onContactSupport={handleContactSupport} onReportEmergency={handleReportEmergency} />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <GuestLayout>
            <Head title="Delivery Partner Hub" />
            {/* Hero Banner Section */}
            <section className="container mx-auto px-4 sm:px-6">
                <div className="min-h-screen bg-background">
                    <main className="pt-20 pb-12">
                        <div className="w-full px-4 sm:px-6 lg:px-8">
                            {/* Page Header */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-text-primary text-3xl font-bold">Delivery Partner Hub</h1>
                                        <p className="text-text-secondary mt-2">Manage your deliveries, track earnings, and optimize your routes</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`flex items-center space-x-2 rounded-lg px-3 py-2 ${isOnline ? 'bg-success/10 text-success' : 'text-text-secondary bg-muted'}`}
                                        >
                                            <div
                                                className={`h-2 w-2 rounded-full ${isOnline ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`}
                                            ></div>
                                            <span className="text-sm font-medium">{isOnline ? 'Online' : 'Offline'}</span>
                                        </div>
                                        <Button variant="outline" iconName="Bell" iconPosition="left">
                                            Notifications
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Tab Navigation */}
                            <div className="mb-8">
                                <div className="border-b border-border">
                                    <nav className="flex space-x-8 overflow-x-auto">
                                        {tabs?.map((tab) => (
                                            <button
                                                key={tab?.id}
                                                onClick={() => setActiveTab(tab?.id)}
                                                className={`flex items-center space-x-2 border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${activeTab === tab?.id
                                                    ? 'border-primary text-primary'
                                                    : 'text-text-secondary hover:text-text-primary border-transparent hover:border-muted-foreground'
                                                    }`}
                                            >
                                                <Icon name={tab?.icon} size={16} />
                                                <span>{tab?.label}</span>
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>

                            {/* Tab Content */}
                            {renderTabContent()}
                        </div>
                    </main>

                    {/* Quick Action Floating Button */}
                    {isOnline && (
                        <div className="fixed right-6 bottom-40 z-40">
                            <Button
                                variant="default"
                                size="lg"
                                iconName="Navigation"
                                iconPosition="left"
                                className="rounded-full shadow-lg transition-shadow duration-200 hover:shadow-xl"
                                onClick={() => setActiveTab('navigation')}
                            ></Button>
                        </div>
                    )}
                </div>
            </section>
        </GuestLayout>
    );
};

export default DeliveryPartnerHub;
