import Button from '@/components/Button';
import { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RouteOptimizationPanel = ({ activeDeliveries, onOptimizeRoute, isOptimizing }) => {
    const [selectedDeliveries, setSelectedDeliveries] = useState([]);

    const toggleDeliverySelection = (deliveryId) => {
        setSelectedDeliveries((prev) => (prev?.includes(deliveryId) ? prev?.filter((id) => id !== deliveryId) : [...prev, deliveryId]));
    };

    const selectAllDeliveries = () => {
        setSelectedDeliveries(activeDeliveries?.map((d) => d?.id));
    };

    const clearSelection = () => {
        setSelectedDeliveries([]);
    };

    return (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-text-primary flex items-center space-x-2 text-lg font-semibold">
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
            <div className="mb-6 max-h-64 space-y-3 overflow-y-auto">
                {activeDeliveries?.map((delivery) => (
                    <div
                        key={delivery?.id}
                        className={`cursor-pointer rounded-lg border p-4 transition-all duration-200 ${
                            selectedDeliveries?.includes(delivery?.id) ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
                        }`}
                        onClick={() => toggleDeliverySelection(delivery?.id)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div
                                    className={`flex h-4 w-4 items-center justify-center rounded border-2 ${
                                        selectedDeliveries?.includes(delivery?.id) ? 'border-primary bg-primary' : 'border-muted-foreground'
                                    }`}
                                >
                                    {selectedDeliveries?.includes(delivery?.id) && <Icon name="Check" size={12} color="white" />}
                                </div>
                                <div>
                                    <p className="text-text-primary font-medium">{delivery?.recipient}</p>
                                    <p className="text-text-secondary text-sm">{delivery?.address}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-text-primary text-sm font-medium">{delivery?.distance}</p>
                                <p className="text-text-secondary text-xs">{delivery?.priority}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mb-4 rounded-lg bg-muted p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-text-secondary text-sm">Selected</p>
                        <p className="text-text-primary font-semibold">{selectedDeliveries?.length}</p>
                    </div>
                    <div>
                        <p className="text-text-secondary text-sm">Est. Time</p>
                        <p className="text-text-primary font-semibold">
                            {selectedDeliveries?.length > 0 ? `${selectedDeliveries?.length * 15}min` : '--'}
                        </p>
                    </div>
                    <div>
                        <p className="text-text-secondary text-sm">Distance</p>
                        <p className="text-text-primary font-semibold">
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
