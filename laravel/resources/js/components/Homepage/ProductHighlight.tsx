'use client';

import { Card } from '@/shadcn/ui/card';

const newArrivals = [
    { name: 'Relaxed Short Full Sleeve T-Shirt', category: 'Clothes', price: 7.00, original: 14.00 },
    { name: 'Girls Pink Embroidered T-Shirt', category: 'Clothes', price: 21.00, original: 24.00 },
    { name: 'Black Floral Wrap Dress', category: 'Clothes', price: 5.00, original: 15.00 },
    { name: 'Pure Garment Dyed Cotton Shirt', category: "Men's Fashion", price: 30.00, original: 40.00 },
];

const trending = [
    { name: 'Running & Trekking Shoes', category: 'Sports', price: 82.00, original: 101.00 },
    { name: 'Trekking & Running Shoes', category: 'Sports', price: 78.00, original: 93.00 },
    { name: "Womens Party Wear Heels", category: 'Party Wear', price: 27.00, original: 32.00 },
    { name: 'Sports Claw Womens Shoes', category: 'Sports', price: 12.00, original: 24.00 },
];

const topRated = [
    { name: 'Pocket Watch Leather Pendant', category: 'Watches', price: 32.00, original: 53.00 },
    { name: 'Silver Deer Heart Necklace', category: 'Jewellery', price: 12.00, original: 32.00 },
    { name: 'Titan 100 ML Womens Perfume', category: 'Perfume', price: 74.00, original: 104.00 },
    { name: 'Men’s Leather Reversible Belt', category: 'Belt', price: 17.00, original: 23.00 },
];

const ProductItem = ({ name, category, price, original }: any) => (
    <Card className="flex items-center gap-3 p-4 mb-3 border rounded-xl hover:shadow-sm transition-shadow">
        {/* Product Image (Left) */}
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden border">
            <div className="w-full h-full bg-gray-200 border-2 border-dashed rounded-lg" />
            <img src="https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1" alt="" fill className="object-cover" />
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-gray-900 line-clamp-1">{name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{category}</p>

            <div className="flex items-center gap-2 mt-1.5">
                <span className="text-lg font-bold text-red-600">${price.toFixed(2)}</span>
                <span className="text-sm text-gray-400 line-through">${original.toFixed(2)}</span>
            </div>
        </div>
    </Card>
);

export default function TemuStyleThreeColumnLayout() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 bg-surface py-8 bg-white">
            {/* Section Headers */}
            <div className="grid grid-cols-3 gap-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
                <h2 className="text-2xl font-bold text-gray-900 text-center">Trending</h2>
                <h2 className="text-2xl font-bold text-gray-900 text-right">Top Rated</h2>
            </div>

            {/* 3 Columns Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* New Arrivals Column */}
                <div className="space-y-1">
                    {newArrivals.map((item, i) => (
                        <ProductItem key={i} {...item} />
                    ))}
                </div>

                {/* Trending Column */}
                <div className="space-y-1">
                    {trending.map((item, i) => (
                        <ProductItem key={i} {...item} />
                    ))}
                </div>

                {/* Top Rated Column */}
                <div className="space-y-1">
                    {topRated.map((item, i) => (
                        <ProductItem key={i} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
}