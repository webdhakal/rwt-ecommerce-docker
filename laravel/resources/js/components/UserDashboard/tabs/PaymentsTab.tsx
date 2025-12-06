import { Badge } from '@/shadcn/ui/badge';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { Banknote, CreditCard as CardIcon, Plus } from 'lucide-react';

const payments = [
    { id: 1, type: 'card', last4: '4242', brand: 'Visa', expiry: '12/27', isDefault: true },
    { id: 2, type: 'cod', label: 'Cash on Delivery', isDefault: false },
];

export default function PaymentsTab() {
    return (
        <Card className="border shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl">Payment Options</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Payment Methods</h3>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Payment Method
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {payments.map((payment) => (
                            <Card key={payment.id} className={payment.isDefault ? 'ring-2 ring-primary' : ''}>
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {payment.type === 'card' ? (
                                                <CardIcon className="h-8 w-8 text-muted-foreground" />
                                            ) : (
                                                <Banknote className="h-8 w-8 text-muted-foreground" />
                                            )}
                                            <div>
                                                <p className="font-semibold">
                                                    {payment.type === 'card' ? `${payment.brand} •••• ${payment.last4}` : payment.label}
                                                </p>
                                                {payment.type === 'card' && <p className="text-sm text-muted-foreground">Expires {payment.expiry}</p>}
                                            </div>
                                        </div>
                                        {payment.isDefault && <Badge>Default</Badge>}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
