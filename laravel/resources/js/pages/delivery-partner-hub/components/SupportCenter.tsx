import React, { useState } from 'react';
import Button from '@/components/Button';
import Icon from '../../../components/AppIcon';

const SupportCenter = ({ onContactSupport, onReportEmergency }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const supportCategories = [
        {
            id: 'technical',
            title: 'Technical Issues',
            description: 'App problems, GPS issues, payment concerns',
            icon: 'Settings',
            color: 'text-primary'
        },
        {
            id: 'delivery',
            title: 'Delivery Support',
            description: 'Customer issues, address problems, package concerns',
            icon: 'Package',
            color: 'text-accent'
        },
        {
            id: 'account',
            title: 'Account & Earnings',
            description: 'Payment issues, profile updates, verification',
            icon: 'User',
            color: 'text-trust'
        },
        {
            id: 'safety',
            title: 'Safety & Security',
            description: 'Report incidents, safety concerns, emergency help',
            icon: 'Shield',
            color: 'text-warning'
        }
    ];

    const quickActions = [
        { title: 'Emergency Support', icon: 'Phone', variant: 'destructive', action: onReportEmergency },
        { title: 'Live Chat', icon: 'MessageCircle', variant: 'default', action: () => onContactSupport('chat') },
        { title: 'Call Support', icon: 'PhoneCall', variant: 'outline', action: () => onContactSupport('call') },
        { title: 'Help Center', icon: 'HelpCircle', variant: 'ghost', action: () => onContactSupport('help') }
    ];

    const faqs = [
        {
            question: "How do I update my vehicle information?",
            answer: "Go to Profile Settings > Vehicle Information and update your details. Changes require verification."
        },
        {
            question: "When do I receive my earnings?",
            answer: "Earnings are processed daily and deposited to your account within 1-2 business days."
        },
        {
            question: "What if a customer isn't available for delivery?",
            answer: "Follow the delivery protocol: call customer, wait 5 minutes, then contact support for instructions."
        },
        {
            question: "How do I report a safety incident?",
            answer: "Use the Emergency Support button or call our 24/7 safety hotline immediately."
        }
    ];

    return (
        <div className="space-y-6">
            {/* Emergency Contact */}
            <div className="bg-error/5 border border-error/20 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
                        <Icon name="AlertTriangle" size={20} className="text-error" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-text-primary">Emergency Support</h3>
                        <p className="text-sm text-text-secondary">24/7 immediate assistance available</p>
                    </div>
                </div>
                <Button
                    variant="destructive"
                    fullWidth
                    iconName="Phone"
                    iconPosition="left"
                    onClick={onReportEmergency}
                >
                    Call Emergency Support: (555) 911-HELP
                </Button>
            </div>
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Support Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {quickActions?.map((action, index) => (
                        <Button
                            key={index}
                            variant={action?.variant}
                            iconName={action?.icon}
                            iconPosition="left"
                            onClick={action?.action}
                        >
                            {action?.title}
                        </Button>
                    ))}
                </div>
            </div>
            {/* Support Categories */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text-primary mb-6">Support Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {supportCategories?.map((category) => (
                        <div
                            key={category?.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${selectedCategory === category?.id
                                ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
                                }`}
                            onClick={() => setSelectedCategory(category?.id)}
                        >
                            <div className="flex items-start space-x-3">
                                <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${category?.color}`}>
                                    <Icon name={category?.icon} size={16} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-text-primary mb-1">{category?.title}</h4>
                                    <p className="text-sm text-text-secondary">{category?.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedCategory && (
                    <div className="mt-4 pt-4 border-t border-border">
                        <Button
                            variant="default"
                            iconName="MessageSquare"
                            iconPosition="left"
                            onClick={() => onContactSupport(selectedCategory)}
                        >
                            Get Help with {supportCategories?.find(c => c?.id === selectedCategory)?.title}
                        </Button>
                    </div>
                )}
            </div>
            {/* FAQ Section */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text-primary mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    {faqs?.map((faq, index) => (
                        <div key={index} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                            <h4 className="font-medium text-text-primary mb-2">{faq?.question}</h4>
                            <p className="text-sm text-text-secondary">{faq?.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Contact Information */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Contact Information</h3>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                        <Icon name="Phone" size={16} className="text-primary" />
                        <span className="text-sm text-text-primary">Support: (555) 123-HELP</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Icon name="Mail" size={16} className="text-primary" />
                        <span className="text-sm text-text-primary">partners@parcelflow.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Icon name="Clock" size={16} className="text-primary" />
                        <span className="text-sm text-text-primary">Available 24/7 for emergencies</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportCenter;