import Button from '@/components/Button';
import Icon from '../../../components/AppIcon';

const QuickSendCard = ({ config, onEdit, onDelete, onUseConfig }) => {
    return (
        <div className="rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:shadow-md">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                        <Icon name="Send" size={20} className="text-accent" />
                    </div>
                    <div>
                        <h3 className="text-text-primary font-semibold">{config?.name}</h3>
                        <p className="text-sm text-muted-foreground">{config?.description}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Edit2" onClick={() => onEdit(config)} />
                    <Button variant="ghost" size="sm" iconName="Trash2" onClick={() => onDelete(config?.id)} />
                </div>
            </div>
            <div className="mb-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Recipient:</span>
                    <span className="text-text-primary font-medium">{config?.recipient?.name}</span>
                </div>

                <div className="flex items-start justify-between text-sm">
                    <span className="text-muted-foreground">Address:</span>
                    <div className="text-right">
                        <div className="text-text-primary">{config?.recipient?.address?.street}</div>
                        <div className="text-muted-foreground">
                            {config?.recipient?.address?.city}, {config?.recipient?.address?.state}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Package Type:</span>
                    <span className="text-text-primary">{config?.packageTemplate?.name}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Speed:</span>
                    <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                            config?.deliveryPreferences?.speed === 'Express'
                                ? 'bg-error/10 text-error'
                                : config?.deliveryPreferences?.speed === 'Standard'
                                  ? 'bg-primary/10 text-primary'
                                  : 'bg-success/10 text-success'
                        }`}
                    >
                        {config?.deliveryPreferences?.speed}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Cost:</span>
                    <span className="text-text-primary font-semibold">${config?.estimatedCost}</span>
                </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
                {config?.features?.map((feature, index) => (
                    <span key={index} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                        {feature}
                    </span>
                ))}
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
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

                <Button variant="default" size="sm" iconName="Send" iconPosition="right" onClick={() => onUseConfig(config)}>
                    Quick Send
                </Button>
            </div>
        </div>
    );
};

export default QuickSendCard;
