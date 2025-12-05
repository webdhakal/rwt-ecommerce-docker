import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';
import RelatedProducts from './components/RelatedProducts';
import SavedItems from './components/SavedItems';
import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { useShoppingCart,useDeleteCartItem, useUpdateCartItem } from '@/api/hooks/useShoppingCart';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [showUndoRemove, setShowUndoRemove] = useState(null);

  const guestCartId= localStorage.getItem('guest_id');

  const { data: carts, isLoading, isError, error } = useShoppingCart({
      refetchOnMount: true,
      cartId: guestCartId || undefined
    });
  


useEffect(() => {
    if (carts?.payload?.items) {
      setCartItems(carts.payload.items);
    }
  }, [carts]);



 

  

  // Calculate totals
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
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
    cartId: guestCartId || undefined
  });
};

    const { mutate: deleteCartItem } = useDeleteCartItem();

  const handleRemoveItem = (itemId) => {
    const itemToRemove = cartItems?.find(item => item?.id === itemId);
    setCartItems(items => items?.filter(item => item?.id !== itemId));

    // Show undo option
    const timeoutId = setTimeout(() => {
    // This runs if undo is not clicked within 5 seconds
    deleteCartItem({ 
      itemId, 
      cartId: guestCartId || undefined 
    });
    setShowUndoRemove(null);
  }, 5000);

    setShowUndoRemove({
      item: itemToRemove,
      timeout: timeoutId
    });

  };

  const handleUndoRemove = () => {
    if (showUndoRemove) {
          clearTimeout(showUndoRemove.timeout);

      setCartItems(items => [...items, showUndoRemove?.item]);
      clearTimeout(showUndoRemove?.timeout);
      setShowUndoRemove(null);
    }
  };

  const handleSaveForLater = (itemId) => {
    const itemToSave = cartItems?.find(item => item?.id === itemId);
    if (itemToSave) {
      setCartItems(items => items?.filter(item => item?.id !== itemId));
      setSavedItems(items => [...items, { ...itemToSave, quantity: 1 }]);
    }
  };

  const handleMoveToCart = (itemId) => {
    const itemToMove = savedItems?.find(item => item?.id === itemId);
    if (itemToMove && itemToMove?.stock > 0) {
      setSavedItems(items => items?.filter(item => item?.id !== itemId));
      setCartItems(items => [...items, { ...itemToMove, quantity: 1 }]);
    }
  };

  const handleRemoveFromSaved = (itemId) => {
    setSavedItems(items => items?.filter(item => item?.id !== itemId));
  };

  const handlePromoCodeApply = (discountAmount, promoCode) => {
    setDiscount(discountAmount);
    setAppliedPromoCode(promoCode);
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems?.find(item => item?.id === product?.id);
    if (existingItem) {
      handleQuantityChange(product?.id, existingItem?.quantity + 1, existingItem?.variant);
    } else {
      setCartItems(items => [...items, { ...product, quantity: 1, stock: 10 }]);
    }
  };

  const breadcrumbs = [
    { label: 'Home', path: '/homepage' },
    { label: 'Shopping Cart', path: '/shopping-cart' }
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


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-4">
        <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Shopping Cart</h1>
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
          <div className="mb-6 p-4 bg-muted border border-border rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Trash2" size={20} className="text-text-secondary" />
              <span className="text-text-primary">
                "{showUndoRemove?.item?.product?.name}" removed from cart
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleUndoRemove}
              iconName="Undo"
              iconPosition="left"
              iconSize={14}
            >
              Undo
            </Button>
          </div>
        )}



        {/* Cart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
        <SavedItems
          savedItems={savedItems}
          onMoveToCart={handleMoveToCart}
          onRemoveFromSaved={handleRemoveFromSaved}
        />

        {/* Related Products */}
        <RelatedProducts onAddToCart={handleAddToCart} />
      </div>
    </GuestLayout>
  );
};

export default ShoppingCart;

