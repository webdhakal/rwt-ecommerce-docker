import Button from '@/components/Button';
import { Badge } from '@/shadcn/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/ui/select';
import { FilterState, SidebarData } from '@/types/Sidebar';

const FilterToolbar = ({
    activeFilters,
    onRemoveFilter,
    onClearAllFilters,
    sortBy,
    onSortChange,
    resultsCount,
    onToggleFilters,
    showMobileFilters,
    viewMode,
    sidebar,
    onViewModeChange,
    icons,
}: {
    activeFilters: FilterState;
    onRemoveFilter?: (key: keyof FilterState, value?: any) => void;
    onClearAllFilters: () => void;
    sortBy: string;
    onSortChange: (val: string) => void;
    resultsCount: number;
    onToggleFilters: () => void;
    showMobileFilters: boolean;
    viewMode: 'grid' | 'list';
    sidebar: SidebarData;
    onViewModeChange: (mode: 'grid' | 'list') => void;
    icons: { grid: any; list: any };
}) => {
    const sortOptions = [
        { value: 'relevance', label: 'Best Match' },
        { value: 'price_low', label: 'Price: Low to High' },
        { value: 'price_high', label: 'Price: High to Low' },
        { value: 'rating', label: 'Customer Rating' },
        { value: 'newest', label: 'Newest First' },
        { value: 'popular', label: 'Most Popular' },
    ];

    const GridIcon = icons?.grid;
    const ListIcon = icons?.list;

    // Render active filters as badges
    const renderActiveFilters = () => {
        const entries = Object.entries(activeFilters).filter(([_, val]) => {
            if (Array.isArray(val)) return val.length > 0;
            if (typeof val === 'object' && val !== null) return Object.values(val).some((v) => v);
            return !!val;
        });
        if (!entries.length) return null;

        return (
            <div className="mt-3 flex flex-wrap gap-2">
                {entries.map(([key, val]) => {
                    if (Array.isArray(val)) {
                        return val.map((item, idx) => (
                            <Badge key={`${key}-${idx}`} variant="secondary" className="flex items-center space-x-1">
                                <span>{`${key}: ${item}`}</span>
                                {onRemoveFilter && (
                                    <button
                                        type="button"
                                        className="ml-1 text-xs text-muted-foreground hover:text-foreground"
                                        onClick={() => onRemoveFilter(key as keyof FilterState, item)}
                                    >
                                        ✕
                                    </button>
                                )}
                            </Badge>
                        ));
                    }
                    if (typeof val === 'object' && val !== null) {
                        return Object.entries(val).map(([innerKey, innerVal]) => (
                            <Badge key={`${key}-${innerKey}`} variant="secondary" className="flex items-center space-x-1">
                                {<span>{`${key} ${innerKey}: ${innerVal}`}</span>}
                                {onRemoveFilter && (
                                    <button
                                        type="button"
                                        className="ml-1 text-xs text-muted-foreground hover:text-foreground"
                                        onClick={() => onRemoveFilter(key as keyof FilterState, innerKey)}
                                    >
                                        ✕
                                    </button>
                                )}
                            </Badge>
                        ));
                    }
                    return (
                        <Badge key={key} variant="secondary" className="flex items-center space-x-1">
                            <span>{`${key}: ${val}`}</span>
                            {onRemoveFilter && (
                                <button
                                    type="button"
                                    className="ml-1 text-xs text-muted-foreground hover:text-foreground"
                                    onClick={() => onRemoveFilter(key as keyof FilterState)}
                                >
                                    ✕
                                </button>
                            )}
                        </Badge>
                    );
                })}

                {/* Clear All button */}
                <button type="button" onClick={onClearAllFilters} className="text-xs text-primary hover:underline">
                    Clear all
                </button>
            </div>
        );
    };

    return (
        <div className="border-b border-border bg-background p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm" onClick={onToggleFilters} iconName="Filter" iconPosition="left" className="lg:hidden">
                        Filters
                    </Button>

                    <div className="text-text-secondary text-sm">
                        <span className="text-text-primary font-medium">{resultsCount?.toLocaleString() ?? 0}</span> results
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={() => onViewModeChange('grid')} className={`rounded border p-2 ${viewMode === 'grid' ? 'bg-gray-200' : ''}`}>
                            <GridIcon size={18} />
                        </button>
                        <button onClick={() => onViewModeChange('list')} className={`rounded border p-2 ${viewMode === 'list' ? 'bg-gray-200' : ''}`}>
                            <ListIcon size={18} />
                        </button>
                    </div>
                </div>

                <Select value={sortBy} onValueChange={onSortChange}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                        {sortOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Active filters below toolbar */}
            {renderActiveFilters()}
        </div>
    );
};

export default FilterToolbar;
