import Icon from '@/components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
    return (
        <div className="top-16 z-10 border-b border-border bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="scrollbar-hide flex overflow-x-auto">
                    {tabs?.map((tab) => (
                        <button
                            key={tab?.id}
                            onClick={() => onTabChange(tab?.id)}
                            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                                activeTab === tab?.id
                                    ? 'border-primary text-primary'
                                    : 'text-text-secondary border-transparent hover:border-border hover:text-primary'
                            }`}
                        >
                            <Icon name={tab?.icon} size={16} />
                            <span>{tab?.label}</span>
                            {tab?.count && <span className="text-text-secondary ml-1 rounded-full bg-muted px-2 py-0.5 text-xs">{tab?.count}</span>}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TabNavigation;
