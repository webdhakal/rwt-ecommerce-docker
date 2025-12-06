'use client';

import { Card } from '@/shadcn/ui/card';

const newArrivals = [
    { name: 'Relaxed Short Full Sleeve T-Shirt', category: 'Clothes', price: 7.0, original: 14.0 },
    { name: 'Girls Pink Embroidered T-Shirt', category: 'Clothes', price: 21.0, original: 24.0 },
    { name: 'Black Floral Wrap Dress', category: 'Clothes', price: 5.0, original: 15.0 },
    { name: 'Pure Garment Dyed Cotton Shirt', category: "Men's Fashion", price: 30.0, original: 40.0 },
];

const trending = [
    { name: 'Running & Trekking Shoes', category: 'Sports', price: 82.0, original: 101.0 },
    { name: 'Trekking & Running Shoes', category: 'Sports', price: 78.0, original: 93.0 },
    { name: 'Womens Party Wear Heels', category: 'Party Wear', price: 27.0, original: 32.0 },
    { name: 'Sports Claw Womens Shoes', category: 'Sports', price: 12.0, original: 24.0 },
];

const topRated = [
    { name: 'Pocket Watch Leather Pendant', category: 'Watches', price: 32.0, original: 53.0 },
    { name: 'Silver Deer Heart Necklace', category: 'Jewellery', price: 12.0, original: 32.0 },
    { name: 'Titan 100 ML Womens Perfume', category: 'Perfume', price: 74.0, original: 104.0 },
    { name: 'Men’s Leather Reversible Belt', category: 'Belt', price: 17.0, original: 23.0 },
];

const ProductItem = ({ name, category, price, original }: any) => (
    <Card className="mb-3 flex items-center gap-3 rounded-xl border p-4 transition-shadow hover:shadow-sm">
        {/* Product Image (Left) */}
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border bg-gray-100">
            <div className="h-full w-full rounded-lg border-2 border-dashed bg-gray-200" />
            <img
                src="https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1"
                alt=""
                fill
                className="object-cover"
            />
        </div>

        {/* Text Content */}
        <div className="min-w-0 flex-1">
            <p className="line-clamp-1 text-sm font-medium text-gray-900">{name}</p>
            <p className="mt-0.5 text-xs text-gray-500">{category}</p>

            <div className="mt-1.5 flex items-center gap-2">
                <span className="text-lg font-bold text-red-600">${price.toFixed(2)}</span>
                <span className="text-sm text-gray-400 line-through">${original.toFixed(2)}</span>
            </div>
        </div>
    </Card>
);

export default function TemuStyleThreeColumnLayout() {
    return (
        <div className="bg-surface mx-auto max-w-7xl bg-white px-4 py-8 sm:px-6 lg:px-2">
            {/* Section Headers */}
            <div className="mb-6 grid grid-cols-3 gap-8">
                <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
                <h2 className="text-center text-2xl font-bold text-gray-900">Trending</h2>
                <h2 className="text-right text-2xl font-bold text-gray-900">Top Rated</h2>
            </div>

            {/* 3 Columns Layout */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
