import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { Link } from '@inertiajs/react';

const VendorInfoPanel = ({ vendor }: { vendor: any }) => {
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Icon key={index} name="Star" size={16} className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-border'} />
        ));
    };

    return (
        <div className="bg-surface space-y-6 rounded-lg p-6">
            {/* Vendor Header */}
            <div className="flex items-center space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                    <Icon name="Store" size={24} className="text-white" />
                </div>
                <div className="flex-1">
                    <div className="mb-1 flex items-center space-x-2">
                        <h3 className="text-text-primary text-lg font-semibold">{vendor?.name}</h3>
                        <Icon name="BadgeCheck" size={18} className="text-accent" />
                    </div>
                    <div className="flex items-center space-x-1">
                        {renderStars(vendor?.rating)}
                        <span className="text-text-primary ml-1 text-sm font-medium">{vendor?.rating}</span>
                        <span className="text-text-secondary text-sm">({vendor?.reviewCount} reviews)</span>
                    </div>
                </div>
            </div>
            {/* Vendor Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-background p-3 text-center">
                    <div className="text-text-primary text-2xl font-bold">{vendor?.totalProducts}</div>
                    <div className="text-text-secondary text-sm">Products</div>
                </div>
                <div className="rounded-lg bg-background p-3 text-center">
                    <div className="text-text-primary text-2xl font-bold">{vendor?.yearsActive}</div>
                    <div className="text-text-secondary text-sm">Years Active</div>
                </div>
            </div>
            {/* Vendor Description */}
            <div>
                <p className="text-text-secondary text-sm leading-relaxed">{vendor?.description}</p>
            </div>
            {/* Vendor Features */}
            <div className="space-y-3">
                <h4 className="text-text-primary font-medium">Why Choose This Seller</h4>
                <div className="space-y-2">
                    {vendor?.features?.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                            <span className="text-text-secondary text-sm">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Contact Information */}
            <div className="space-y-3">
                <h4 className="text-text-primary font-medium">Contact Information</h4>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Icon name="MapPin" size={16} className="text-text-secondary flex-shrink-0" />
                        <span className="text-text-secondary text-sm">{vendor?.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} className="text-text-secondary flex-shrink-0" />
                        <span className="text-text-secondary text-sm">Response time: {vendor?.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Icon name="Truck" size={16} className="text-text-secondary flex-shrink-0" />
                        <span className="text-text-secondary text-sm">Ships from: {vendor?.shipsFrom}</span>
                    </div>
                </div>
            </div>
            {/* Action Buttons */}
            <div className="space-y-3">
                <Link href="/vendor-store-profile">
                    <Button variant="outline" fullWidth iconName="Store" iconPosition="left">
                        Visit Store
                    </Button>
                </Link>
                <Button variant="ghost" fullWidth iconName="MessageCircle" iconPosition="left">
                    Contact Seller
                </Button>
            </div>
            {/* Trust Badges */}
            <div className="border-t border-border pt-4">
                <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-1">
                        <Icon name="Shield" size={16} className="text-success" />
                        <span className="text-text-secondary text-xs">Verified</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Icon name="Award" size={16} className="text-warning" />
                        <span className="text-text-secondary text-xs">Top Seller</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Icon name="Truck" size={16} className="text-accent" />
                        <span className="text-text-secondary text-xs">Fast Ship</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorInfoPanel;
