import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Button from '@/components/Button';
import Header from '@/components/Header';
import { Input } from '@/shadcn/ui/input';
import ProductListItem from './components/ProductListItem';
import { Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { useCategories } from '@/api/hooks/useCategories';

const WishlistCenter = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('dateAdded');
    const [filterCategory, setFilterCategory] = useState('all');
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

    // Categories
    const { data: categoriesList = [], isLoading } = useCategories(
        { params: { limit: 6 } }, // 👈 pass params
        { refetchOnMount: true },
    );
    const categories = categoriesList?.payload?.data;
    console.log(categories)
    // Mock wishlist products data for ecommerce
    const [wishlistProducts, setWishlistProducts] = useState([
        {
            id: 1,
            name: "Premium Wireless Bluetooth Headphones with Noise Cancellation",
            brand: "AudioTech Pro",
            description: "Experience crystal-clear audio with advanced noise cancellation technology. Perfect for work, travel, and leisure.",
            image: "https://images.unsplash.com/photo-1713801129175-8e60c67e0412",
            imageAlt: "Black premium wireless headphones with soft ear cushions and sleek design on white background",
            category: "Electronics",
            price: 299.99,
            salePrice: 249.99,
            originalPrice: 299.99,
            installmentPrice: 41.66,
            rating: 4.8,
            reviewCount: 1247,
            inStock: true,
            isOnSale: true,
            isNewArrival: false,
            isLimitedStock: false,
            freeShipping: true,
            dateAdded: "2024-10-20T10:30:00Z",
            availableColors: [
                { name: "Midnight Black", hex: "#000000" },
                { name: "Silver", hex: "#C0C0C0" },
                { name: "Rose Gold", hex: "#E8B4B8" }]

        },
        {
            id: 2,
            name: "Organic Cotton Blend Comfort Fit T-Shirt",
            brand: "EcoWear",
            description: "Soft, breathable, and sustainably made. This versatile t-shirt is perfect for everyday wear with superior comfort.",
            image: "https://images.unsplash.com/photo-1644096967763-3ade4740f11b",
            imageAlt: "Navy blue organic cotton t-shirt laid flat showing natural fabric texture and comfortable fit",
            category: "Clothing",
            price: 24.99,
            salePrice: null,
            originalPrice: null,
            installmentPrice: null,
            rating: 4.6,
            reviewCount: 892,
            inStock: true,
            isOnSale: false,
            isNewArrival: true,
            isLimitedStock: false,
            freeShipping: false,
            dateAdded: "2024-10-18T14:15:00Z",
            availableSizes: ["XS", "S", "M", "L", "XL", "XXL"],
            availableColors: [
                { name: "Navy Blue", hex: "#000080" },
                { name: "Forest Green", hex: "#228B22" },
                { name: "Charcoal Gray", hex: "#36454F" },
                { name: "White", hex: "#FFFFFF" },
                { name: "Black", hex: "#000000" }]

        },
        {
            id: 3,
            name: "Professional Chef's Kitchen Knife Set with Wooden Block",
            brand: "CulinaryMaster",
            description: "High-carbon stainless steel blades with ergonomic handles. Includes 8 essential knives and premium storage block.",
            image: "https://images.unsplash.com/photo-1700515268359-09d3dbbe2ef3",
            imageAlt: "Professional kitchen knife set with sharp stainless steel blades displayed in elegant wooden block holder",
            category: "Home & Kitchen",
            price: 199.99,
            salePrice: 149.99,
            originalPrice: 199.99,
            installmentPrice: 25.00,
            rating: 4.9,
            reviewCount: 567,
            inStock: true,
            isOnSale: true,
            isNewArrival: false,
            isLimitedStock: true,
            freeShipping: true,
            dateAdded: "2024-10-15T09:45:00Z"
        },
        {
            id: 4,
            name: "Ultra-Lightweight Running Shoes with Advanced Cushioning",
            brand: "RunElite",
            description: "Engineered for performance with responsive foam and breathable mesh. Designed for long-distance comfort and speed.",
            image: "https://images.unsplash.com/photo-1705270701543-16469e92c36a",
            imageAlt: "Modern running shoes in bright colors with mesh upper and cushioned sole, photographed on athletic surface",
            category: "Sports & Outdoors",
            price: 159.99,
            salePrice: null,
            originalPrice: null,
            installmentPrice: 26.67,
            rating: 4.7,
            reviewCount: 1034,
            inStock: false,
            isOnSale: false,
            isNewArrival: true,
            isLimitedStock: false,
            freeShipping: true,
            dateAdded: "2024-10-12T16:20:00Z",
            availableSizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
            availableColors: [
                { name: "Electric Blue", hex: "#0080FF" },
                { name: "Neon Green", hex: "#39FF14" },
                { name: "Sunset Orange", hex: "#FF4500" }]

        },
        {
            id: 5,
            name: "Smart Home Security Camera with Night Vision",
            brand: "SecureView",
            description: "1080p HD monitoring with motion detection, two-way audio, and smartphone app control. Weather-resistant design.",
            image: "https://images.unsplash.com/photo-1666613789626-e8b9352639fe",
            imageAlt: "White smart security camera with modern dome design mounted on wall, showing LED indicators and lens",
            category: "Home Security",
            price: 89.99,
            salePrice: 69.99,
            originalPrice: 89.99,
            installmentPrice: null,
            rating: 4.5,
            reviewCount: 743,
            inStock: true,
            isOnSale: true,
            isNewArrival: false,
            isLimitedStock: false,
            freeShipping: false,
            dateAdded: "2024-10-08T11:10:00Z"
        },
        {
            id: 6,
            name: "Artisan Hand-Crafted Leather Wallet with RFID Protection",
            brand: "LeatherCraft Co.",
            description: "Premium full-grain leather with RFID blocking technology. Handcrafted with attention to detail and built to last.",
            image: "https://images.unsplash.com/photo-1619169427949-dee9aeb6d94b",
            imageAlt: "Brown leather wallet showing hand-stitched details and multiple card compartments, crafted from premium materials",
            category: "Accessories",
            price: 79.99,
            salePrice: null,
            originalPrice: null,
            installmentPrice: null,
            rating: 4.8,
            reviewCount: 456,
            inStock: true,
            isOnSale: false,
            isNewArrival: false,
            isLimitedStock: true,
            freeShipping: false,
            dateAdded: "2024-10-05T13:25:00Z",
            availableColors: [
                { name: "Classic Brown", hex: "#8B4513" },
                { name: "Black", hex: "#000000" },
                { name: "Tan", hex: "#D2B48C" }]

        }]  
    );

    const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories();
    // const categories = [
    //     { value: 'all', label: 'All Categories', count: wishlistProducts?.length },
    //     { value: 'electronics', label: 'Electronics', count: wishlistProducts?.filter((p) => p?.category?.toLowerCase()?.includes('electronic'))?.length },
    //     { value: 'clothing', label: 'Clothing', count: wishlistProducts?.filter((p) => p?.category?.toLowerCase()?.includes('clothing'))?.length },
    //     { value: 'home', label: 'Home & Kitchen', count: wishlistProducts?.filter((p) => p?.category?.toLowerCase()?.includes('home'))?.length },
    //     { value: 'sports', label: 'Sports & Outdoors', count: wishlistProducts?.filter((p) => p?.category?.toLowerCase()?.includes('sports'))?.length },
    //     { value: 'accessories', label: 'Accessories', count: wishlistProducts?.filter((p) => p?.category?.toLowerCase()?.includes('accessories'))?.length }];


    const sortOptions = [
        { value: 'dateAdded', label: 'Date Added (Newest)' },
        { value: 'dateAddedOld', label: 'Date Added (Oldest)' },
        { value: 'priceLow', label: 'Price (Low to High)' },
        { value: 'priceHigh', label: 'Price (High to Low)' },
        { value: 'rating', label: 'Rating (Highest)' },
        { value: 'name', label: 'Name (A-Z)' }];


    // Filter and sort functions
    const getFilteredAndSortedProducts = () => {
        let filtered = [...wishlistProducts];

        // Apply search filter
        if (searchQuery) {
            filtered = filtered?.filter((product) =>
                product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                product?.brand?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                product?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                product?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
            );
        }

        // Apply category filter
        if (filterCategory !== 'all') {
            filtered = filtered?.filter((product) =>
                product?.category?.toLowerCase()?.includes(filterCategory?.toLowerCase())
            );
        }

        // Apply sorting
        filtered?.sort((a, b) => {
            switch (sortBy) {
                case 'dateAdded':
                    return new Date(b?.dateAdded) - new Date(a?.dateAdded);
                case 'dateAddedOld':
                    return new Date(a?.dateAdded) - new Date(b?.dateAdded);
                case 'priceLow':
                    return (a?.salePrice || a?.price) - (b?.salePrice || b?.price);
                case 'priceHigh':
                    return (b?.salePrice || b?.price) - (a?.salePrice || a?.price);
                case 'rating':
                    return (b?.rating || 0) - (a?.rating || 0);
                case 'name':
                    return a?.name?.localeCompare(b?.name);
                default:
                    return 0;
            }
        });

        return filtered;
    };

    // Event handlers
    const handleRemoveFromWishlist = (productId) => {
        setWishlistProducts((prev) => prev?.filter((product) => product?.id !== productId));
    };

    const handleAddToCart = async (product) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Added to cart:', product);
        // You could show a toast notification here
    };

    const handleShareProduct = (product) => {
        if (navigator?.share) {
            navigator?.share({
                title: product?.name,
                text: product?.description,
                url: `${window?.location?.origin}/product/${product?.id}`
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const url = `${window?.location?.origin}/product/${product?.id}`;
            navigator?.clipboard?.writeText(url);
            console.log('Product URL copied to clipboard:', url);
        }
    };

    const handleClearWishlist = () => {
        if (window?.confirm('Are you sure you want to clear your entire wishlist?')) {
            setWishlistProducts([]);
        }
    };

    const handleMoveAllToCart = async () => {
        const inStockProducts = wishlistProducts?.filter((p) => p?.inStock);
        if (inStockProducts?.length === 0) return;

        // Simulate adding all to cart
        for (const product of inStockProducts) {
            await handleAddToCart(product);
        }
        console.log(`Added ${inStockProducts?.length} items to cart`);
    };

    const filteredProducts = getFilteredAndSortedProducts();

    return (
        <GuestLayout>
            <div className="min-h-screen bg-background">
                <Header />
                <main className="pt-16">
                    {/* Hero Section */}
                    <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <div className="flex items-center justify-center space-x-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                                        <Icon name="Heart" size={24} color="white" strokeWidth={2.5} />
                                    </div>
                                    <h1 className="text-4xl lg:text-5xl font-bold text-text-primary">
                                        My Wishlist
                                    </h1>
                                </div>
                                <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                                    Your carefully curated collection of favorite products. Save items you love and shop them whenever you're ready.
                                </p>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                                <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-border">
                                    <div className="text-2xl font-bold text-primary mb-1">{wishlistProducts?.length}</div>
                                    <div className="text-sm text-muted-foreground">Total Items</div>
                                </div>
                                <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-border">
                                    <div className="text-2xl font-bold text-accent mb-1">{wishlistProducts?.filter((p) => p?.inStock)?.length}</div>
                                    <div className="text-sm text-muted-foreground">In Stock</div>
                                </div>
                                <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-border">
                                    <div className="text-2xl font-bold text-secondary mb-1">{wishlistProducts?.filter((p) => p?.isOnSale)?.length}</div>
                                    <div className="text-sm text-muted-foreground">On Sale</div>
                                </div>
                                <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-border">
                                    <div className="text-2xl font-bold text-warning mb-1">
                                        ${wishlistProducts?.reduce((sum, p) => sum + (p?.salePrice || p?.price), 0)?.toFixed(2)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Total Value</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Main Content */}
                    <section className="py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {/* Controls Bar */}
                            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                                {/* Search */}
                                <div className="flex-1">
                                    <Input
                                        type="search"
                                        placeholder="Search your wishlist..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e?.target?.value)}
                                        className="w-full" />

                                </div>

                                {/* Filters and Controls */}
                                <div className="flex flex-col sm:flex-row gap-4 lg:gap-2">
                                    {/* Category Filter */}
                                    <select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e?.target?.value)}
                                        className="px-4 py-2 border border-border rounded-lg bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent">

                                        {categories?.map((category) =>
                                            <option key={category?.id} value={category?.id}>
                                                {category?.name} ({category?.count})
                                            </option>
                                        )}
                                    </select>

                                    {/* Sort By */}
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e?.target?.value)}
                                        className="px-4 py-2 border border-border rounded-lg bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent">

                                        {sortOptions?.map((option) =>
                                            <option key={option?.value} value={option?.value}>
                                                {option?.label}
                                            </option>
                                        )}
                                    </select>

                                    {/* Bulk Actions */}
                                    <div className="flex gap-2">
                                        {wishlistProducts?.filter((p) => p?.inStock)?.length > 0 &&
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={handleMoveAllToCart}
                                                iconName="ShoppingCart"
                                                iconPosition="left">

                                                Add All to Cart
                                            </Button>
                                        }

                                        {wishlistProducts?.length > 0 &&
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleClearWishlist}
                                                iconName="Trash2"
                                                iconPosition="left">

                                                Clear All
                                            </Button>
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Results Info */}
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-muted-foreground">
                                    {searchQuery || filterCategory !== 'all' ?
                                        <>Showing {filteredProducts?.length} of {wishlistProducts?.length} items</> :

                                        <>{wishlistProducts?.length} items in your wishlist</>
                                    }
                                </p>

                                {/* View Mode Toggle */}
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-muted-foreground">View:</span>
                                    <div className="flex border border-border rounded-lg">
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-text-primary'} transition-colors duration-200`}
                                            title="List view">

                                            <Icon name="List" size={16} />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-text-primary'} transition-colors duration-200`}
                                            title="Grid view">

                                            <Icon name="Grid3X3" size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product List */}
                            <div className="min-h-96">
                                {filteredProducts?.length > 0 ?
                                    <div className={viewMode === 'grid' ?
                                        "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"
                                    }>
                                        {filteredProducts?.map((product) =>
                                            <ProductListItem
                                                key={product?.id}
                                                product={product}
                                                onRemoveFromWishlist={handleRemoveFromWishlist}
                                                onAddToCart={handleAddToCart}
                                                onShareProduct={handleShareProduct} />

                                        )}
                                    </div> :

                                    <div className="text-center py-16">
                                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Icon name="Heart" size={24} className="text-muted-foreground" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-text-primary mb-2">
                                            {wishlistProducts?.length === 0 ? 'Your wishlist is empty' : 'No items found'}
                                        </h3>
                                        <p className="text-muted-foreground mb-6">
                                            {wishlistProducts?.length === 0 ?
                                                'Start adding products you love to see them here.' :
                                                `No results for "${searchQuery}". Try adjusting your search or filter.`
                                            }
                                        </p>
                                        <Button variant="default" iconName="Plus" iconPosition="left">
                                            <Link href="/">Continue Shopping</Link>
                                        </Button>
                                    </div>
                                }
                            </div>
                        </div>
                    </section>

                    {/* Recommended Products Section */}
                    {wishlistProducts?.length > 0 &&
                        <section className="py-16 bg-muted/30">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-text-primary mb-4">You Might Also Like</h2>
                                    <p className="text-lg text-text-secondary">
                                        Discover more products based on your wishlist preferences
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <Link
                                        to="/categories/electronics"
                                        className="group p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-200">

                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-200">
                                            <Icon name="Laptop" size={24} className="text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-text-primary mb-2">Electronics</h3>
                                        <p className="text-sm text-muted-foreground">Latest gadgets and tech</p>
                                    </Link>

                                    <Link
                                        to="/categories/clothing"
                                        className="group p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-200">

                                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-200">
                                            <Icon name="Shirt" size={24} className="text-accent" />
                                        </div>
                                        <h3 className="font-semibold text-text-primary mb-2">Fashion</h3>
                                        <p className="text-sm text-muted-foreground">Trending styles and apparel</p>
                                    </Link>

                                    <Link
                                        to="/categories/home"
                                        className="group p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-200">

                                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors duration-200">
                                            <Icon name="Home" size={24} className="text-secondary" />
                                        </div>
                                        <h3 className="font-semibold text-text-primary mb-2">Home & Kitchen</h3>
                                        <p className="text-sm text-muted-foreground">Transform your living space</p>
                                    </Link>

                                    <Link
                                        to="/deals"
                                        className="group p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-200">

                                        <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-warning/20 transition-colors duration-200">
                                            <Icon name="Tag" size={24} className="text-warning" />
                                        </div>
                                        <h3 className="font-semibold text-text-primary mb-2">Daily Deals</h3>
                                        <p className="text-sm text-muted-foreground">Limited-time offers</p>
                                    </Link>
                                </div>
                            </div>
                        </section>
                    }
                </main>
            </div>
        </GuestLayout>
    );

};

export default WishlistCenter;