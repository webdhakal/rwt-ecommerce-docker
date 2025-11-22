import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '@/components/Button';

const DeliveryPartnerCard = ({ partner, onToggleFavorite, onViewProfile }) => {
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Icon
                key={index}
                name="Star"
                size={14}
                className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-gray-300'}
            />
        ));
    };

    return (
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Image
                            src={partner?.avatar}
                            alt={partner?.avatarAlt}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${partner?.isOnline ? 'bg-success' : 'bg-gray-400'
                            }`}></div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-text-primary">{partner?.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                                {renderStars(partner?.rating)}
                                <span className="text-sm text-muted-foreground ml-1">({partner?.totalRatings})</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    iconName={partner?.isFavorite ? "Heart" : "Heart"}
                    className={partner?.isFavorite ? 'text-error' : 'text-muted-foreground'}
                    onClick={() => onToggleFavorite(partner?.id)}
                />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold text-text-primary">{partner?.completedDeliveries}</div>
                    <div className="text-xs text-muted-foreground">Deliveries</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold text-text-primary">{partner?.onTimeRate}%</div>
                    <div className="text-xs text-muted-foreground">On Time</div>
                </div>
            </div>
            <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Specialties:</span>
                    <div className="flex flex-wrap gap-1">
                        {partner?.specialties?.map((specialty, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                                {specialty}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Coverage Area:</span>
                    <span className="text-text-primary">{partner?.coverageArea}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last Delivery:</span>
                    <span className="text-text-primary">{partner?.lastDelivery}</span>
                </div>
            </div>
            <div className="flex items-center space-x-2 pt-4 border-t border-border">
                <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="User"
                    iconPosition="left"
                    onClick={() => onViewProfile(partner)}
                >
                    View Profile
                </Button>
                <Button
                    variant={partner?.isFavorite ? "default" : "outline"}
                    size="sm"
                    fullWidth
                    iconName={partner?.isFavorite ? "Check" : "Plus"}
                    iconPosition="left"
                >
                    {partner?.isFavorite ? 'Preferred' : 'Add to Preferred'}
                </Button>
            </div>
        </div>
    );
};

export default DeliveryPartnerCard;