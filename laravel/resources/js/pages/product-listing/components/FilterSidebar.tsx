import Icon from '@/components/AppIcon';
import { cn } from '@/shadcn/lib/utils';
import { Badge } from '@/shadcn/ui/badge';
import { Button } from '@/shadcn/ui/button';
import { Checkbox } from '@/shadcn/ui/checkbox';
import { Input } from '@/shadcn/ui/input';
import { FilterSidebarProps, FilterState } from '@/types/Sidebar';
import React, { useEffect, useState } from 'react';

function ApplyFiltersButton({ buttonName, func }: { buttonName: string; func: () => void }) {
    return (
        <Button variant={`${buttonName ? 'outline' : 'default'}`} onClick={func} className="w-full">
            Apply Filters {buttonName}
        </Button>
    );
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
    isOpen,
    onClose,
    filters,
    onFilterChange,
    onClearFilters,
    isMobile = false,
    sidebar,
    onFiltersApply,
}) => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        price: true,
        brand: true,
        rating: true,
        vendor: true,
        category: true,
        color: true,
        size: true,
    });

    // --- Local state for price inputs ---
    const [minPrice, setMinPrice] = useState<number | string>(Number(sidebar.price.min));
    const [maxPrice, setMaxPrice] = useState<number | string>(Number(sidebar.price.max));

    // Sync state with filters when filters change
    useEffect(() => {
        setMinPrice(filters?.price_range?.min || Number(sidebar.price.min));
        setMaxPrice(filters?.price_range?.max || Number(sidebar.price.max));
    }, [filters, sidebar.price.min, sidebar.price.max]);

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev?.[section],
        }));
    };

    const handlePriceChange = (type: 'min' | 'max', value: string) => {
        const numericValue = Number(value);
        if (type === 'min') {
            setMinPrice(numericValue);
        } else {
            setMaxPrice(numericValue);
        }
    };

    const applyPriceFilters = () => {
        onFilterChange('price_range', {
            min: minPrice,
            max: maxPrice,
        });
        onFiltersApply();
    };

    const handleCheckboxChange = (filterType: keyof FilterState, value: string | number, checked: boolean) => {
        const currentValues = filters?.[filterType] || [];
        const newValues = checked ? [...currentValues, value] : currentValues?.filter((v) => v !== value);

        onFilterChange(filterType, newValues);
    };

    const FilterSection: React.FC<{
        title: string;
        sectionKey: string;
        children: React.ReactNode;
    }> = ({ title, sectionKey, children }) => (
        <div className="mb-4 border-b border-border pb-4">
            <button onClick={() => toggleSection(sectionKey)} className="flex w-full items-center justify-between py-2 text-left">
                <h3 className="text-text-primary font-medium">{title}</h3>
                <Icon name={expandedSections?.[sectionKey] ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-text-secondary" />
            </button>
            {expandedSections?.[sectionKey] && <div className="mt-3 space-y-3">{children}</div>}
        </div>
    );

    // Sidebar UI
    const sidebarContent = (
        <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="text-text-primary text-lg font-semibold">Filters</h2>
                {isMobile && (
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <Icon name="X" size={20} />
                    </Button>
                )}
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {/* Price Range */}
                <FilterSection title="Price Range" sectionKey="price">
                    <div className="space-y-3">
                        <div className="flex flex-col items-center space-y-2">
                            <input
                                type="range"
                                min={Number(sidebar.price.min)}
                                max={Number(sidebar.price.max)}
                                step={1}
                                value={minPrice}
                                onChange={(e) => handlePriceChange('min', e.target.value)}
                                className="h-4 w-full rounded-lg bg-gray-200 accent-accent"
                            />
                            <input
                                type="range"
                                min={Number(sidebar.price.min)}
                                max={Number(sidebar.price.max)}
                                step={1}
                                value={maxPrice}
                                onChange={(e) => handlePriceChange('max', e.target.value)}
                                className="h-4 w-full rounded-lg bg-gray-200 accent-accent"
                            />

                            <div className="flex w-full justify-between gap-2 text-sm text-foreground">
                                <Input
                                    type="number"
                                    min={Number(sidebar.price.min)}
                                    max={Number(sidebar.price.max)}
                                    value={minPrice}
                                    onChange={(e) => handlePriceChange('min', e.target.value)}
                                />
                                <Input
                                    type="number"
                                    min={Number(sidebar.price.min)}
                                    max={Number(sidebar.price.max)}
                                    value={maxPrice}
                                    onChange={(e) => handlePriceChange('max', e.target.value)}
                                />
                            </div>
                            <ApplyFiltersButton buttonName="Price" func={applyPriceFilters} />
                        </div>
                    </div>
                </FilterSection>

                {/* Brand */}
                <FilterSection title="Brand" sectionKey="brand">
                    <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto">
                        {sidebar.brands?.map((brand) => (
                            <Checkbox
                                key={brand.id}
                                label={brand.name}
                                checked={filters?.brands?.includes(brand.slug) || false}
                                onChange={(e) => handleCheckboxChange('brands', brand.slug, e.target.checked)}
                                size="sm"
                            />
                        ))}
                    </div>
                    <ApplyFiltersButton buttonName="Brand" func={onFiltersApply} />
                </FilterSection>

                {/* Rating */}
                <FilterSection title="Customer Rating" sectionKey="rating">
                    <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <Checkbox
                                key={rating}
                                label={
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Icon
                                                    key={i}
                                                    name="Star"
                                                    size={16}
                                                    className={i < rating ? 'text-warning fill-current' : 'text-border'}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-text-secondary text-sm">& up</span>
                                    </div>
                                }
                                checked={filters?.ratings?.includes(rating) || false}
                                onChange={(e) => handleCheckboxChange('ratings', rating, e.target.checked)}
                                size="sm"
                            />
                        ))}
                    </div>
                    <ApplyFiltersButton buttonName="Rating" func={onFiltersApply} />
                </FilterSection>

                {/* Vendor */}
                <FilterSection title="Vendor" sectionKey="vendor">
                    <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto">
                        {sidebar.vendors?.map((vendor) => (
                            <Checkbox
                                key={vendor.id}
                                label={vendor.name || vendor.slug || ''}
                                checked={filters?.vendors?.includes(vendor.name || vendor.slug || '') || false}
                                onChange={(e) => handleCheckboxChange('vendors', vendor.name || vendor.slug || '', e.target.checked)}
                                size="sm"
                            />
                        ))}
                    </div>
                    <ApplyFiltersButton buttonName="Vendor" func={onFiltersApply} />
                </FilterSection>

                {/* Category */}
                <FilterSection title="Category" sectionKey="category">
                    <div className="grid grid-cols-2 gap-4">
                        {sidebar.categories?.map((category) => (
                            <Checkbox
                                key={category.id}
                                label={category.name}
                                checked={filters?.categories?.includes(category.slug) || false}
                                onChange={(e) => handleCheckboxChange('categories', category.slug, e.target.checked)}
                                size="sm"
                            />
                        ))}
                    </div>
                    <ApplyFiltersButton buttonName="Category" func={onFiltersApply} />
                </FilterSection>

                {/* Colors */}
                <FilterSection title="Colors" sectionKey="color">
                    <div className="flex flex-wrap gap-2 overflow-y-auto p-2">
                        {sidebar.colors?.map((color) => {
                            const selected = filters.colors?.includes(color.color_code);

                            return (
                                <label key={color.id} className="cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selected || false}
                                        onChange={(e) => handleCheckboxChange('colors', color.color_code, e.target.checked)}
                                        className="hidden"
                                    />

                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            'rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-all duration-200',
                                            selected && 'scale-[1.05] ring-2 ring-blue-500 ring-offset-1',
                                        )}
                                    >
                                        {color.slug}
                                    </Badge>
                                </label>
                            );
                        })}
                    </div>

                    <ApplyFiltersButton buttonName="Colors" func={onFiltersApply} />
                </FilterSection>

                {/* Sizes */}
                <FilterSection title="Sizes" sectionKey="size">
                    <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto">
                        {sidebar.sizes?.map((size) => (
                            <Checkbox
                                key={size.id}
                                label={size.size_code}
                                checked={filters?.sizes?.includes(size.size_code) || false}
                                onChange={(e) => handleCheckboxChange('sizes', size.size_code, e.target.checked)}
                                size="sm"
                            />
                        ))}
                    </div>
                    <ApplyFiltersButton buttonName="Sizes" func={onFiltersApply} />
                </FilterSection>
            </div>

            {/* Footer */}
            <div className="space-x-2 border-t border-border p-4">
                <Button variant="outline" onClick={onClearFilters}>
                    Clear All Filters
                </Button>
                <Button variant="default" onClick={onFiltersApply}>
                    Apply Filters
                </Button>
            </div>
        </div>
    );

    if (isMobile) {
        return (
            <>
                {isOpen && (
                    <div className="z-modal backdrop-blur-subtle fixed inset-0 bg-black/50 lg:hidden">
                        <div className="shadow-modal animate-slide-in-left fixed inset-y-0 left-0 w-full max-w-sm bg-background">
                            {sidebarContent}
                        </div>
                    </div>
                )}
            </>
        );
    }

    return <div className="hidden w-80 border-r border-border bg-background lg:block">{sidebarContent}</div>;
};

export default FilterSidebar;
