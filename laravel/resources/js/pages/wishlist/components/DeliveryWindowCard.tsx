import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '@/components/Button';

const DeliveryWindowCard = ({ window, onEdit, onDelete, onToggleActive }) => {
    const getDayAbbreviation = (day) => {
        const abbrev = {
            'Monday': 'Mon',
            'Tuesday': 'Tue',
            'Wednesday': 'Wed',
            'Thursday': 'Thu',
            'Friday': 'Fri',
            'Saturday': 'Sat',
            'Sunday': 'Sun'
        };
        return abbrev?.[day] || day;
    };

    return (
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${window?.isActive ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                        }`}>
                        <Icon name="Clock" size={20} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-text-primary">{window?.name}</h3>
                        <p className="text-sm text-muted-foreground">{window?.description}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        iconName={window?.isActive ? "Pause" : "Play"}
                        onClick={() => onToggleActive(window?.id)}
                    />
                    <Button variant="ghost" size="sm" iconName="Edit2" onClick={() => onEdit(window)} />
                    <Button variant="ghost" size="sm" iconName="Trash2" onClick={() => onDelete(window?.id)} />
                </div>
            </div>
            <div className="space-y-4 mb-4">
                <div>
                    <div className="text-sm text-muted-foreground mb-2">Time Range:</div>
                    <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-lg font-medium">
                            {window?.startTime}
                        </span>
                        <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-lg font-medium">
                            {window?.endTime}
                        </span>
                    </div>
                </div>

                <div>
                    <div className="text-sm text-muted-foreground mb-2">Days:</div>
                    <div className="flex flex-wrap gap-2">
                        {window?.days?.map((day, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium"
                            >
                                {getDayAbbreviation(day)}
                            </span>
                        ))}
                    </div>
                </div>

                {window?.isRecurring && (
                    <div>
                        <div className="text-sm text-muted-foreground mb-2">Recurrence:</div>
                        <div className="flex items-center space-x-2">
                            <Icon name="RotateCcw" size={16} className="text-accent" />
                            <span className="text-sm text-text-primary">{window?.recurrencePattern}</span>
                        </div>
                    </div>
                )}

                {window?.specialInstructions && (
                    <div>
                        <div className="text-sm text-muted-foreground mb-2">Special Instructions:</div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-text-secondary">{window?.specialInstructions}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border">
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
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${window?.isActive ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                        }`}>
                        {window?.isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DeliveryWindowCard;