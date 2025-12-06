import { Button } from '@/shadcn/ui/button';
import { Card, CardContent } from '@/shadcn/ui/card';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DealOfTheDay() {
    // Set your target end time (example: 24 hours from now)
    const calculateTimeLeft = () => {
        const difference = +new Date('2025-12-31T23:59:59') - +new Date(); // Change date as needed
        let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (value: number) => String(value).padStart(2, '0');

    return (
        <section className="w-full bg-white py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="mb-8 text-2xl font-bold text-gray-900 md:text-3xl">Deal Of The Day</h2>

                <Card className="overflow-hidden rounded-2xl border-0 shadow-2xl">
                    <CardContent className="p-0">
                        <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
                            {/* Product Image */}
                            <div className="order-2 flex justify-center px-8 py-10 md:order-1 md:justify-end">
                                <img
                                    src="https://images.unsplash.com/photo-1591370869778-2002d02206e2?w=800&h=800&fit=crop&auto=format"
                                    alt="Old Spice Pack"
                                    className="max-w-sm object-contain drop-shadow-2xl md:max-w-md"
                                />
                            </div>

                            {/* Content */}
                            <div className="order-1 px-8 py-12 md:order-2 md:py-16">
                                {/* Rating */}
                                <div className="mb-4 flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-5 w-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl leading-tight font-bold text-gray-900 md:text-3xl">SHAMPOO, CONDITIONER & FACEWASH PACKS</h3>

                                {/* Description */}
                                <p className="mt-4 text-base leading-relaxed text-gray-600">
                                    Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur adipiscing elit.
                                </p>

                                {/* Price */}
                                <div className="mt-6 flex items-baseline gap-4">
                                    <span className="text-5xl font-bold text-red-600">$150.00</span>
                                    <span className="text-2xl text-gray-400 line-through">$200.00</span>
                                </div>

                                {/* Add to Cart */}
                                <Button
                                    size="lg"
                                    className="mt-8 rounded-full bg-red-600 px-12 py-7 text-lg font-bold text-white shadow-lg transition-all hover:bg-red-700"
                                >
                                    ADD TO CART
                                </Button>

                                {/* Live Countdown Timer */}
                                <div className="mt-12">
                                    <p className="mb-4 text-sm font-semibold tracking-wider text-gray-700 uppercase">Hurry Up! Offer Ends In:</p>
                                    <div className="grid max-w-sm grid-cols-4 gap-4">
                                        {[
                                            { value: timeLeft.days, label: 'Days' },
                                            { value: timeLeft.hours, label: 'Hours' },
                                            { value: timeLeft.minutes, label: 'Mins' },
                                            { value: timeLeft.seconds, label: 'Secs' },
                                        ].map((item, index) => (
                                            <div key={index} className="text-center">
                                                <div className="rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100 p-4 shadow-inner">
                                                    <div className="font-mono text-3xl font-bold text-red-600 md:text-4xl">
                                                        {formatTime(item.value)}
                                                    </div>
                                                </div>
                                                <p className="mt-2 text-xs font-medium text-gray-600">{item.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
