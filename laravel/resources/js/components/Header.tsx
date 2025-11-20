import { useMenu } from '@/api/hooks/useMenu';
import { randomImage } from '@/libs/Helper';
import { Button } from '@/shadcn/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from '@/shadcn/ui/command';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shadcn/ui/dropdown-menu';
import { Menu as CategoryMenu } from '@/types/Menu';
import { Link, router } from '@inertiajs/react';
import { ChevronDown, Heart, MapPin, Menu, MoveUpRight, Search, ShoppingCart, Store, User, X } from 'lucide-react';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import NavigationSkeleton from './skeletons/NavigationSkeleton';

// Use forwardRef so GuestLayout can measure the <header>
const Header = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ ...props }, ref) => {
    // this is work in progress..
    function foobar() {
        router.visit('/product-listing', {
            data: { category: 'todays-deal' },
        });
    }

    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data, isLoading } = useMenu();
    const [categories, setCategories] = useState<CategoryMenu[]>(data?.payload?.data || []);

    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Mock data
    const trendingItems = [
        { id: 1, name: 'iPhone 15 Pro', type: 'Product' },
        { id: 2, name: 'Air Jordan 1', type: 'Product' },
        { id: 3, name: 'Samsung Galaxy Watch', type: 'Product' },
    ];

    useEffect(() => {
        if (!data) return;
        setCategories(data?.payload?.data || []);
    }, [data]);

    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                setIsScrolled(true);
                setOpen(false);
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    setIsVisible(false);
                    setOpen(false);
                } else {
                    setIsVisible(true);
                }
            } else {
                setIsScrolled(false);
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        // e.preventDefault();
        // // why this not stopping propagation
        e.stopPropagation();
        const container = e.currentTarget;
        container.scrollLeft += e.deltaY;
    };

    return (
        <header
            ref={ref} // attach forwarded ref here
            {...props}
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isScrolled ? 'bg-background/90 shadow-lg' : 'bg-background'
                }`}
        >
            {/* Top Bar */}
            <div className="hidden bg-background border-b-1 md:block">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-2 text-sm">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                <span className="hidden sm:inline">Free shipping on orders over $50</span>
                                <span className="sm:hidden">Free shipping $50+</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="transition-colors hover:text-blue-200">Sell on MarketPlace</button>
                            <button className="transition-colors hover:text-blue-200">Help & Support</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="border-b border-secondary">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo */}
                        <Link href="/" as="div" className="flex cursor-pointer items-center">
                            <div className="flex items-center space-x-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                                    <Store className="h-6 w-6 text-primary" />
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                                        RWT
                                    </h1>
                                    <p className="text-xs text-gray-500">Multi-Vendor Store</p>
                                </div>
                            </div>
                        </Link>

                        <div className="mx-8 hidden max-w-2xl flex-1 lg:block">
                            <div className="relative flex items-center">
                                <Command className="flex-1 rounded-full border border-gray-300 shadow-md">
                                    <CommandInput
                                        placeholder="Search for products, brands, vendors..."
                                        value={query}
                                        onValueChange={setQuery}
                                        className="flex-1 rounded-full px-12 py-5 text-sm focus:ring-0 focus:outline-none lg:text-base"
                                        onFocus={() => setOpen(true)}
                                        onBlur={(e) => {
                                            if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
                                                setOpen(false);
                                            }
                                        }}
                                    />

                                    {open && (
                                        <CommandList
                                            ref={dropdownRef}
                                            className="absolute top-12 left-0 z-50 w-full space-y-4 rounded-xl border border-gray-200 bg-background p-4 shadow-lg"
                                        >
                                            <CommandGroup heading="Trending Items">
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {trendingItems.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className="flex cursor-pointer items-center space-x-1 rounded-md border border-gray-200 bg-background px-3 py-1 transition hover:bg-secondary"
                                                        >
                                                            <MoveUpRight size={14} className="text-gray-500" />
                                                            <span className="text-sm font-medium">{item.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CommandGroup>

                                            <CommandGroup heading="Categories">
                                                <div className="scrollbar-hide mt-2 flex space-x-3 overflow-x-auto pb-1" onWheel={handleWheel}>
                                                    {categories.map((cat, index) => (
                                                        <div
                                                            key={cat.id}
                                                            className="flex flex-shrink-0 cursor-pointer items-center gap-2 rounded-md bg-secondary px-4 py-2 transition hover:bg-secondary/50"
                                                        >
                                                            <img
                                                                className="flex h-16 w-24 items-center justify-center rounded-lg bg-background text-xs text-gray-500"
                                                                src={randomImage(index)}
                                                            />

                                                            <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CommandGroup>

                                            {!categories && !trendingItems && <CommandEmpty>No results found.</CommandEmpty>}
                                        </CommandList>
                                    )}
                                </Command>

                                <div className="absolute top-1/2 right-0 flex-shrink-0 -translate-y-1/2">
                                    <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-5 text-base text-white transition-all duration-200 hover:from-blue-700 hover:to-purple-700 lg:text-lg">
                                        Search
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* <SearchModal /> */}

                        {/* Right Side Icons */}
                        <div className="flex items-center space-x-4">
                            {/* Wishlist */}
                            <Button
                                href={route('wishlist')}
                                className="group relative bg-background p-2 text-gray-600 transition hover:bg-secondary hover:text-blue-600"
                            >
                                <Heart className="h-6 w-6" />
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                    3
                                </span>
                                <div className="absolute bottom-0 left-1/2 mt-2 -translate-x-1/2 translate-y-full transform rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                    Wishlist
                                </div>
                            </Button>

                            {/* Cart */}
                            <Button
                                href={route('shopping-cart')}
                                className="group relative bg-background p-2 text-gray-600 transition-colors hover:bg-secondary hover:text-blue-600"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                                    2
                                </span>
                                <div className="absolute bottom-0 left-1/2 mt-2 -translate-x-1/2 translate-y-full transform rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                    Cart
                                </div>
                            </Button>

                            {/* User Account */}
                            <Button className="group relative bg-background p-2 text-gray-600 transition-colors hover:bg-secondary hover:text-blue-600">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="group relative bg-background p-2 text-gray-600 transition-colors hover:bg-secondary hover:text-blue-600">
                                            <User className="h-6 w-6" />
                                            <div className="absolute bottom-0 left-1/2 mt-2 -translate-x-1/2 translate-y-full transform rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                                Account
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>My Orders</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>My Wishlist</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>Logout</DropdownMenuLabel>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </Button>

                            {/* Mobile Menu Button */}
                            <button
                                className="p-2 text-gray-600 transition-colors hover:text-blue-600 lg:hidden"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            {!isLoading ? (
                <div className="hidden border-b border-secondary lg:block">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center justify-between py-3">
                            <div className="flex items-center space-x-8">
                                <div className="group relative">
                                    {categories && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="flex items-center space-x-1 font-medium text-primary transition-colors hover:text-blue-600">
                                                    <span>All Categories</span>
                                                    <ChevronDown className="h-4 w-4" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-48">
                                                {categories.map((category) => (
                                                    <DropdownMenuItem key={category.id} onClick={() => console.log('Selected:', category.name)}>
                                                        {category.name}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </div>
                                {categories &&
                                    categories.map((category) => (
                                        <button key={category.id} className="font-medium text-primary transition-colors hover:text-blue-600">
                                            {category.name}
                                        </button>
                                    ))}
                            </div>
                            <div className="flex items-center space-x-6">
                                <button className="font-semibold text-primary transition-colors hover:text-primary">Today's Deals</button>
                                {/* <button className="font-semibold text-green-600 transition-colors hover:text-green-700">Best Vendors</button> */}
                                <Link as="button" href={route('vendor-store')} className="font-semibold text-green-600 transition-colors hover:text-green-700">Best Vendors</Link>
                            </div>
                        </nav>
                    </div>
                </div>
            ) : (
                <NavigationSkeleton />
            )}
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="border-t border-gray-200 shadow-lg lg:hidden">
                    <div className="space-y-6 px-4 py-6">
                        {/* Mobile Search */}
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 leading-5 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Search products..."
                            />
                        </div>

                        {/* Mobile Categories */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-900">Categories</h3>
                            {categories.map((category) => (
                                <button key={category.id} className="block w-full py-2 text-left text-gray-700 transition-colors hover:text-blue-600">
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Links */}
                        <div className="space-y-4 border-t border-gray-200 pt-4">
                            <button className="block w-full text-left font-semibold text-orange-600">Today's Deals</button>
                            <button className="block w-full text-left font-semibold text-green-600">Best Vendors</button>
                            <button className="block w-full text-left font-semibold text-blue-600">Sell on MarketPlace</button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
});

Header.displayName = 'Header'; // required when using forwardRef
export default Header;
