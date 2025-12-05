import React, { useState, useEffect } from 'react';
import Icon from '@/components/AppIcon';
import Button from '@/components/Button';
import Header from '@/components/Header';
import { Input } from '@/shadcn/ui/input';
import ProductListItem from './components/ProductListItem';
import { Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { useCategories } from '@/api/hooks/useCategories';
import { deleteWishlistProductData, getWishlistData } from '@/api/hooks/useWishlist';
import { useStoreCart } from '@/api/hooks/useShoppingCart';
import { deleteWishlistData } from '@/api/hooks/useWishlist';

const WishlistCenter = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('dateAdded');
    const [filterCategory, setFilterCategory] = useState('all');
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
    const [wishlistProducts, setWishlistProducts] = useState([]);
        const {mutate:addtoCart} = useStoreCart()
    

    // Categories
    const { data: categoriesList = [], isLoading } = useCategories(
        { params: { limit: 6 } }, // 👈 pass params
        { refetchOnMount: true },
    );
    const categories = categoriesList?.payload?.data;
    const { data: wishlistData, refetch } = getWishlistData();
    // Add this useEffect after the wishlistData declaration
        useEffect(() => {
        if (wishlistData?.payload?.items) {
            setWishlistProducts(wishlistData.payload.items);
        }
        }, [wishlistData]);


   



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
    const { mutate: removeFromWishlist } = deleteWishlistData('');
    const { mutate: deleteWishlistProduct } = deleteWishlistProductData();

    const handleRemoveFromWishlist = async (productId: number) => {
        try {
            await removeFromWishlist(productId.toString(), {
                onSuccess: () => {
                    setWishlistProducts((prev) => prev?.filter((product) => product?.id !== productId));
                },
            });
        } catch (error) {
            console.error('Error in handleRemoveFromWishlist:', error);
        }
    };  
    
   const handleAddToCart = async (product: any, productId: number) => {
        try {
            await addtoCart({
                variant: product.variants[0].id,
                quantity: product.quantity || 1, 
                cartId: localStorage.getItem('guest_id') || undefined
            }, {
                onSuccess: () => {
                    handleRemoveFromWishlist(productId);
                },
            });
        } catch (error) {
            console.error('Error in handleAddToCart:', error);
        }
    };
    const handleShareProduct = (product: any) => {
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
        }
    };

    const handleClearWishlist =async () => {
        if (window?.confirm('Are you sure you want to clear your entire wishlist?')) {
            try{
                await deleteWishlistProduct({
                    onSuccess: () => {
                        setWishlistProducts([]);
                        refetch();
                        
                    },
                })
              
            }catch(error){
                console.error('Error in handleClearWishlist:', error);
            }
        }
    };

    const handleMoveAllToCart = async () => {
        const inStockProducts = wishlistProducts?.filter((p) => p?.inStock);
        if (inStockProducts?.length === 0) return;

        // Simulate adding all to cart
        for (const product of inStockProducts) {
            await handleAddToCart(product);
        }
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
                                        ${wishlistProducts?.reduce((sum, p) => sum + Number(p?.product?.price), 0)?.toFixed(2)}
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
                                                productId={product?.id} 
                                                product={product.product}
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