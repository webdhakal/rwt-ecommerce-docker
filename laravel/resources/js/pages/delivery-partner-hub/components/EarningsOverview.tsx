import React from 'react';
import Icon from '../../../components/AppIcon';

const EarningsOverview = ({ earningsData, performanceMetrics }) => {
    const earningsCards = [
        {
            title: 'Today',
            amount: earningsData?.today,
            change: '+12%',
            icon: 'Calendar',
            color: 'text-success'
        },
        {
            title: 'This Week',
            amount: earningsData?.week,
            change: '+8%',
            icon: 'CalendarDays',
            color: 'text-primary'
        },
        {
            title: 'This Month',
            amount: earningsData?.month,
            change: '+15%',
            icon: 'CalendarRange',
            color: 'text-accent'
        },
        {
            title: 'Total Earned',
            amount: earningsData?.total,
            change: '+22%',
            icon: 'Wallet',
            color: 'text-trust'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Earnings Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {earningsCards?.map((card, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${card?.color}`}>
                                <Icon name={card?.icon} size={20} />
                            </div>
                            <span className="text-sm font-medium text-success">{card?.change}</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-text-primary">${card?.amount}</p>
                            <p className="text-sm text-text-secondary">{card?.title}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Performance Metrics */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center space-x-2">
                    <Icon name="TrendingUp" size={20} className="text-primary" />
                    <span>Performance Metrics</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-success/10 flex items-center justify-center">
                            <Icon name="CheckCircle" size={24} className="text-success" />
                        </div>
                        <p className="text-2xl font-bold text-text-primary">{performanceMetrics?.completionRate}%</p>
                        <p className="text-sm text-text-secondary">Completion Rate</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-warning/10 flex items-center justify-center">
                            <Icon name="Star" size={24} className="text-warning" />
                        </div>
                        <p className="text-2xl font-bold text-text-primary">{performanceMetrics?.rating}</p>
                        <p className="text-sm text-text-secondary">Average Rating</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon name="Clock" size={24} className="text-primary" />
                        </div>
                        <p className="text-2xl font-bold text-text-primary">{performanceMetrics?.avgDeliveryTime}min</p>
                        <p className="text-sm text-text-secondary">Avg Delivery Time</p>
                    </div>
                </div>
            </div>
            {/* Recent Earnings */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Earnings</h3>
                <div className="space-y-3">
                    {earningsData?.recent?.map((earning, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                                    <Icon name="Package" size={16} className="text-success" />
                                </div>
                                <div>
                                    <p className="font-medium text-text-primary">{earning?.description}</p>
                                    <p className="text-sm text-text-secondary">{earning?.time}</p>
                                </div>
                            </div>
                            <p className="font-semibold text-success">+${earning?.amount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EarningsOverview;