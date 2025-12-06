import Button from '@/components/Button';
import { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SupportCenter = ({ onContactSupport, onReportEmergency }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const supportCategories = [
        {
            id: 'technical',
            title: 'Technical Issues',
            description: 'App problems, GPS issues, payment concerns',
            icon: 'Settings',
            color: 'text-primary',
        },
        {
            id: 'delivery',
            title: 'Delivery Support',
            description: 'Customer issues, address problems, package concerns',
            icon: 'Package',
            color: 'text-accent',
        },
        {
            id: 'account',
            title: 'Account & Earnings',
            description: 'Payment issues, profile updates, verification',
            icon: 'User',
            color: 'text-trust',
        },
        {
            id: 'safety',
            title: 'Safety & Security',
            description: 'Report incidents, safety concerns, emergency help',
            icon: 'Shield',
            color: 'text-warning',
        },
    ];

    const quickActions = [
        { title: 'Emergency Support', icon: 'Phone', variant: 'destructive', action: onReportEmergency },
        { title: 'Live Chat', icon: 'MessageCircle', variant: 'default', action: () => onContactSupport('chat') },
        { title: 'Call Support', icon: 'PhoneCall', variant: 'outline', action: () => onContactSupport('call') },
        { title: 'Help Center', icon: 'HelpCircle', variant: 'ghost', action: () => onContactSupport('help') },
    ];

    const faqs = [
        {
            question: 'How do I update my vehicle information?',
            answer: 'Go to Profile Settings > Vehicle Information and update your details. Changes require verification.',
        },
        {
            question: 'When do I receive my earnings?',
            answer: 'Earnings are processed daily and deposited to your account within 1-2 business days.',
        },
        {
            question: "What if a customer isn't available for delivery?",
            answer: 'Follow the delivery protocol: call customer, wait 5 minutes, then contact support for instructions.',
        },
        {
            question: 'How do I report a safety incident?',
            answer: 'Use the Emergency Support button or call our 24/7 safety hotline immediately.',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Emergency Contact */}
            <div className="bg-error/5 border-error/20 rounded-xl border p-6">
                <div className="mb-4 flex items-center space-x-3">
                    <div className="bg-error/10 flex h-10 w-10 items-center justify-center rounded-full">
                        <Icon name="AlertTriangle" size={20} className="text-error" />
                    </div>
                    <div>
                        <h3 className="text-text-primary font-semibold">Emergency Support</h3>
                        <p className="text-text-secondary text-sm">24/7 immediate assistance available</p>
                    </div>
                </div>
                <Button variant="destructive" fullWidth iconName="Phone" iconPosition="left" onClick={onReportEmergency}>
                    Call Emergency Support: (555) 911-HELP
                </Button>
            </div>
            {/* Quick Actions */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-text-primary mb-4 text-lg font-semibold">Quick Support Actions</h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {quickActions?.map((action, index) => (
                        <Button key={index} variant={action?.variant} iconName={action?.icon} iconPosition="left" onClick={action?.action}>
                            {action?.title}
                        </Button>
                    ))}
                </div>
            </div>
            {/* Support Categories */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-text-primary mb-6 text-lg font-semibold">Support Categories</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {supportCategories?.map((category) => (
                        <div
                            key={category?.id}
                            className={`cursor-pointer rounded-lg border p-4 transition-all duration-200 ${
                                selectedCategory === category?.id ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
                            }`}
                            onClick={() => setSelectedCategory(category?.id)}
                        >
                            <div className="flex items-start space-x-3">
                                <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-muted ${category?.color}`}>
                                    <Icon name={category?.icon} size={16} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-text-primary mb-1 font-medium">{category?.title}</h4>
                                    <p className="text-text-secondary text-sm">{category?.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedCategory && (
                    <div className="mt-4 border-t border-border pt-4">
                        <Button variant="default" iconName="MessageSquare" iconPosition="left" onClick={() => onContactSupport(selectedCategory)}>
                            Get Help with {supportCategories?.find((c) => c?.id === selectedCategory)?.title}
                        </Button>
                    </div>
                )}
            </div>
            {/* FAQ Section */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-text-primary mb-6 text-lg font-semibold">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    {faqs?.map((faq, index) => (
                        <div key={index} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                            <h4 className="text-text-primary mb-2 font-medium">{faq?.question}</h4>
                            <p className="text-text-secondary text-sm">{faq?.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Contact Information */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-text-primary mb-4 text-lg font-semibold">Contact Information</h3>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                        <Icon name="Phone" size={16} className="text-primary" />
                        <span className="text-text-primary text-sm">Support: (555) 123-HELP</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Icon name="Mail" size={16} className="text-primary" />
                        <span className="text-text-primary text-sm">partners@parcelflow.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Icon name="Clock" size={16} className="text-primary" />
                        <span className="text-text-primary text-sm">Available 24/7 for emergencies</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportCenter;
