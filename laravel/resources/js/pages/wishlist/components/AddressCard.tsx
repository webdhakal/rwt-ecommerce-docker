import Button from '@/components/Button';
import Icon from '../../../components/AppIcon';

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
    return (
        <div className="rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:shadow-md">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            address?.category === 'home'
                                ? 'bg-accent/10 text-accent'
                                : address?.category === 'work'
                                  ? 'bg-primary/10 text-primary'
                                  : address?.category === 'family'
                                    ? 'bg-warning/10 text-warning'
                                    : 'bg-secondary/10 text-secondary'
                        }`}
                    >
                        <Icon
                            name={
                                address?.category === 'home'
                                    ? 'Home'
                                    : address?.category === 'work'
                                      ? 'Building2'
                                      : address?.category === 'family'
                                        ? 'Users'
                                        : 'MapPin'
                            }
                            size={20}
                        />
                    </div>
                    <div>
                        <h3 className="text-text-primary font-semibold">{address?.label}</h3>
                        <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                address?.isDefault ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                            }`}
                        >
                            {address?.isDefault ? 'Default' : address?.category}
                        </span>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Edit2" onClick={() => onEdit(address)} />
                    <Button variant="ghost" size="sm" iconName="Trash2" onClick={() => onDelete(address?.id)} />
                </div>
            </div>
            <div className="mb-4 space-y-2">
                <p className="text-text-primary text-sm">{address?.street}</p>
                <p className="text-text-secondary text-sm">
                    {address?.city}, {address?.state} {address?.zipCode}
                </p>
                {address?.instructions && (
                    <div className="mt-3 flex items-start space-x-2 rounded-lg bg-muted/50 p-3">
                        <Icon name="MessageSquare" size={16} className="mt-0.5 text-muted-foreground" />
                        <p className="text-text-secondary text-sm">{address?.instructions}</p>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
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
                    <Button variant="outline" size="sm" onClick={() => onSetDefault(address?.id)}>
                        Set Default
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AddressCard;
