import React, { useState } from 'react';
import Button from '@/components/Button';
import Icon from '../../../components/AppIcon';

const NavigationAssistant = ({ currentDelivery, onStartNavigation, onReportIssue }) => {
    const [isNavigating, setIsNavigating] = useState(false);

    if (!currentDelivery) {
        return (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="text-center py-8">
                    <Icon name="Navigation" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <p className="text-text-secondary">No active navigation</p>
                    <p className="text-sm text-text-secondary mt-1">Start a delivery to access navigation</p>
                </div>
            </div>
        );
    }

    const handleStartNavigation = () => {
        setIsNavigating(true);
        onStartNavigation(currentDelivery?.id);
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
                    <Icon name="Navigation" size={20} className="text-primary" />
                    <span>Navigation Assistant</span>
                </h3>
                {isNavigating && (
                    <div className="flex items-center space-x-2 text-success">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Navigating</span>
                    </div>
                )}
            </div>
            {/* Current Destination */}
            <div className="bg-muted rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mt-1">
                        <Icon name="MapPin" size={16} color="white" />
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-text-primary">{currentDelivery?.recipient}</p>
                        <p className="text-sm text-text-secondary mb-2">{currentDelivery?.address}</p>
                        <div className="flex items-center space-x-4 text-sm">
                            <span className="text-text-secondary">Distance: {currentDelivery?.distance}</span>
                            <span className="text-text-secondary">ETA: {currentDelivery?.eta}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Navigation Controls */}
            <div className="grid grid-cols-1 gap-3 mb-6">
                {!isNavigating ? (
                    <Button
                        variant="default"
                        fullWidth
                        iconName="Navigation"
                        iconPosition="left"
                        onClick={handleStartNavigation}
                    >
                        Start Navigation
                    </Button>
                ) : (
                    <>
                        <Button
                            variant="outline"
                            fullWidth
                            iconName="RotateCcw"
                            iconPosition="left"
                        >
                            Recalculate Route
                        </Button>
                        <Button
                            variant="ghost"
                            fullWidth
                            iconName="Phone"
                            iconPosition="left"
                        >
                            Call Customer
                        </Button>
                    </>
                )}
            </div>
            {/* Route Information */}
            <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} className="text-primary" />
                        <span className="text-sm text-text-primary">Estimated Time</span>
                    </div>
                    <span className="text-sm font-medium text-text-primary">{currentDelivery?.estimatedTime}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-2">
                        <Icon name="Route" size={16} className="text-primary" />
                        <span className="text-sm text-text-primary">Route Type</span>
                    </div>
                    <span className="text-sm font-medium text-text-primary">Fastest Route</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-2">
                        <Icon name="AlertTriangle" size={16} className="text-warning" />
                        <span className="text-sm text-text-primary">Traffic Status</span>
                    </div>
                    <span className="text-sm font-medium text-warning">Moderate</span>
                </div>
            </div>
            {/* Map Preview */}
            <div className="mb-6">
                <div className="w-full h-48 bg-muted rounded-lg overflow-hidden">
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
                <Button
                    variant="outline"
                    size="sm"
                    iconName="AlertCircle"
                    iconPosition="left"
                    onClick={() => onReportIssue(currentDelivery?.id)}
                >
                    Report Issue
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageSquare"
                    iconPosition="left"
                >
                    Customer Chat
                </Button>
            </div>
        </div>
    );
};

export default NavigationAssistant;