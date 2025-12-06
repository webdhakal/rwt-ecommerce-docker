import Button from '@/components/Button';
import { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ActiveDeliveriesPanel = ({ deliveries, onStartDelivery, onCompleteDelivery, onContactCustomer }) => {
    const [expandedDelivery, setExpandedDelivery] = useState(null);

    const toggleExpanded = (deliveryId) => {
        setExpandedDelivery(expandedDelivery === deliveryId ? null : deliveryId);
    };

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'urgent':
                return 'text-error bg-error/10';
            case 'high':
                return 'text-warning bg-warning/10';
            case 'medium':
                return 'text-primary bg-primary/10';
            default:
                return 'text-text-secondary bg-muted';
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'picked up':
                return 'text-primary bg-primary/10';
            case 'in transit':
                return 'text-warning bg-warning/10';
            case 'ready for pickup':
                return 'text-success bg-success/10';
            default:
                return 'text-text-secondary bg-muted';
        }
    };

    return (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-text-primary flex items-center space-x-2 text-lg font-semibold">
                    <Icon name="Package" size={20} className="text-primary" />
                    <span>Active Deliveries ({deliveries?.length})</span>
                </h3>
            </div>
            <div className="max-h-96 space-y-4 overflow-y-auto">
                {deliveries?.map((delivery) => (
                    <div key={delivery?.id} className="overflow-hidden rounded-lg border border-border">
                        <div
                            className="cursor-pointer p-4 transition-colors duration-200 hover:bg-muted/50"
                            onClick={() => toggleExpanded(delivery?.id)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={delivery?.customerAvatar}
                                        alt={delivery?.customerAvatarAlt}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-text-primary font-medium">{delivery?.recipient}</p>
                                        <p className="text-text-secondary text-sm">{delivery?.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(delivery?.priority)}`}>
                                        {delivery?.priority}
                                    </span>
                                    <Icon
                                        name={expandedDelivery === delivery?.id ? 'ChevronUp' : 'ChevronDown'}
                                        size={16}
                                        className="text-text-secondary"
                                    />
                                </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(delivery?.status)}`}>
                                        {delivery?.status}
                                    </span>
                                    <span className="text-text-secondary text-sm">{delivery?.distance}</span>
                                    <span className="text-success text-sm font-medium">${delivery?.earnings}</span>
                                </div>
                                <p className="text-text-secondary text-sm">{delivery?.estimatedTime}</p>
                            </div>
                        </div>

                        {expandedDelivery === delivery?.id && (
                            <div className="border-t border-border bg-muted/30 p-4">
                                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-text-primary mb-2 text-sm font-medium">Pickup Location</p>
                                        <p className="text-text-secondary text-sm">{delivery?.pickupAddress}</p>
                                        <p className="text-text-secondary mt-1 text-xs">Contact: {delivery?.senderPhone}</p>
                                    </div>
                                    <div>
                                        <p className="text-text-primary mb-2 text-sm font-medium">Delivery Instructions</p>
                                        <p className="text-text-secondary text-sm">{delivery?.instructions}</p>
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

                                    <Button variant="ghost" size="sm" iconName="MapPin" iconPosition="left">
                                        View Map
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {deliveries?.length === 0 && (
                <div className="py-8 text-center">
                    <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-text-secondary">No active deliveries</p>
                    <p className="text-text-secondary mt-1 text-sm">Go online to start receiving delivery requests</p>
                </div>
            )}
        </div>
    );
};

export default ActiveDeliveriesPanel;
