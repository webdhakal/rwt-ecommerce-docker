import Button from '@/components/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DeliveryPartnerCard = ({ partner, onToggleFavorite, onViewProfile }) => {
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Icon key={index} name="Star" size={14} className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-gray-300'} />
        ));
    };

    return (
        <div className="rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:shadow-md">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Image src={partner?.avatar} alt={partner?.avatarAlt} className="h-12 w-12 rounded-full object-cover" />
                        <div
                            className={`absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white ${
                                partner?.isOnline ? 'bg-success' : 'bg-gray-400'
                            }`}
                        ></div>
                    </div>
                    <div>
                        <h3 className="text-text-primary font-semibold">{partner?.name}</h3>
                        <div className="mt-1 flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                                {renderStars(partner?.rating)}
                                <span className="ml-1 text-sm text-muted-foreground">({partner?.totalRatings})</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    iconName={partner?.isFavorite ? 'Heart' : 'Heart'}
                    className={partner?.isFavorite ? 'text-error' : 'text-muted-foreground'}
                    onClick={() => onToggleFavorite(partner?.id)}
                />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <div className="text-text-primary text-lg font-semibold">{partner?.completedDeliveries}</div>
                    <div className="text-xs text-muted-foreground">Deliveries</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <div className="text-text-primary text-lg font-semibold">{partner?.onTimeRate}%</div>
                    <div className="text-xs text-muted-foreground">On Time</div>
                </div>
            </div>
            <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Specialties:</span>
                    <div className="flex flex-wrap gap-1">
                        {partner?.specialties?.map((specialty, index) => (
                            <span key={index} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
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
            <div className="flex items-center space-x-2 border-t border-border pt-4">
                <Button variant="outline" size="sm" fullWidth iconName="User" iconPosition="left" onClick={() => onViewProfile(partner)}>
                    View Profile
                </Button>
                <Button
                    variant={partner?.isFavorite ? 'default' : 'outline'}
                    size="sm"
                    fullWidth
                    iconName={partner?.isFavorite ? 'Check' : 'Plus'}
                    iconPosition="left"
                >
                    {partner?.isFavorite ? 'Preferred' : 'Add to Preferred'}
                </Button>
            </div>
        </div>
    );
};

export default DeliveryPartnerCard;
