import Button from '@/components/Button';
import Icon from '../../../components/AppIcon';

const DeliveryWindowCard = ({ window, onEdit, onDelete, onToggleActive }) => {
    const getDayAbbreviation = (day) => {
        const abbrev = {
            Monday: 'Mon',
            Tuesday: 'Tue',
            Wednesday: 'Wed',
            Thursday: 'Thu',
            Friday: 'Fri',
            Saturday: 'Sat',
            Sunday: 'Sun',
        };
        return abbrev?.[day] || day;
    };

    return (
        <div className="rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:shadow-md">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            window?.isActive ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                        }`}
                    >
                        <Icon name="Clock" size={20} />
                    </div>
                    <div>
                        <h3 className="text-text-primary font-semibold">{window?.name}</h3>
                        <p className="text-sm text-muted-foreground">{window?.description}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName={window?.isActive ? 'Pause' : 'Play'} onClick={() => onToggleActive(window?.id)} />
                    <Button variant="ghost" size="sm" iconName="Edit2" onClick={() => onEdit(window)} />
                    <Button variant="ghost" size="sm" iconName="Trash2" onClick={() => onDelete(window?.id)} />
                </div>
            </div>
            <div className="mb-4 space-y-4">
                <div>
                    <div className="mb-2 text-sm text-muted-foreground">Time Range:</div>
                    <div className="flex items-center space-x-2">
                        <span className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{window?.startTime}</span>
                        <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                        <span className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{window?.endTime}</span>
                    </div>
                </div>

                <div>
                    <div className="mb-2 text-sm text-muted-foreground">Days:</div>
                    <div className="flex flex-wrap gap-2">
                        {window?.days?.map((day, index) => (
                            <span key={index} className="rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                                {getDayAbbreviation(day)}
                            </span>
                        ))}
                    </div>
                </div>

                {window?.isRecurring && (
                    <div>
                        <div className="mb-2 text-sm text-muted-foreground">Recurrence:</div>
                        <div className="flex items-center space-x-2">
                            <Icon name="RotateCcw" size={16} className="text-accent" />
                            <span className="text-text-primary text-sm">{window?.recurrencePattern}</span>
                        </div>
                    </div>
                )}

                {window?.specialInstructions && (
                    <div>
                        <div className="mb-2 text-sm text-muted-foreground">Special Instructions:</div>
                        <div className="rounded-lg bg-muted/50 p-3">
                            <p className="text-text-secondary text-sm">{window?.specialInstructions}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                        <Icon name="Package" size={14} />
                        <span>{window?.deliveriesScheduled} scheduled</span>
                    </span>
                    <span className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>Next: {window?.nextDelivery}</span>
                    </span>
                </div>

                <div className="flex items-center space-x-2">
                    <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            window?.isActive ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                        }`}
                    >
                        {window?.isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DeliveryWindowCard;
