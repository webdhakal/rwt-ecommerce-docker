import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar';
import { Badge } from '@/shadcn/ui/badge';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent } from '@/shadcn/ui/card';
import { Headphones, RefreshCw, Tag, Truck } from 'lucide-react';

const ServiceBlock = () => {
    return (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left: Testimonial */}
            <div className="lg:col-span-4">
                <h2 className="mb-6 text-2xl font-semibold text-gray-900">Testimonial</h2>
                <Card className="shadow-lg">
                    <CardContent className="px-8 pt-8 pb-10">
                        <div className="flex flex-col items-center text-center">
                            <Avatar className="mb-4 h-20 w-20">
                                <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                            <h3 className="text-lg font-semibold text-gray-900">ALAN DOE</h3>
                            <p className="text-sm text-gray-500">CEO & Founder Invision</p>
                            <blockquote className="mt-6 text-lg text-gray-600 italic">
                                <span className="text-5xl leading-none text-pink-400">“</span>
                                Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor dolor sit amet.
                            </blockquote>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Center: Summer Collection Banner */}
            <div className="lg:col-span-4">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-50 to-orange-50 shadow-xl">
                    <img
                        src="https://images.unsplash.com/photo-1594223272682-8da5dbf7c2db?w=800&h=800&fit=crop"
                        alt="Summer Collection"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white">
                        <Badge className="mb-4 bg-black/80 px-4 py-1 text-sm text-white">25% DISCOUNT</Badge>
                        <h1 className="mb-2 text-5xl font-bold">Summer Collection</h1>
                        <p className="mb-6 text-xl opacity-90">Starting @ $10</p>
                        <Button size="lg" className="bg-white font-medium text-black hover:bg-gray-100">
                            SHOP NOW
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right: Our Services */}
            <div className="lg:col-span-4">
                <h2 className="mb-6 text-2xl font-semibold text-gray-900">Our Services</h2>
                <div className="space-y-4">
                    {[
                        { icon: Truck, title: 'Worldwide Delivery', desc: 'For Order Over $100' },
                        { icon: Headphones, title: 'Worldwide Delivery', desc: 'For Order Over $100' },
                        { icon: RefreshCw, title: 'Worldwide Delivery', desc: 'For Order Over $100' },
                        { icon: Tag, title: 'Worldwide Delivery', desc: 'For Order Over $100' },
                    ].map((service, i) => (
                        <Card key={i} className="p-5 transition-shadow hover:shadow-md">
                            <div className="flex items-center gap-5">
                                <div className="rounded-full bg-pink-100 p-4">
                                    <service.icon className="h-6 w-6 text-pink-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{service.title}</h3>
                                    <p className="text-sm text-gray-500">{service.desc}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceBlock;
