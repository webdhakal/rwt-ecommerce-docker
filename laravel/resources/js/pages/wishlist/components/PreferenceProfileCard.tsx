import Button from '@/components/Button';
import Icon from '../../../components/AppIcon';

const PreferenceProfileCard = ({ profile, onEdit, onDelete, onSetDefault, onDuplicate }) => {
    const getProfileTypeIcon = (type) => {
        switch (type) {
            case 'urgent':
                return 'Zap';
            case 'standard':
                return 'Package';
            case 'eco-friendly':
                return 'Leaf';
            case 'business':
                return 'Building2';
            case 'personal':
                return 'User';
            default:
                return 'Settings';
        }
    };

    const getProfileTypeColor = (type) => {
        switch (type) {
            case 'urgent':
                return 'text-error bg-error/10';
            case 'standard':
                return 'text-primary bg-primary/10';
            case 'eco-friendly':
                return 'text-success bg-success/10';
            case 'business':
                return 'text-secondary bg-secondary/10';
            case 'personal':
                return 'text-accent bg-accent/10';
            default:
                return 'text-muted-foreground bg-muted';
        }
    };

    return (
        <div className="rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:shadow-md">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getProfileTypeColor(profile?.type)}`}>
                        <Icon name={getProfileTypeIcon(profile?.type)} size={20} />
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h3 className="text-text-primary font-semibold">{profile?.name}</h3>
                            {profile?.isDefault && (
                                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Default</span>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">{profile?.description}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Copy" onClick={() => onDuplicate(profile)} />
                    <Button variant="ghost" size="sm" iconName="Edit2" onClick={() => onEdit(profile)} />
                    <Button variant="ghost" size="sm" iconName="Trash2" onClick={() => onDelete(profile?.id)} />
                </div>
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Delivery Speed:</span>
                        <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                                profile?.deliverySpeed === 'Express'
                                    ? 'bg-error/10 text-error'
                                    : profile?.deliverySpeed === 'Standard'
                                      ? 'bg-primary/10 text-primary'
                                      : 'bg-success/10 text-success'
                            }`}
                        >
                            {profile?.deliverySpeed}
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Insurance:</span>
                        <span className="text-text-primary">{profile?.insurance ? 'Always' : 'Optional'}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Signature:</span>
                        <span className="text-text-primary">{profile?.signatureRequired ? 'Required' : 'Optional'}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Notifications:</span>
                        <span className="text-text-primary">{profile?.notifications}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Eco Priority:</span>
                        <div className="flex items-center space-x-1">
                            {profile?.ecoFriendly && <Icon name="Leaf" size={14} className="text-success" />}
                            <span className="text-text-primary">{profile?.ecoFriendly ? 'High' : 'Standard'}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Cost Priority:</span>
                        <span className="text-text-primary">{profile?.costPriority}</span>
                    </div>
                </div>
            </div>
            {profile?.specialInstructions && (
                <div className="mb-4">
                    <div className="mb-2 text-sm text-muted-foreground">Special Instructions:</div>
                    <div className="rounded-lg bg-muted/50 p-3">
                        <p className="text-text-secondary text-sm">{profile?.specialInstructions}</p>
                    </div>
                </div>
            )}
            <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                        <Icon name="Package" size={14} />
                        <span>{profile?.usageCount} shipments</span>
                    </span>
                    <span className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>Last used {profile?.lastUsed}</span>
                    </span>
                </div>

                <div className="flex items-center space-x-2">
                    {!profile?.isDefault && (
                        <Button variant="outline" size="sm" onClick={() => onSetDefault(profile?.id)}>
                            Set Default
                        </Button>
                    )}
                    <Button variant="default" size="sm" iconName="Send" iconPosition="right">
                        Use Profile
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PreferenceProfileCard;
