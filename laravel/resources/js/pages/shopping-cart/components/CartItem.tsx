import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import { Link } from '@inertiajs/react';
import { Button } from '@/shadcn/ui/button';

const CartItem = ({ item, onQuantityChange, onRemove, onSaveForLater }) => {
  
  const [isRemoving, setIsRemoving] = useState(false);
  const [quantity, setQuantity] = useState(item?.quantity);
  let stock=item?.product?.variant?.stock;
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1 || newQuantity > stock) return;
    setQuantity(newQuantity);
    onQuantityChange(item?.id, newQuantity, item?.product?.variant?.id);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemove(item?.id);
  };

  const handleSaveForLater = () => {
    onSaveForLater(item?.id);
  };

  const totalPrice = item?.price * quantity;
  const originalTotal = item?.originalPrice ? item?.originalPrice * quantity : totalPrice;
  const savings = originalTotal - totalPrice;

  return (
    <div className={`bg-card border border-border rounded-lg p-4 sm:p-6 transition-all duration-300 ${isRemoving ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link href={route('product-detail', item?.id)} className="block">
            <div className="w-full sm:w-24 h-48 sm:h-24 bg-surface rounded-lg overflow-hidden">
              <img
                src={item?.product?.files?.[0]?.url || ""}
                alt={item?.product?.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Product Name & Vendor */}
              <Link
                href={route('product-detail', item?.id)}
                className="text-lg font-semibold text-text-primary hover:text-accent transition-colors duration-200 line-clamp-2"
              >
                {item?.product?.name}
              </Link>

              <Link
                href="/vendor-store-profile"
                className="text-sm text-text-secondary hover:text-accent transition-colors duration-200 mt-1 inline-block"
              >
                by {item?.vendor|| 'Default Vendor'}
              </Link>

              {/* Variants */}
              {item?.product?.variant  && (
                <div className="flex flex-wrap gap-2 mt-2">
                 
                    <span
                      
                      className="text-xs bg-muted text-text-secondary px-2 py-1 rounded-md"
                    >
                      {item?.product?.variant?.size_name}: {item?.product?.variant?.color_name}
                    </span>
                
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${stock > 10 ? 'bg-success' : stock > 0 ? 'bg-warning' : 'bg-error'
                  }`}></div>
                <span className={`text-sm ${stock > 10 ? 'text-success' : stock > 0 ? 'text-warning' : 'text-error'
                  }`}>
                  {stock > 10 ? 'In Stock' : stock > 0 ? `Only ${stock} left` : 'Out of Stock'}
                </span>
              </div>

              {/* Delivery Info */}
              {item?.deliveryInfo && (
                <div className="flex items-center gap-2 mt-1">
                  <Icon name="Truck" size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">{item?.deliveryInfo}</span>
                </div>
              )}
            </div>

            {/* Price & Controls */}
            <div className="flex flex-col items-end gap-3">
              {/* Price */}
              <div className="text-right">
                <div className="text-lg font-bold text-text-primary">
                  ${totalPrice?.toFixed(2)}
                </div>
                {savings > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-secondary line-through">
                      ${originalTotal?.toFixed(2)}
                    </span>
                    <span className="text-sm text-success font-medium">
                      Save ${savings?.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="text-xs text-text-secondary mt-1">
                  ${item?.price?.toFixed(2)} each
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || stock === 0}
                  className="w-8 h-8"
                >
                  <Icon name="Minus" size={14} />
                </Button>

                <div className="w-12 text-center">
                  <span className="text-sm font-medium">{quantity}</span>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= stock}
                  className="w-8 h-8"
                >
                  <Icon name="Plus" size={14} />
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveForLater}
              iconName="Heart"
              iconPosition="left"
              iconSize={14}
              className="text-text-secondary hover:text-accent"
            >
              Save for Later
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              iconName="Trash2"
              iconPosition="left"
              iconSize={14}
              className="text-text-secondary hover:text-error"
              loading={isRemoving}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;