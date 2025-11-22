import React, { useState } from 'react';
import Button from '@/components/Button';


const ShiftActivationCard = ({ isOnline, onToggleShift, currentShift, todayEarnings }) => {
    const [isToggling, setIsToggling] = useState(false);

    const handleToggleShift = async () => {
        setIsToggling(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        onToggleShift();
        setIsToggling(false);
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${isOnline ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`}></div>
                    <h3 className="text-lg font-semibold text-text-primary">
                        {isOnline ? 'You\'re Online' : 'You\'re Offline'}
                    </h3>
                </div>
                <div className="text-right">
                    <p className="text-sm text-text-secondary">Today's Earnings</p>
                    <p className="text-xl font-bold text-success">${todayEarnings}</p>
                </div>
            </div>
            {isOnline && currentShift && (
                <div className="bg-muted rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-text-secondary">Shift Started</p>
                            <p className="font-medium text-text-primary">{currentShift?.startTime}</p>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary">Hours Online</p>
                            <p className="font-medium text-text-primary">{currentShift?.hoursOnline}h</p>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary">Deliveries</p>
                            <p className="font-medium text-text-primary">{currentShift?.deliveries}</p>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary">Earnings</p>
                            <p className="font-medium text-success">${currentShift?.earnings}</p>
                        </div>
                    </div>
                </div>
            )}
            <Button
                variant={isOnline ? "destructive" : "default"}
                fullWidth
                loading={isToggling}
                iconName={isOnline ? "Power" : "Play"}
                iconPosition="left"
                onClick={handleToggleShift}
            >
                {isOnline ? 'End Shift' : 'Start Shift'}
            </Button>
            {!isOnline && (
                <p className="text-sm text-text-secondary text-center mt-3">
                    Go online to start receiving delivery requests
                </p>
            )}
        </div>
    );
};

export default ShiftActivationCard;