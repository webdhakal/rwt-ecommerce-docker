import { useProductDetail } from '@/api/hooks/useProductDetail';
import GuestLayout from '@/layouts/guest-layout';
import { ProductDetail } from '@/types/Product';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Icon from '../../components/AppIcon';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';
import SocialShare from './components/SocialShare';
import VendorInfoPanel from './components/VendorInfoPanel';
import { useStoreCart } from '@/api/hooks/useShoppingCart';
import { storeWishlistData } from '@/api/hooks/useWishlist';

export function slugParser(url: string) {
    return url.split('/')[url.split('/').length - 1];
}

function mapProductDetailToUI(product: ProductDetail) {
    return {
        id: product.id,
        name: product.name,
        rating: product.rating ?? 0,
        reviewCount: product.reviews_count,
        price: parseFloat(product.price),
        originalPrice: parseFloat(product.base_price),
        description: product.description,
        images: product?.files?.length > 0 
            ? product.files.map((file) => file.url)
            : ['https://via.placeholder.com/800x800?text=No+Image'],
        variants: product.variants ? product.variants.map((v) => ({
            id: v.id,
            name: `${v.size?.size_code ?? ''} ${v.color?.name ?? ''}`.trim(),
            price: parseFloat(v.price),
            originalPrice: parseFloat(v.base_price),
            stock: v.stock,
        })) : null,
        variantType: 'Size & Color', // since backend supports both
        keyFeatures: product.features,
        vendor: {
            id: 'vendor-001',
            name: 'Default Vendor',
            rating: 4.5,
            reviewCount: 1200,
            totalProducts: 200,
            yearsActive: 5,
            description: 'Vendor details not provided by API.',
            features: ['Fast shipping', 'Warranty available'],
            location: 'Unknown',
            responseTime: 'Within 24 hours',
            shipsFrom: 'Warehouse',
        },
        specifications: product.specifications,
        shippingOptions: [
            { name: 'Standard Shipping', duration: '5-7 business days', price: 0 },
            { name: 'Express Shipping', duration: '2-3 business days', price: 15 },
        ],
        reviews: [], // since backend didn’t provide reviews
        reviewDistribution: {},
        viewCount: 0,
        has_variant: product.has_variant,
        shareCount: 0,
    };
}

const ProductDetailPage = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [addToCartSuccess, setAddToCartSuccess] = useState(false);
    const { url } = usePage();
    const slug = slugParser(url);

    const { data } = useProductDetail(slug);
    // Map API payload → UI product
    const product = data?.payload ? mapProductDetailToUI(data.payload as ProductDetail) : null; // send data in payload.data

        // Mock related products (keep as is)
    const relatedProducts = [
        {
            id: 'rel-001',
            name: 'iPhone 15 Pro - 128GB Blue Titanium',
            vendor: 'TechStore Pro',
            slug: "random",
            price: 999,
            originalPrice: 1099,
            discount: 9,
            rating: 4.7,
            reviewCount: 1847,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        },
        {
            id: 'rel-002',
            name: 'Samsung Galaxy S24 Ultra - 256GB',
            slug: "et-ipsum-omnis-MdIrB",
            vendor: 'Electronics Hub',
            price: 1199,
            originalPrice: 1299,
            discount: 8,
            rating: 4.6,
            reviewCount: 2134,
            image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=400&fit=crop',
        },
        {
            id: 'rel-003',
            slug: "et-ipsum-omnis-MdIrB",
            name: 'Google Pixel 8 Pro - 256GB',
            vendor: 'Mobile World',
            price: 899,
            originalPrice: 999,
            discount: 10,
            rating: 4.5,
            reviewCount: 987,
            image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop',
        },
        {
            id: 'rel-004',
            name: 'OnePlus 12 - 256GB',
            slug: "et-ipsum-omnis-MdIrB",
            vendor: 'Phone Paradise',
            price: 799,
            originalPrice: 899,
            discount: 11,
            rating: 4.4,
            reviewCount: 654,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
        },
        {
            id: 'rel-005',
            name: 'iPhone 14 Pro Max - 256GB',
            slug: "et-ipsum-omnis-MdIrB",
            vendor: 'Apple Store',
            price: 1099,
            originalPrice: 1199,
            discount: 8,
            rating: 4.8,
            reviewCount: 3421,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        },
    ];

    // const relatedProducts = data?.payload?.related_products; // how is the data being sent from the backend ?

    const breadcrumbs = [
        { label: 'Home', path: '/homepage' },
        { label: 'Electronics', path: '/product-listing-category-browse?category=electronics' },
        { label: 'Smartphones', path: '/product-listing-category-browse?category=smartphones' },
        { label: product?.name, path: '/product-detail' },
    ];

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const {mutate:addtoCart} = useStoreCart()
    const {mutate:onAddToWishlist} = storeWishlistData()

    const handleAddToCart = (cartItem) => {
        console.log('Adding to cart:', cartItem);
        addtoCart({
            variant: cartItem.variant.id,
            quantity: cartItem.quantity,
            cartId: localStorage.getItem('guest_id') || undefined
        })
        setAddToCartSuccess(true);
        setTimeout(() => setAddToCartSuccess(false), 3000);
    };

    const handleAddToWishlist = (product) => {
        console.log('Adding to wishlist:', product);
        onAddToWishlist({product:product.id})
    };

    if (!product) return <div>Loading...</div>;
    return (
        <GuestLayout>
            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 mt-2 border">
                {/* Product Section */}
                <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Product Images */}
                    <div className="space-y-6">
                        <ProductImageGallery images={product?.images} productName={product?.name} />
                        <div className="lg:hidden">
                            <SocialShare product={product} />
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="space-y-6">
                        <ProductInfo product={product} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />
                        <div className="hidden lg:block">
                            <SocialShare product={product} />
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="mb-12">
                    <ProductTabs product={product} />
                </div>

                {/* Vendor Information + Related */}
                <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* vendors are hardcoded right now */}
                    {product.vendor && (
                        <div className="lg:col-span-1">
                            <VendorInfoPanel vendor={product.vendor} />
                        </div>
                    )}
                    <div className="lg:col-span-2">
                        <RelatedProducts products={relatedProducts} />
                    </div>
                </div>

                {/* Success Toast */}
                {addToCartSuccess && (
                    <div className="bg-success text-success-foreground shadow-modal z-toast animate-slide-up fixed top-20 right-4 rounded-lg px-6 py-3">
                        <div className="flex items-center space-x-2">
                            <Icon name="Check" size={20} />
                            <span className="font-medium">Added to cart successfully!</span>
                        </div>
                    </div>
                )}
            </div>
        </GuestLayout>
    );
};

export default ProductDetailPage;
