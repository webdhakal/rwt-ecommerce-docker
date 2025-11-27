import { useProducts } from '@/api/hooks/useProducts';
import { useSidebar } from '@/api/hooks/useSidebar';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import LoadingScreen from '@/components/LoadingScreen';
import GuestLayout from '@/layouts/guest-layout';
import { FilterState, SidebarData } from '@/types/Sidebar';
import { LayoutGrid, List } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CategoryBanner from './components/CategoryBanner';
import FilterSidebar from './components/FilterSidebar';
import FilterToolbar from './components/FilterToolbar';
import ProductGrid from './components/ProductGrid';
import SkeletonProductListingBrowse from './components/Skeleton';

// Create initial filter state as a constant to avoid circular dependency
const createInitialFilters = (): FilterState => ({
    brands: [],
    vendors: [],
    categories: [],
    ratings: [],
    colors: [],
    sizes: [],
});

const ProductListingCategoryBrowse = () => {
    const searchQuery: string = '';
    const categoryParam: string = '';

    // Use useMemo to create stable initial filters
    const initialFilters = useMemo(() => createInitialFilters(), []);

    // State management
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('relevance');
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [filtersTemp, setFiltersTemp] = useState<FilterState>(initialFilters);

    // API hooks
    const { data, isLoading } = useProducts(undefined, filters);
    const { data: sidebarData, isLoading: isSidebarLoading } = useSidebar();
    // Derived state
    const products = data?.payload?.data || [];
    const [sidebar, setSidebar] = useState<SidebarData>(sidebarData?.payload?.data as SidebarData);
    // Update temporary filters when data loads
    useEffect(() => {
        if (sidebarData?.payload?.data?.price) {
            setSidebar(sidebarData.payload.data);
        }
    }, [sidebarData]);

    // Memoize breadcrumbs to avoid unnecessary recalculations
    const customBreadcrumbs = useMemo(() => {
        const breadcrumbs: { label: string; path: string }[] = [
            { label: 'Home', path: '/homepage' },
            { label: 'Categories', path: route('product-listing') },
        ];

        if (categoryParam) {
            breadcrumbs.push({
                label: categoryParam,
                path: route('product-listing', { category: categoryParam }),
            });
        }

        if (searchQuery) {
            breadcrumbs.push({
                label: `Search: ${searchQuery}`,
                path: location?.pathname + location?.search,
            });
        }

        return breadcrumbs;
    }, [categoryParam, searchQuery]);

    // Optimized filter handlers with useCallback
    const handleClearFilter = useCallback(() => {
        setFilters(initialFilters);
        setFiltersTemp(initialFilters);
    }, [initialFilters]);

    const handleFilterChange = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
        setFiltersTemp((prev) => ({ ...prev, [key]: value }));
    }, []);

    const handleSortChange = useCallback((value: string) => {
        setFiltersTemp((prev) => ({ ...prev, sort_by: value }));
        setSortBy(value);
    }, []);

    const handleApplyFilters = useCallback(() => {
        setFilters(filtersTemp);
    }, [filtersTemp]);

    const handleRemoveFilter = useCallback(
        (key: keyof FilterState, item: string | number) => {
            const updatedFilters: FilterState = { ...filtersTemp };

            if (key === 'price_range') {
                delete updatedFilters.price_range;
                setFiltersTemp(updatedFilters);
                return;
            }

            const currFilterData = filtersTemp[key];

            if (!currFilterData) return;

            if (!Array.isArray(currFilterData)) {
                delete updatedFilters[key];
                setFiltersTemp(updatedFilters);
                return;
            }

            const updatedFilterData = currFilterData.filter((val) => val !== item);

            if (updatedFilterData.length === 0) {
                delete updatedFilters[key];
            } else {
                updatedFilters[key] = updatedFilterData as any;
            }

            setFiltersTemp(updatedFilters);
        },
        [filtersTemp],
    );

    const handleToggleMobileFilters = useCallback(() => {
        setShowMobileFilters((prev) => !prev);
    }, []);

    const handleCloseMobileFilters = useCallback(() => {
        setShowMobileFilters(false);
    }, []);

    // Early return for loading state
    if (isSidebarLoading) {
        return <LoadingScreen text="Loading..." className="min-h-screen" />;
    }

    return (
        <GuestLayout>
            <CategoryBanner category={categoryParam} searchQuery={searchQuery} />

            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <BreadcrumbNavigation customBreadcrumbs={customBreadcrumbs} />

                <div className="flex gap-6">
                    {/* Desktop Sidebar */}

                    {sidebar && (
                        <FilterSidebar
                            isOpen={true}
                            onClose={() => {}}
                            filters={filtersTemp}
                            onFilterChange={handleFilterChange}
                            onClearFilters={handleClearFilter}
                            isMobile={false}
                            sidebar={sidebar}
                            onFiltersApply={handleApplyFilters}
                        />
                    )}

                    {/* Mobile Sidebar */}

                    {sidebar && (
                        <FilterSidebar
                            isOpen={showMobileFilters}
                            onClose={handleCloseMobileFilters}
                            filters={filtersTemp}
                            onFilterChange={handleFilterChange}
                            onClearFilters={handleClearFilter}
                            isMobile={true}
                            sidebar={sidebar}
                            onFiltersApply={handleApplyFilters}
                        />
                    )}

                    {/* Main Content */}
                    <div className="flex flex-1 flex-col gap-4">
                        <FilterToolbar
                            activeFilters={filtersTemp}
                            sidebar={sidebar}
                            onRemoveFilter={handleRemoveFilter}
                            onClearAllFilters={handleClearFilter}
                            sortBy={sortBy}
                            onSortChange={handleSortChange}
                            resultsCount={products.length}
                            onToggleFilters={handleToggleMobileFilters}
                            showMobileFilters={showMobileFilters}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            icons={{ grid: LayoutGrid, list: List }}
                        />

                        <div className="p-4 lg:p-6">
                            {!isLoading ? (
                                <ProductGrid
                                    products={products}
                                    loading={isLoading}
                                    onLoadMore={() => console.log('loading')}
                                    hasMore={false}
                                    mode={viewMode}
                                />
                            ) : (
                                <SkeletonProductListingBrowse />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default ProductListingCategoryBrowse;
