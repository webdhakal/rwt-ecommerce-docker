import React from 'react';
import { Link } from '@inertiajs/react';
import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';

const VendorInfoPanel = ({ vendor }: { vendor: any }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-border'}
      />
    ));
  };

  return (
    <div className="bg-surface rounded-lg p-6 space-y-6">
      {/* Vendor Header */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Store" size={24} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-semibold text-text-primary">{vendor?.name}</h3>
            <Icon name="BadgeCheck" size={18} className="text-accent" />
          </div>
          <div className="flex items-center space-x-1">
            {renderStars(vendor?.rating)}
            <span className="text-sm font-medium text-text-primary ml-1">
              {vendor?.rating}
            </span>
            <span className="text-sm text-text-secondary">
              ({vendor?.reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>
      {/* Vendor Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-background rounded-lg">
          <div className="text-2xl font-bold text-text-primary">{vendor?.totalProducts}</div>
          <div className="text-sm text-text-secondary">Products</div>
        </div>
        <div className="text-center p-3 bg-background rounded-lg">
          <div className="text-2xl font-bold text-text-primary">{vendor?.yearsActive}</div>
          <div className="text-sm text-text-secondary">Years Active</div>
        </div>
      </div>
      {/* Vendor Description */}
      <div>
        <p className="text-sm text-text-secondary leading-relaxed">
          {vendor?.description}
        </p>
      </div>
      {/* Vendor Features */}
      <div className="space-y-3">
        <h4 className="font-medium text-text-primary">Why Choose This Seller</h4>
        <div className="space-y-2">
          {vendor?.features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success flex-shrink-0" />
              <span className="text-sm text-text-secondary">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Contact Information */}
      <div className="space-y-3">
        <h4 className="font-medium text-text-primary">Contact Information</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-text-secondary flex-shrink-0" />
            <span className="text-sm text-text-secondary">{vendor?.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-text-secondary flex-shrink-0" />
            <span className="text-sm text-text-secondary">
              Response time: {vendor?.responseTime}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Truck" size={16} className="text-text-secondary flex-shrink-0" />
            <span className="text-sm text-text-secondary">
              Ships from: {vendor?.shipsFrom}
            </span>
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
            <span className="text-xs text-text-secondary">Verified</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={16} className="text-warning" />
            <span className="text-xs text-text-secondary">Top Seller</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Truck" size={16} className="text-accent" />
            <span className="text-xs text-text-secondary">Fast Ship</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorInfoPanel;