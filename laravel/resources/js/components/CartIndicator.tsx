import Icon from '@/components/AppIcon';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const CartIndicator = () => {
    const [cartCount, setCartCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Mock cart data - in real app this would come from context/state management
    useEffect(() => {
        // Simulate cart count from localStorage or context
        const mockCartCount = 3;
        setCartCount(mockCartCount);
    }, []);

    // Simulate cart count updates
    const handleCartUpdate = (newCount) => {
        setIsAnimating(true);
        setCartCount(newCount);

        setTimeout(() => {
            setIsAnimating(false);
        }, 300);
    };

    return (
        <Link
            href="/shopping-cart"
            className="text-text-secondary group relative flex items-center space-x-2 p-2 transition-colors duration-200 hover:text-primary"
        >
            <div className="relative">
                <Icon name="ShoppingCart" size={20} className="transition-transform duration-200 group-hover:scale-105" />

                {/* Cart Count Badge */}
                {cartCount > 0 && (
                    <div
                        className={`absolute -top-2 -right-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent text-xs font-medium text-white transition-all duration-300 ${
                            isAnimating ? 'scale-125' : 'scale-100'
                        }`}
                    >
                        <span className="leading-none">{cartCount > 99 ? '99+' : cartCount}</span>
                    </div>
                )}
            </div>

            {/* Cart Label - Desktop Only */}
            <span className="hidden text-sm font-medium lg:inline">Cart</span>
        </Link>
    );
};

export default CartIndicator;
