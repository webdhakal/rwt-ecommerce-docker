import { Plus, Home, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { Button } from '@/shadcn/ui/button';
import { Badge } from '@/shadcn/ui/badge';

const addresses = [
    { id: 1, type: "Home", name: "Pramesh Dhakal", address: "Kupondole, Lalitpur, Nepal", phone: "+977 9841234567", isDefault: true },
    { id: 2, type: "Office", name: "Pramesh Dhakal", address: "Pulchowk, Lalitpur", phone: "+977 9812345678", isDefault: false },
];

export default function AddressesTab() {
    return (
        <Card className="shadow-xl border">
            <CardHeader>
                <CardTitle className="text-2xl">Address Book</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Your Addresses</h3>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Address</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses.map((addr) => (
                            <Card key={addr.id} className={addr.isDefault ? "ring-2 ring-primary" : ""}>
                                <CardContent className="pt-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <Home className="h-6 w-6 text-muted-foreground" />
                                            <div>
                                                <p className="font-semibold">{addr.type} {addr.isDefault && <Badge className="ml-2">Default</Badge>}</p>
                                                <p className="text-sm text-foreground mt-1">{addr.name}</p>
                                                <p className="text-sm text-muted-foreground">{addr.address}</p>
                                                <p className="text-sm text-muted-foreground">{addr.phone}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon"><Edit className="h-5 w-5" /></Button>
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