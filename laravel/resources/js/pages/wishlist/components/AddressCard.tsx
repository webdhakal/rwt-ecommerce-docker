import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '@/components/Button';

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
    return (
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${address?.category === 'home' ? 'bg-accent/10 text-accent' :
                        address?.category === 'work' ? 'bg-primary/10 text-primary' :
                            address?.category === 'family' ? 'bg-warning/10 text-warning' : 'bg-secondary/10 text-secondary'
                        }`}>
                        <Icon
                            name={
                                address?.category === 'home' ? 'Home' :
                                    address?.category === 'work' ? 'Building2' :
                                        address?.category === 'family' ? 'Users' : 'MapPin'
                            }
                            size={20}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-text-primary">{address?.label}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${address?.isDefault ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                            }`}>
                            {address?.isDefault ? 'Default' : address?.category}
                        </span>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Edit2" onClick={() => onEdit(address)} />
                    <Button variant="ghost" size="sm" iconName="Trash2" onClick={() => onDelete(address?.id)} />
                </div>
            </div>
            <div className="space-y-2 mb-4">
                <p className="text-sm text-text-primary">{address?.street}</p>
                <p className="text-sm text-text-secondary">{address?.city}, {address?.state} {address?.zipCode}</p>
                {address?.instructions && (
                    <div className="flex items-start space-x-2 mt-3 p-3 bg-muted/50 rounded-lg">
                        <Icon name="MessageSquare" size={16} className="text-muted-foreground mt-0.5" />
                        <p className="text-sm text-text-secondary">{address?.instructions}</p>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                        <Icon name="Package" size={14} />
                        <span>{address?.deliveryCount} deliveries</span>
                    </span>
                    <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{address?.preferredTime}</span>
                    </span>
                </div>

                {!address?.isDefault && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onSetDefault(address?.id)}
                    >
                        Set Default
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AddressCard;