import React, { useState } from 'react';
import Button from '@/components/Button';
import Icon from '../../../components/AppIcon';

const RouteOptimizationPanel = ({ activeDeliveries, onOptimizeRoute, isOptimizing }) => {
    const [selectedDeliveries, setSelectedDeliveries] = useState([]);

    const toggleDeliverySelection = (deliveryId) => {
        setSelectedDeliveries(prev =>
            prev?.includes(deliveryId)
                ? prev?.filter(id => id !== deliveryId)
                : [...prev, deliveryId]
        );
    };

    const selectAllDeliveries = () => {
        setSelectedDeliveries(activeDeliveries?.map(d => d?.id));
    };

    const clearSelection = () => {
        setSelectedDeliveries([]);
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
                    <Icon name="Route" size={20} className="text-primary" />
                    <span>Route Optimization</span>
                </h3>
                <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={selectAllDeliveries}>
                        Select All
                    </Button>
                    <Button variant="ghost" size="sm" onClick={clearSelection}>
                        Clear
                    </Button>
                </div>
            </div>
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {activeDeliveries?.map((delivery) => (
                    <div
                        key={delivery?.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${selectedDeliveries?.includes(delivery?.id)
                            ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
                            }`}
                        onClick={() => toggleDeliverySelection(delivery?.id)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${selectedDeliveries?.includes(delivery?.id)
                                    ? 'border-primary bg-primary' : 'border-muted-foreground'
                                    }`}>
                                    {selectedDeliveries?.includes(delivery?.id) && (
                                        <Icon name="Check" size={12} color="white" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium text-text-primary">{delivery?.recipient}</p>
                                    <p className="text-sm text-text-secondary">{delivery?.address}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-text-primary">{delivery?.distance}</p>
                                <p className="text-xs text-text-secondary">{delivery?.priority}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-muted rounded-lg p-4 mb-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-sm text-text-secondary">Selected</p>
                        <p className="font-semibold text-text-primary">{selectedDeliveries?.length}</p>
                    </div>
                    <div>
                        <p className="text-sm text-text-secondary">Est. Time</p>
                        <p className="font-semibold text-text-primary">
                            {selectedDeliveries?.length > 0 ? `${selectedDeliveries?.length * 15}min` : '--'}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-text-secondary">Distance</p>
                        <p className="font-semibold text-text-primary">
                            {selectedDeliveries?.length > 0 ? `${selectedDeliveries?.length * 2.3}mi` : '--'}
                        </p>
                    </div>
                </div>
            </div>
            <Button
                variant="default"
                fullWidth
                loading={isOptimizing}
                iconName="Navigation"
                iconPosition="left"
                onClick={() => onOptimizeRoute(selectedDeliveries)}
                disabled={selectedDeliveries?.length === 0}
            >
                Optimize Route ({selectedDeliveries?.length} deliveries)
            </Button>
        </div>
    );
};

export default RouteOptimizationPanel;