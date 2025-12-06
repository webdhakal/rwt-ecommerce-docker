import Button from '@/components/Button';
import { useState } from 'react';

const ShiftActivationCard = ({ isOnline, onToggleShift, currentShift, todayEarnings }) => {
    const [isToggling, setIsToggling] = useState(false);

    const handleToggleShift = async () => {
        setIsToggling(true);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        onToggleShift();
        setIsToggling(false);
    };

    return (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className={`h-4 w-4 rounded-full ${isOnline ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`}></div>
                    <h3 className="text-text-primary text-lg font-semibold">{isOnline ? "You're Online" : "You're Offline"}</h3>
                </div>
                <div className="text-right">
                    <p className="text-text-secondary text-sm">Today's Earnings</p>
                    <p className="text-success text-xl font-bold">${todayEarnings}</p>
                </div>
            </div>
            {isOnline && currentShift && (
                <div className="mb-6 rounded-lg bg-muted p-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-text-secondary text-sm">Shift Started</p>
                            <p className="text-text-primary font-medium">{currentShift?.startTime}</p>
                        </div>
                        <div>
                            <p className="text-text-secondary text-sm">Hours Online</p>
                            <p className="text-text-primary font-medium">{currentShift?.hoursOnline}h</p>
                        </div>
                        <div>
                            <p className="text-text-secondary text-sm">Deliveries</p>
                            <p className="text-text-primary font-medium">{currentShift?.deliveries}</p>
                        </div>
                        <div>
                            <p className="text-text-secondary text-sm">Earnings</p>
                            <p className="text-success font-medium">${currentShift?.earnings}</p>
                        </div>
                    </div>
                </div>
            )}
            <Button
                variant={isOnline ? 'destructive' : 'default'}
                fullWidth
                loading={isToggling}
                iconName={isOnline ? 'Power' : 'Play'}
                iconPosition="left"
                onClick={handleToggleShift}
            >
                {isOnline ? 'End Shift' : 'Start Shift'}
            </Button>
            {!isOnline && <p className="text-text-secondary mt-3 text-center text-sm">Go online to start receiving delivery requests</p>}
        </div>
    );
};

export default ShiftActivationCard;
