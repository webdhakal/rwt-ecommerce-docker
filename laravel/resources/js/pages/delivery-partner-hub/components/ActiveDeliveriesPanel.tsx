import React, { useState } from 'react';
import Button from '@/components/Button';
import Icon from '../../../components/AppIcon';


const ActiveDeliveriesPanel = ({ deliveries, onStartDelivery, onCompleteDelivery, onContactCustomer }) => {
    const [expandedDelivery, setExpandedDelivery] = useState(null);

    const toggleExpanded = (deliveryId) => {
        setExpandedDelivery(expandedDelivery === deliveryId ? null : deliveryId);
    };

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'urgent': return 'text-error bg-error/10';
            case 'high': return 'text-warning bg-warning/10';
            case 'medium': return 'text-primary bg-primary/10';
            default: return 'text-text-secondary bg-muted';
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'picked up': return 'text-primary bg-primary/10';
            case 'in transit': return 'text-warning bg-warning/10';
            case 'ready for pickup': return 'text-success bg-success/10';
            default: return 'text-text-secondary bg-muted';
        }
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
                    <Icon name="Package" size={20} className="text-primary" />
                    <span>Active Deliveries ({deliveries?.length})</span>
                </h3>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
                {deliveries?.map((delivery) => (
                    <div key={delivery?.id} className="border border-border rounded-lg overflow-hidden">
                        <div
                            className="p-4 cursor-pointer hover:bg-muted/50 transition-colors duration-200"
                            onClick={() => toggleExpanded(delivery?.id)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={delivery?.customerAvatar}
                                        alt={delivery?.customerAvatarAlt}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-medium text-text-primary">{delivery?.recipient}</p>
                                        <p className="text-sm text-text-secondary">{delivery?.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(delivery?.priority)}`}>
                                        {delivery?.priority}
                                    </span>
                                    <Icon
                                        name={expandedDelivery === delivery?.id ? "ChevronUp" : "ChevronDown"}
                                        size={16}
                                        className="text-text-secondary"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center space-x-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery?.status)}`}>
                                        {delivery?.status}
                                    </span>
                                    <span className="text-sm text-text-secondary">{delivery?.distance}</span>
                                    <span className="text-sm font-medium text-success">${delivery?.earnings}</span>
                                </div>
                                <p className="text-sm text-text-secondary">{delivery?.estimatedTime}</p>
                            </div>
                        </div>

                        {expandedDelivery === delivery?.id && (
                            <div className="border-t border-border p-4 bg-muted/30">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-text-primary mb-2">Pickup Location</p>
                                        <p className="text-sm text-text-secondary">{delivery?.pickupAddress}</p>
                                        <p className="text-xs text-text-secondary mt-1">Contact: {delivery?.senderPhone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-text-primary mb-2">Delivery Instructions</p>
                                        <p className="text-sm text-text-secondary">{delivery?.instructions}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {delivery?.status === 'Ready for Pickup' && (
                                        <Button
                                            variant="default"
                                            size="sm"
                                            iconName="Play"
                                            iconPosition="left"
                                            onClick={() => onStartDelivery(delivery?.id)}
                                        >
                                            Start Pickup
                                        </Button>
                                    )}

                                    {delivery?.status === 'Picked Up' && (
                                        <Button
                                            variant="default"
                                            size="sm"
                                            iconName="Navigation"
                                            iconPosition="left"
                                            onClick={() => onStartDelivery(delivery?.id)}
                                        >
                                            Navigate
                                        </Button>
                                    )}

                                    {delivery?.status === 'In Transit' && (
                                        <Button
                                            variant="success"
                                            size="sm"
                                            iconName="CheckCircle"
                                            iconPosition="left"
                                            onClick={() => onCompleteDelivery(delivery?.id)}
                                        >
                                            Complete Delivery
                                        </Button>
                                    )}

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        iconName="MessageCircle"
                                        iconPosition="left"
                                        onClick={() => onContactCustomer(delivery?.customerPhone)}
                                    >
                                        Contact Customer
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        iconName="MapPin"
                                        iconPosition="left"
                                    >
                                        View Map
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {deliveries?.length === 0 && (
                <div className="text-center py-8">
                    <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <p className="text-text-secondary">No active deliveries</p>
                    <p className="text-sm text-text-secondary mt-1">Go online to start receiving delivery requests</p>
                </div>
            )}
        </div>
    );
};

export default ActiveDeliveriesPanel;