import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';

const reviews = [
    { id: 1, product: "Wireless Earbuds", rating: 5, date: "Nov 12, 2025", comment: "Amazing sound quality and battery life!" },
    { id: 2, product: "Smart Watch", rating: 4, date: "Oct 20, 2025", comment: "Good but app needs improvement." },
];

export default function ReviewsTab() {
    return (
        <Card className="shadow-xl border">
            <CardHeader>
                <CardTitle className="text-2xl">My Reviews & Ratings</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <Card key={review.id}>
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-muted border-2 border-dashed rounded-xl w-20 h-20 flex-shrink-0" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-medium">{review.product}</h4>
                                            <span className="text-sm text-muted-foreground">• {review.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1 my-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground/30'}`} />
                                            ))}
                                        </div>
                                        <p className="text-foreground">{review.comment}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}