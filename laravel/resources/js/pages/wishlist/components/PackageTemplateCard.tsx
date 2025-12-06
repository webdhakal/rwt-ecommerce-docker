import Button from '@/components/Button';
import Icon from '../../../components/AppIcon';

const PackageTemplateCard = ({ template, onEdit, onDelete, onUseTemplate }) => {
    const getDeliverySpeedColor = (speed) => {
        switch (speed) {
            case 'Express':
                return 'text-error bg-error/10';
            case 'Standard':
                return 'text-primary bg-primary/10';
            case 'Economy':
                return 'text-success bg-success/10';
            default:
                return 'text-muted-foreground bg-muted';
        }
    };

    return (
        <div className="rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:shadow-md">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon name="Package" size={20} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="text-text-primary font-semibold">{template?.name}</h3>
                        <p className="text-sm text-muted-foreground">{template?.description}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Edit2" onClick={() => onEdit(template)} />
                    <Button variant="ghost" size="sm" iconName="Trash2" onClick={() => onDelete(template?.id)} />
                </div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
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
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${getDeliverySpeedColor(template?.deliverySpeed)}`}>
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
                    <div className="mb-2 text-sm text-muted-foreground">Special Handling:</div>
                    <div className="flex flex-wrap gap-2">
                        {template?.specialHandling?.map((handling, index) => (
                            <span key={index} className="bg-warning/10 text-warning rounded-full px-2 py-1 text-xs">
                                {handling}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            <div className="flex items-center justify-between border-t border-border pt-4">
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

                <Button variant="default" size="sm" iconName="Send" iconPosition="right" onClick={() => onUseTemplate(template)}>
                    Use Template
                </Button>
            </div>
        </div>
    );
};

export default PackageTemplateCard;
