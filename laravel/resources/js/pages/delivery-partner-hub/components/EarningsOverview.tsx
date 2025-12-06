import Icon from '../../../components/AppIcon';

const EarningsOverview = ({ earningsData, performanceMetrics }) => {
    const earningsCards = [
        {
            title: 'Today',
            amount: earningsData?.today,
            change: '+12%',
            icon: 'Calendar',
            color: 'text-success',
        },
        {
            title: 'This Week',
            amount: earningsData?.week,
            change: '+8%',
            icon: 'CalendarDays',
            color: 'text-primary',
        },
        {
            title: 'This Month',
            amount: earningsData?.month,
            change: '+15%',
            icon: 'CalendarRange',
            color: 'text-accent',
        },
        {
            title: 'Total Earned',
            amount: earningsData?.total,
            change: '+22%',
            icon: 'Wallet',
            color: 'text-trust',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Earnings Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {earningsCards?.map((card, index) => (
                    <div key={index} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${card?.color}`}>
                                <Icon name={card?.icon} size={20} />
                            </div>
                            <span className="text-success text-sm font-medium">{card?.change}</span>
                        </div>
                        <div>
                            <p className="text-text-primary text-2xl font-bold">${card?.amount}</p>
                            <p className="text-text-secondary text-sm">{card?.title}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Performance Metrics */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-text-primary mb-6 flex items-center space-x-2 text-lg font-semibold">
                    <Icon name="TrendingUp" size={20} className="text-primary" />
                    <span>Performance Metrics</span>
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="text-center">
                        <div className="bg-success/10 mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full">
                            <Icon name="CheckCircle" size={24} className="text-success" />
                        </div>
                        <p className="text-text-primary text-2xl font-bold">{performanceMetrics?.completionRate}%</p>
                        <p className="text-text-secondary text-sm">Completion Rate</p>
                    </div>

                    <div className="text-center">
                        <div className="bg-warning/10 mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full">
                            <Icon name="Star" size={24} className="text-warning" />
                        </div>
                        <p className="text-text-primary text-2xl font-bold">{performanceMetrics?.rating}</p>
                        <p className="text-text-secondary text-sm">Average Rating</p>
                    </div>

                    <div className="text-center">
                        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <Icon name="Clock" size={24} className="text-primary" />
                        </div>
                        <p className="text-text-primary text-2xl font-bold">{performanceMetrics?.avgDeliveryTime}min</p>
                        <p className="text-text-secondary text-sm">Avg Delivery Time</p>
                    </div>
                </div>
            </div>
            {/* Recent Earnings */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-text-primary mb-4 text-lg font-semibold">Recent Earnings</h3>
                <div className="space-y-3">
                    {earningsData?.recent?.map((earning, index) => (
                        <div key={index} className="flex items-center justify-between rounded-lg bg-muted p-3">
                            <div className="flex items-center space-x-3">
                                <div className="bg-success/10 flex h-8 w-8 items-center justify-center rounded-full">
                                    <Icon name="Package" size={16} className="text-success" />
                                </div>
                                <div>
                                    <p className="text-text-primary font-medium">{earning?.description}</p>
                                    <p className="text-text-secondary text-sm">{earning?.time}</p>
                                </div>
                            </div>
                            <p className="text-success font-semibold">+${earning?.amount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EarningsOverview;
