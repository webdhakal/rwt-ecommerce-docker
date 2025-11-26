import { useMenu } from '@/api/hooks/useMenu';
import { randomImage } from '@/libs/Helper';
import { Button } from '@/shadcn/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from '@/shadcn/ui/command';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shadcn/ui/dropdown-menu';
import { Menu as CategoryMenu } from '@/types/Menu';
import { usePage, Link, router } from '@inertiajs/react';
import { ChevronDown, Heart, MapPin, Menu, MoveUpRight, Search, ShoppingCart, Store, User, X } from 'lucide-react';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import NavigationSkeleton from './skeletons/NavigationSkeleton';
import ToggleThemeButton from './Button/ToggleThemeButton';
import { getUsers } from '@/api/endpoints/users.api';
import api from '@/api/clients/axiosClient'
import { useLogout } from '@/api/hooks/useAuth';

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
    const [isAtTop, setIsAtTop] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data, isLoading } = useMenu();
    const [categories, setCategories] = useState<CategoryMenu[]>(data?.payload?.data || []);

    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const auth = JSON.parse(localStorage.getItem('auth') || 'null');
    const isUser = !!auth;

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

            // Check if we're at the top (within 50px)
            setIsAtTop(currentScrollY < 50);

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

    const logoutMutation = useLogout({
        onSuccess: (response) => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('auth');
        },
        onError: (err: any) => {
            toast({
                title: 'Logout Failed',
                description: err.response?.data?.message || err.message,
            });
        },
    });


    const handleLogout = async (e) => {
        logoutMutation.mutate();
    }
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const container = e.currentTarget;
        container.scrollLeft += e.deltaY;
    };

    return (
        <header
            ref={ref}
            {...props}
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-700 ease-out ${isVisible ? 'translate-y-0' : '-translate-y-full'
                } ${isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-lg' : 'bg-background'
                }`}
        >
            {/* Top Bar */}
            <div className={`hidden border-b border-border md:block transition-all duration-700 ease-out ${isAtTop ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-2 text-sm">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-muted-foreground">
                                <MapPin className="mr-1 h-3 w-3" />
                                <span className="hidden sm:inline">Free shipping on orders over $50</span>
                                <span className="sm:hidden">Free shipping $50+</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 text-muted-foreground">
                            <button className="transition-colors hover:text-primary">Sell on MarketPlace</button>
                            <button className="transition-colors hover:text-primary">Help & Support</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="border-b border-border">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo */}
                        <Link href="/" as="div" className="flex cursor-pointer items-center">
                            <div className="flex items-center space-x-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                                    <Store className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-bold text-transparent">
                                        RWT
                                    </h1>
                                    <p className="text-xs text-muted-foreground">Multi-Vendor Store</p>
                                </div>
                            </div>
                        </Link>

                        <div className="mx-8 hidden max-w-2xl flex-1 lg:block">
                            <div className="relative flex items-center">
                                <Command className="flex-1 rounded-full border border-border bg-background shadow-md">
                                    <CommandInput
                                        placeholder="Search for products, brands, vendors..."
                                        value={query}
                                        onValueChange={(value) => {
                                            setQuery(value);
                                            setOpen(value.length > 0);
                                        }}
                                        className="flex-1 rounded-full px-12 py-5 text-sm focus:ring-0 focus:outline-none lg:text-base"
                                        onBlur={(e) => {
                                            if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
                                                setOpen(false);
                                            }
                                        }}
                                    />

                                    {open && query.length > 0 && (
                                        <CommandList
                                            ref={dropdownRef}
                                            className="absolute top-12 left-0 z-50 w-full space-y-4 rounded-xl border border-border bg-popover p-4 shadow-lg"
                                        >
                                            <CommandGroup heading="Trending Items">
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {trendingItems.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className="flex cursor-pointer items-center space-x-1 rounded-md border border-border bg-background px-3 py-1 transition hover:bg-secondary"
                                                        >
                                                            <MoveUpRight size={14} className="text-muted-foreground" />
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
                                                            className="flex flex-shrink-0 cursor-pointer items-center gap-2 rounded-md bg-secondary px-4 py-2 transition hover:bg-secondary/70"
                                                        >
                                                            <img
                                                                className="flex h-16 w-24 items-center justify-center rounded-lg bg-card text-xs text-muted-foreground"
                                                                src={randomImage(index)}
                                                                alt={cat.name}
                                                            />
                                                            <span className="text-sm font-medium text-foreground">{cat.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CommandGroup>

                                            {!categories && !trendingItems && <CommandEmpty>No results found.</CommandEmpty>}
                                        </CommandList>
                                    )}
                                </Command>

                                <div className="absolute top-1/2 right-0 flex-shrink-0 -translate-y-1/2">
                                    <Button className="rounded-full bg-gradient-to-r from-primary to-accent px-8 py-5 text-base text-primary-foreground transition-all duration-200 hover:opacity-90 lg:text-lg">
                                        Search
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Icons */}
                        <div className="flex items-center space-x-4">
                            {/* Wishlist, Cart, User - Hidden on mobile */}
                            <div className="space-x-4 flex items-center invisible lg:visible">
                                <Button
                                    href={route('wishlist')}
                                    className="group relative bg-background p-2 text-muted-foreground transition hover:bg-secondary hover:text-primary"
                                >
                                    <Heart className="h-6 w-6" />
                                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                                        3
                                    </span>
                                    <div className="absolute bottom-0 left-1/2 mt-2 -translate-x-1/2 translate-y-full transform rounded bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 transition-opacity group-hover:opacity-100 border border-border">
                                        Wishlist
                                    </div>
                                </Button>

                                {/* Cart */}
                                <Button
                                    href={route('shopping-cart')}
                                    className="group relative bg-background p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                                >
                                    <ShoppingCart className="h-6 w-6" />
                                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                        2
                                    </span>
                                    <div className="absolute bottom-0 left-1/2 mt-2 -translate-x-1/2 translate-y-full transform rounded bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 transition-opacity group-hover:opacity-100 border border-border">
                                        Cart
                                    </div>
                                </Button>

                                {/* User Account */}
                                {isUser ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className="group relative bg-background p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary">
                                                <User className="h-6 w-6" />
                                                <div className="absolute bottom-0 left-1/2 mt-2 -translate-x-1/2 translate-y-full transform rounded bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 transition-opacity group-hover:opacity-100 border border-border">
                                                    Account
                                                </div>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuItem asChild>
                                                <Link href={route('dashboard', { tab: 'profile' })}>My Account</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link href={route('dashboard', { tab: 'orders' })}>My Orders</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link href={route('dashboard', { tab: 'wishlist' })}>My Wishlist</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Button className="bg-black w-full text-start" onClick={handleLogout}>
                                                    Logout
                                                </Button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <Link href={route('login')}>
                                        <Button className="rounded-full bg-gradient-to-r from-primary to-accent px-8 py-5 text-base text-primary-foreground transition-all duration-200 hover:opacity-90 lg:text-lg">
                                            Login
                                        </Button>
                                    </Link>
                                )}

                                <ToggleThemeButton />
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="p-2 text-muted-foreground transition-colors hover:text-primary lg:hidden"
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
                <div className={`hidden border-b border-border lg:block transition-all duration-700 ease-out ${isAtTop ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center justify-between py-3">
                            <div className="flex items-center space-x-8">
                                <div className="group relative">
                                    {categories && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="flex items-center space-x-1 font-medium text-foreground transition-colors hover:text-primary">
                                                    <span>All Categories</span>
                                                    <ChevronDown className="h-4 w-4" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-48">
                                                {categories.map((category) => (
                                                    <DropdownMenuItem key={category.id} onClick={() => console.log('Selected:', category.name)}>
                                                        <Link href={route('product-listing', { category: category.slug })}>{category.name}</Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </div>
                                {categories &&
                                    categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={route('product-listing', { category: category.slug })}
                                            className="font-medium text-foreground transition-colors hover:text-primary"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                            </div>
                            <div className="flex items-center space-x-6">
                                <button className="font-semibold text-primary transition-colors hover:text-primary/80">Today's Deals</button>
                                <Link as="button" href={route('vendor-store')} className="font-semibold text-accent transition-colors hover:text-accent/80">Best Vendors</Link>
                            </div>
                        </nav>
                    </div>
                </div>
            ) : (
                <NavigationSkeleton />
            )}

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="border-t border-border shadow-lg lg:hidden bg-background">
                    <div className="space-y-6 px-4 py-6">
                        {/* Mobile Search */}
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <input
                                type="text"
                                className="block w-full rounded-lg border border-border bg-background py-3 pr-4 pl-10 leading-5 placeholder-muted-foreground text-foreground focus:border-primary focus:ring-2 focus:ring-ring focus:outline-none"
                                placeholder="Search products..."
                            />
                        </div>

                        {/* Mobile Categories */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-foreground">Categories</h3>
                            {categories.map((category) => (
                                <button key={category.id} className="block w-full py-2 text-left text-muted-foreground transition-colors hover:text-primary">
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Links */}
                        <div className="space-y-4 border-t border-border pt-4">
                            <button className="block w-full text-left font-semibold text-primary">Today's Deals</button>
                            <button className="block w-full text-left font-semibold text-accent">Best Vendors</button>
                            <button className="block w-full text-left font-semibold text-primary">Sell on MarketPlace</button>
                        </div>

                        {/* Mobile Icons */}
                        <div className="flex items-center space-x-4 justify-end">
                            {/* Wishlist */}
                            <Button
                                href={route('wishlist')}
                                className="group relative bg-background p-2 text-muted-foreground transition hover:bg-secondary hover:text-primary"
                            >
                                <Heart className="h-6 w-6" />
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                                    3
                                </span>
                            </Button>

                            {/* Cart */}
                            <Button
                                href={route('shopping-cart')}
                                className="group relative bg-background p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                    2
                                </span>
                            </Button>

                            {/* User Account */}
                            {isUser ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="group relative bg-background p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary">
                                            <User className="h-6 w-6" />
                                            <div className="absolute bottom-0 left-1/2 mt-2 -translate-x-1/2 translate-y-full transform rounded bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 transition-opacity group-hover:opacity-100 border border-border">
                                                Account
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuItem asChild>
                                            <Link href={route('dashboard', { tab: 'profile' })}>My Account</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href={route('dashboard', { tab: 'orders' })}>My Orders</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href={route('dashboard', { tab: 'wishlist' })}>My Wishlist</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Button className="bg-black w-full text-start" onClick={handleLogout}>
                                                Logout
                                            </Button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link href={route('login')}>
                                    <Button className="rounded-full bg-gradient-to-r from-primary to-accent px-8 py-5 text-base text-primary-foreground transition-all duration-200 hover:opacity-90 lg:text-lg">
                                        Login
                                    </Button>
                                </Link>
                            )}

                            <ToggleThemeButton />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
});

Header.displayName = 'Header';
export default Header;