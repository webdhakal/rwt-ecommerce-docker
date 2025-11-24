import { useState, useEffect } from "react";
import { Card, CardContent } from "@/shadcn/ui/card";
import { Button } from "@/shadcn/ui/button";
import { Star } from "lucide-react";

export default function DealOfTheDay() {
    // Set your target end time (example: 24 hours from now)
    const calculateTimeLeft = () => {
        const difference = +new Date("2025-12-31T23:59:59") - +new Date(); // Change date as needed
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

    const formatTime = (value: number) => String(value).padStart(2, "0");

    return (
        <section className="w-full bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                    Deal Of The Day
                </h2>

                <Card className="overflow-hidden shadow-2xl border-0 rounded-2xl">
                    <CardContent className="p-0">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                            {/* Product Image */}
                            <div className="flex justify-center md:justify-end px-8 py-10 order-2 md:order-1">
                                <img
                                    src="https://images.unsplash.com/photo-1591370869778-2002d02206e2?w=800&h=800&fit=crop&auto=format"
                                    alt="Old Spice Pack"
                                    className="max-w-sm md:max-w-md object-contain drop-shadow-2xl"
                                />
                            </div>

                            {/* Content */}
                            <div className="px-8 py-12 md:py-16 order-1 md:order-2">
                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                                    SHAMPOO, CONDITIONER & FACEWASH PACKS
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 mt-4 text-base leading-relaxed">
                                    Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
                                    consectetur adipiscing elit.
                                </p>

                                {/* Price */}
                                <div className="flex items-baseline gap-4 mt-6">
                                    <span className="text-5xl font-bold text-red-600">$150.00</span>
                                    <span className="text-2xl text-gray-400 line-through">$200.00</span>
                                </div>

                                {/* Add to Cart */}
                                <Button
                                    size="lg"
                                    className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-12 py-7 rounded-full shadow-lg transition-all"
                                >
                                    ADD TO CART
                                </Button>

                                {/* Live Countdown Timer */}
                                <div className="mt-12">
                                    <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                                        Hurry Up! Offer Ends In:
                                    </p>
                                    <div className="grid grid-cols-4 gap-4 max-w-sm">
                                        {[
                                            { value: timeLeft.days, label: "Days" },
                                            { value: timeLeft.hours, label: "Hours" },
                                            { value: timeLeft.minutes, label: "Mins" },
                                            { value: timeLeft.seconds, label: "Secs" },
                                        ].map((item, index) => (
                                            <div key={index} className="text-center">
                                                <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-4 shadow-inner">
                                                    <div className="text-3xl md:text-4xl font-bold text-red-600 font-mono">
                                                        {formatTime(item.value)}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-600 mt-2 font-medium">
                                                    {item.label}
                                                </p>
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