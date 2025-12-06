import Icon from '@/components/AppIcon';
import { useEffect, useRef, useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);

    // Mock suggestions data
    const mockSuggestions = [
        { type: 'product', label: 'iPhone 15 Pro', category: 'Electronics' },
        { type: 'product', label: 'Samsung Galaxy S24', category: 'Electronics' },
        { type: 'product', label: 'MacBook Air M2', category: 'Computers' },
        { type: 'vendor', label: 'TechStore Pro', type: 'vendor' },
        { type: 'vendor', label: 'Electronics Hub', type: 'vendor' },
        { type: 'category', label: 'Smartphones', type: 'category' },
        { type: 'category', label: 'Laptops', type: 'category' },
    ];

    useEffect(() => {
        if (query?.length > 1) {
            const filtered = mockSuggestions?.filter((item) => item?.label?.toLowerCase()?.includes(query?.toLowerCase()))?.slice(0, 6);
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
        setSelectedIndex(-1);
    }, [query]);

    const handleInputChange = (e) => {
        setQuery(e?.target?.value);
    };

    const handleInputFocus = () => {
        setIsExpanded(true);
        if (query?.length > 1) {
            setShowSuggestions(true);
        }
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setIsExpanded(false);
            setShowSuggestions(false);
        }, 200);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions) return;

        switch (e?.key) {
            case 'ArrowDown':
                e?.preventDefault();
                setSelectedIndex((prev) => (prev < suggestions?.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e?.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;
            case 'Enter':
                e?.preventDefault();
                if (selectedIndex >= 0) {
                    handleSuggestionClick(suggestions?.[selectedIndex]);
                } else {
                    handleSearch();
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedIndex(-1);
                inputRef?.current?.blur();
                break;
        }
    };

    const handleSearch = () => {
        if (query?.trim()) {
            navigate(`/product-listing-category-browse?search=${encodeURIComponent(query?.trim())}`);
            setShowSuggestions(false);
            setIsExpanded(false);
            inputRef?.current?.blur();
            onSearch?.();
        }
    };

    const handleSuggestionClick = (suggestion) => {
        if (suggestion?.type === 'vendor') {
            navigate('/vendor-store-profile');
        } else if (suggestion?.type === 'category') {
            navigate(`/product-listing-category-browse?category=${encodeURIComponent(suggestion?.label)}`);
        } else {
            navigate(`/product-listing-category-browse?search=${encodeURIComponent(suggestion?.label)}`);
        }
        setQuery(suggestion?.label);
        setShowSuggestions(false);
        setIsExpanded(false);
        onSearch?.();
    };

    const getSuggestionIcon = (type) => {
        switch (type) {
            case 'vendor':
                return 'Store';
            case 'category':
                return 'Tag';
            default:
                return 'Package';
        }
    };

    return (
        <div className="relative w-full">
            <div className={`relative transition-all duration-200 ${isExpanded ? 'w-full' : 'w-full'}`}>
                <div className="relative">
                    <Icon
                        name="Search"
                        size={18}
                        className="text-text-secondary pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transform"
                    />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyDown}
                        placeholder="Search products, vendors, categories..."
                        className="bg-surface placeholder-text-secondary w-full rounded-lg border border-border py-2 pr-10 pl-10 text-sm transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-accent focus:outline-none"
                    />
                    {query && (
                        <button
                            onClick={() => {
                                setQuery('');
                                setSuggestions([]);
                                setShowSuggestions(false);
                                inputRef?.current?.focus();
                            }}
                            className="text-text-secondary absolute top-1/2 right-3 -translate-y-1/2 transform transition-colors duration-200 hover:text-primary"
                        >
                            <Icon name="X" size={16} />
                        </button>
                    )}
                </div>

                {/* Search Suggestions Dropdown */}
                {showSuggestions && suggestions?.length > 0 && (
                    <div className="shadow-modal z-dropdown animate-fade-in absolute top-full right-0 left-0 mt-1 rounded-lg border border-border bg-background">
                        <div className="py-2">
                            {suggestions?.map((suggestion, index) => (
                                <button
                                    key={`${suggestion?.type}-${suggestion?.label}`}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className={`flex w-full items-center space-x-3 px-4 py-2 text-left transition-colors duration-200 hover:bg-muted ${
                                        index === selectedIndex ? 'bg-muted' : ''
                                    }`}
                                >
                                    <Icon name={getSuggestionIcon(suggestion?.type)} size={16} className="text-text-secondary flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <div className="text-text-primary truncate text-sm font-medium">{suggestion?.label}</div>
                                        {suggestion?.category && <div className="text-text-secondary text-xs">in {suggestion?.category}</div>}
                                    </div>
                                    <div className="text-text-secondary text-xs capitalize">{suggestion?.type}</div>
                                </button>
                            ))}
                        </div>

                        {query?.trim() && (
                            <>
                                <div className="border-t border-border"></div>
                                <button
                                    onClick={handleSearch}
                                    className="flex w-full items-center space-x-3 px-4 py-2 text-left transition-colors duration-200 hover:bg-muted"
                                >
                                    <Icon name="Search" size={16} className="flex-shrink-0 text-accent" />
                                    <span className="text-sm font-medium text-accent">Search for "{query}"</span>
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
