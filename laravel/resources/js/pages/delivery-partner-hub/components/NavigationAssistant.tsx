import Button from '@/components/Button';
import { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NavigationAssistant = ({ currentDelivery, onStartNavigation, onReportIssue }) => {
    const [isNavigating, setIsNavigating] = useState(false);

    if (!currentDelivery) {
        return (
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="py-8 text-center">
                    <Icon name="Navigation" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-text-secondary">No active navigation</p>
                    <p className="text-text-secondary mt-1 text-sm">Start a delivery to access navigation</p>
                </div>
            </div>
        );
    }

    const handleStartNavigation = () => {
        setIsNavigating(true);
        onStartNavigation(currentDelivery?.id);
    };

    return (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-text-primary flex items-center space-x-2 text-lg font-semibold">
                    <Icon name="Navigation" size={20} className="text-primary" />
                    <span>Navigation Assistant</span>
                </h3>
                {isNavigating && (
                    <div className="text-success flex items-center space-x-2">
                        <div className="bg-success h-2 w-2 animate-pulse rounded-full"></div>
                        <span className="text-sm font-medium">Navigating</span>
                    </div>
                )}
            </div>
            {/* Current Destination */}
            <div className="mb-6 rounded-lg bg-muted p-4">
                <div className="flex items-start space-x-3">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                        <Icon name="MapPin" size={16} color="white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-text-primary font-medium">{currentDelivery?.recipient}</p>
                        <p className="text-text-secondary mb-2 text-sm">{currentDelivery?.address}</p>
                        <div className="flex items-center space-x-4 text-sm">
                            <span className="text-text-secondary">Distance: {currentDelivery?.distance}</span>
                            <span className="text-text-secondary">ETA: {currentDelivery?.eta}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Navigation Controls */}
            <div className="mb-6 grid grid-cols-1 gap-3">
                {!isNavigating ? (
                    <Button variant="default" fullWidth iconName="Navigation" iconPosition="left" onClick={handleStartNavigation}>
                        Start Navigation
                    </Button>
                ) : (
                    <>
                        <Button variant="outline" fullWidth iconName="RotateCcw" iconPosition="left">
                            Recalculate Route
                        </Button>
                        <Button variant="ghost" fullWidth iconName="Phone" iconPosition="left">
                            Call Customer
                        </Button>
                    </>
                )}
            </div>
            {/* Route Information */}
            <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} className="text-primary" />
                        <span className="text-text-primary text-sm">Estimated Time</span>
                    </div>
                    <span className="text-text-primary text-sm font-medium">{currentDelivery?.estimatedTime}</span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <div className="flex items-center space-x-2">
                        <Icon name="Route" size={16} className="text-primary" />
                        <span className="text-text-primary text-sm">Route Type</span>
                    </div>
                    <span className="text-text-primary text-sm font-medium">Fastest Route</span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <div className="flex items-center space-x-2">
                        <Icon name="AlertTriangle" size={16} className="text-warning" />
                        <span className="text-text-primary text-sm">Traffic Status</span>
                    </div>
                    <span className="text-warning text-sm font-medium">Moderate</span>
                </div>
            </div>
            {/* Map Preview */}
            <div className="mb-6">
                <div className="h-48 w-full overflow-hidden rounded-lg bg-muted">
                    <iframe
                        width="100%"
                        height="100%"
                        loading="lazy"
                        title="Delivery Route Map"
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps?q=40.7128,-74.0060&z=14&output=embed"
                        className="border-0"
                    ></iframe>
                </div>
            </div>
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" iconName="AlertCircle" iconPosition="left" onClick={() => onReportIssue(currentDelivery?.id)}>
                    Report Issue
                </Button>
                <Button variant="ghost" size="sm" iconName="MessageSquare" iconPosition="left">
                    Customer Chat
                </Button>
            </div>
        </div>
    );
};

export default NavigationAssistant;
