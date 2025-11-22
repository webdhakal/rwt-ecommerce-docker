import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '@/components/Button';

const PackageTemplateCard = ({ template, onEdit, onDelete, onUseTemplate }) => {
    const getDeliverySpeedColor = (speed) => {
        switch (speed) {
            case 'Express': return 'text-error bg-error/10';
            case 'Standard': return 'text-primary bg-primary/10';
            case 'Economy': return 'text-success bg-success/10';
            default: return 'text-muted-foreground bg-muted';
        }
    };

    return (
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Package" size={20} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-text-primary">{template?.name}</h3>
                        <p className="text-sm text-muted-foreground">{template?.description}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Edit2" onClick={() => onEdit(template)} />
                    <Button variant="ghost" size="sm" iconName="Trash2" onClick={() => onDelete(template?.id)} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Dimensions:</span>
                        <span className="text-text-primary">{template?.dimensions}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Weight:</span>
                        <span className="text-text-primary">{template?.weight}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Value:</span>
                        <span className="text-text-primary">${template?.declaredValue}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Speed:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDeliverySpeedColor(template?.deliverySpeed)}`}>
                            {template?.deliverySpeed}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Insurance:</span>
                        <span className="text-text-primary">{template?.insurance ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Signature:</span>
                        <span className="text-text-primary">{template?.signatureRequired ? 'Required' : 'Optional'}</span>
                    </div>
                </div>
            </div>
            {template?.specialHandling?.length > 0 && (
                <div className="mb-4">
                    <div className="text-sm text-muted-foreground mb-2">Special Handling:</div>
                    <div className="flex flex-wrap gap-2">
                        {template?.specialHandling?.map((handling, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full"
                            >
                                {handling}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                        <Icon name="RotateCcw" size={14} />
                        <span>Used {template?.usageCount} times</span>
                    </span>
                    <span className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>Created {template?.createdDate}</span>
                    </span>
                </div>

                <Button
                    variant="default"
                    size="sm"
                    iconName="Send"
                    iconPosition="right"
                    onClick={() => onUseTemplate(template)}
                >
                    Use Template
                </Button>
            </div>
        </div>
    );
};

export default PackageTemplateCard;