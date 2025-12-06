import { useDeleteCartItem, useShoppingCart, useUpdateCartItem } from '@/api/hooks/useShoppingCart';
import Icon from '@/components/AppIcon';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import Header from '@/components/Header';
import GuestLayout from '@/layouts/guest-layout';
import { Button } from '@/shadcn/ui/button';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CartItem from './components/CartItem';
import EmptyCart from './components/EmptyCart';
import OrderSummary from './components/OrderSummary';
import RelatedProducts from './components/RelatedProducts';
import SavedItems from './components/SavedItems';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [savedItems, setSavedItems] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [appliedPromoCode, setAppliedPromoCode] = useState('');
    const [showUndoRemove, setShowUndoRemove] = useState(null);

    const guestCartId = localStorage.getItem('guest_id');

    const {
        data: carts,
        isLoading,
        isError,
        error,
    } = useShoppingCart({
        refetchOnMount: true,
        cartId: guestCartId || undefined,
    });

    useEffect(() => {
        if (carts?.payload?.items) {
            setCartItems(carts.payload.items);
        }
    }, [carts]);

    // Mock cart data
    // useEffect(() => {
    //   const mockCartItems = [
    //     {
    //       id: 1,
    //       name: 'iPhone 15 Pro Max 256GB - Natural Titanium',
    //       vendor: 'Apple Store Official',
    //       price: 1199.99,
    //       originalPrice: 1299.99,
    //       quantity: 1,
    //       stock: 15,
    //       image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    //       variants: [
    //         { name: 'Color', value: 'Natural Titanium' },
    //         { name: 'Storage', value: '256GB' }
    //       ],
    //       deliveryInfo: 'Free delivery by Dec 30'
    //     },
    //     {
    //       id: 2,
    //       name: 'AirPods Pro (2nd Generation) with MagSafe Case',
    //       vendor: 'Apple Store Official',
    //       price: 249.99,
    //       quantity: 2,
    //       stock: 8,
    //       image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop',
    //       variants: [
    //         { name: 'Color', value: 'White' }
    //       ],
    //       deliveryInfo: 'Free delivery by Dec 28'
    //     },
    //     {
    //       id: 3,
    //       name: 'MacBook Air 13-inch M2 Chip - Midnight',
    //       vendor: 'TechStore Pro',
    //       price: 1099.99,
    //       originalPrice: 1199.99,
    //       quantity: 1,
    //       stock: 3,
    //       image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
    //       variants: [
    //         { name: 'Color', value: 'Midnight' },
    //         { name: 'Memory', value: '8GB' },
    //         { name: 'Storage', value: '256GB SSD' }
    //       ],
    //       deliveryInfo: 'Free delivery by Jan 2'
    //     }
    //   ];

    //   const mockSavedItems = [
    //     {
    //       id: 4,
    //       name: 'iPad Pro 12.9-inch M2 Chip',
    //       vendor: 'Apple Store Official',
    //       price: 1099.99,
    //       originalPrice: 1199.99,
    //       stock: 12,
    //       image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    //       variants: [
    //         { name: 'Color', value: 'Space Gray' },
    //         { name: 'Storage', value: '128GB' }
    //       ]
    //     },
    //     {
    //       id: 5,
    //       name: 'Apple Watch Series 9 GPS',
    //       vendor: 'WearTech Hub',
    //       price: 399.99,
    //       stock: 0,
    //       image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
    //       variants: [
    //         { name: 'Size', value: '45mm' },
    //         { name: 'Color', value: 'Midnight' }
    //       ]
    //     }
    //   ];

    //   setCartItems(carts?.item);
    //   setSavedItems(mockSavedItems);
    // }, []);

    // Calculate totals
    const subtotal = cartItems?.reduce((sum, item) => sum + item?.price * item?.quantity, 0);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
    const total = subtotal + tax + shipping - discount;
    const itemCount = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);

    const { mutate: updateItem } = useUpdateCartItem();

    const handleQuantityChange = (itemId: string, newQuantity: number, variantId: string) => {
        updateItem({
            itemId,
            variant: variantId,
            quantity: newQuantity,
            cartId: guestCartId || undefined,
        });
    };

    const { mutate: deleteCartItem } = useDeleteCartItem();

    const handleRemoveItem = (itemId) => {
        const itemToRemove = cartItems?.find((item) => item?.id === itemId);
        setCartItems((items) => items?.filter((item) => item?.id !== itemId));

        // Show undo option
        const timeoutId = setTimeout(() => {
            // This runs if undo is not clicked within 5 seconds
            deleteCartItem({
                itemId,
                cartId: guestCartId || undefined,
            });
            setShowUndoRemove(null);
        }, 5000);

        setShowUndoRemove({
            item: itemToRemove,
            timeout: timeoutId,
        });
    };

    const handleUndoRemove = () => {
        if (showUndoRemove) {
            clearTimeout(showUndoRemove.timeout);

            setCartItems((items) => [...items, showUndoRemove?.item]);
            clearTimeout(showUndoRemove?.timeout);
            setShowUndoRemove(null);
        }
    };

    const handleSaveForLater = (itemId) => {
        const itemToSave = cartItems?.find((item) => item?.id === itemId);
        if (itemToSave) {
            setCartItems((items) => items?.filter((item) => item?.id !== itemId));
            setSavedItems((items) => [...items, { ...itemToSave, quantity: 1 }]);
        }
    };

    const handleMoveToCart = (itemId) => {
        const itemToMove = savedItems?.find((item) => item?.id === itemId);
        if (itemToMove && itemToMove?.stock > 0) {
            setSavedItems((items) => items?.filter((item) => item?.id !== itemId));
            setCartItems((items) => [...items, { ...itemToMove, quantity: 1 }]);
        }
    };

    const handleRemoveFromSaved = (itemId) => {
        setSavedItems((items) => items?.filter((item) => item?.id !== itemId));
    };

    const handlePromoCodeApply = (discountAmount, promoCode) => {
        setDiscount(discountAmount);
        setAppliedPromoCode(promoCode);
    };

    const handleAddToCart = (product) => {
        const existingItem = cartItems?.find((item) => item?.id === product?.id);
        if (existingItem) {
            handleQuantityChange(product?.id, existingItem?.quantity + 1, existingItem?.variant);
        } else {
            setCartItems((items) => [...items, { ...product, quantity: 1, stock: 10 }]);
        }
    };

    const breadcrumbs = [
        { label: 'Home', path: '/homepage' },
        { label: 'Shopping Cart', path: '/shopping-cart' },
    ];

    if (cartItems?.length === 0 && !showUndoRemove) {
        return (
            <>
                <Head title="Shopping Cart - EcommerceHub" />

                <div className="min-h-screen bg-background">
                    <Header />
                    <EmptyCart />
                </div>
            </>
        );
    }

    return (
        <GuestLayout>
            <Head title={`Shopping Cart (${itemCount} ${itemCount === 1 ? 'item' : 'items'}) - EcommerceHub`} />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />

                {/* Page Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-text-primary mb-2 text-3xl font-bold">Shopping Cart</h1>
                        <p className="text-text-secondary">
                            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>

                    {cartItems?.length > 0 && (
                        <div className="mt-4 sm:mt-0">
                            <Button
                                variant="outline"
                                iconName="RotateCcw"
                                iconPosition="left"
                                iconSize={16}
                                onClick={() => window.location?.reload()}
                            >
                                Refresh Cart
                            </Button>
                        </div>
                    )}
                </div>

                {/* Undo Remove Notification */}
                {showUndoRemove && (
                    <div className="mb-6 flex items-center justify-between rounded-lg border border-border bg-muted p-4">
                        <div className="flex items-center gap-3">
                            <Icon name="Trash2" size={20} className="text-text-secondary" />
                            <span className="text-text-primary">"{showUndoRemove?.item?.product?.name}" removed from cart</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleUndoRemove} iconName="Undo" iconPosition="left" iconSize={14}>
                            Undo
                        </Button>
                    </div>
                )}

                {/* Cart Content */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            {cartItems?.map((item) => (
                                <CartItem
                                    key={item?.id}
                                    item={item}
                                    onQuantityChange={handleQuantityChange}
                                    onRemove={handleRemoveItem}
                                    onSaveForLater={handleSaveForLater}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <OrderSummary
                            subtotal={subtotal}
                            tax={tax}
                            shipping={shipping}
                            discount={discount}
                            total={total}
                            itemCount={itemCount}
                            onPromoCodeApply={handlePromoCodeApply}
                        />
                    </div>
                </div>

                {/* Saved Items */}
                <SavedItems savedItems={savedItems} onMoveToCart={handleMoveToCart} onRemoveFromSaved={handleRemoveFromSaved} />

                {/* Related Products */}
                <RelatedProducts onAddToCart={handleAddToCart} />
            </div>
        </GuestLayout>
    );
};

export default ShoppingCart;
