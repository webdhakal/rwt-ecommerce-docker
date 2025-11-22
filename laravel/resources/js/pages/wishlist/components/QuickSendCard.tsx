import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '@/components/Button';

const QuickSendCard = ({ config, onEdit, onDelete, onUseConfig }) => {
    return (
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon name="Send" size={20} className="text-accent" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-text-primary">{config?.name}</h3>
                        <p className="text-sm text-muted-foreground">{config?.description}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Edit2" onClick={() => onEdit(config)} />
                    <Button variant="ghost" size="sm" iconName="Trash2" onClick={() => onDelete(config?.id)} />
                </div>
            </div>
            <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Recipient:</span>
                    <span className="text-text-primary font-medium">{config?.recipient?.name}</span>
                </div>

                <div className="flex items-start justify-between text-sm">
                    <span className="text-muted-foreground">Address:</span>
                    <div className="text-right">
                        <div className="text-text-primary">{config?.recipient?.address?.street}</div>
                        <div className="text-muted-foreground">{config?.recipient?.address?.city}, {config?.recipient?.address?.state}</div>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Package Type:</span>
                    <span className="text-text-primary">{config?.packageTemplate?.name}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Speed:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.deliveryPreferences?.speed === 'Express' ? 'bg-error/10 text-error' :
                        config?.deliveryPreferences?.speed === 'Standard' ? 'bg-primary/10 text-primary' : 'bg-success/10 text-success'
                        }`}>
                        {config?.deliveryPreferences?.speed}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Cost:</span>
                    <span className="text-text-primary font-semibold">${config?.estimatedCost}</span>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                {config?.features?.map((feature, index) => (
                    <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                        {feature}
                    </span>
                ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                        <Icon name="RotateCcw" size={14} />
                        <span>Used {config?.usageCount} times</span>
                    </span>
                    <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>Avg. {config?.averageDeliveryTime}</span>
                    </span>
                </div>

                <Button
                    variant="default"
                    size="sm"
                    iconName="Send"
                    iconPosition="right"
                    onClick={() => onUseConfig(config)}
                >
                    Quick Send
                </Button>
            </div>
        </div>
    );
};

export default QuickSendCard;