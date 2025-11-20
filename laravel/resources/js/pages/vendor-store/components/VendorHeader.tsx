import React from 'react';
import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';

const VendorHeader = ({ vendor, onFollow, onContact, isFollowing }) => {
  return (
    <div className="bg-background border-b border-border">
      {/* Cover Image Section */}
      <div className="relative h-48 lg:h-64 overflow-hidden">
        <img
          src={vendor?.coverImage}
          alt={`${vendor?.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Overlay Content */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div className="flex items-end gap-4">
              {/* Vendor Logo */}
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-lg p-2 flex-shrink-0">
                <img
                  src={vendor?.logo}
                  alt={`${vendor?.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Vendor Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-xl lg:text-2xl font-bold text-white mb-1 truncate">
                  {vendor?.name}
                </h1>
                <div className="flex items-center gap-4 text-sm text-white/90">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                    <span className="font-medium">{vendor?.rating}</span>
                    <span>({vendor?.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={16} />
                    <span>Since {vendor?.establishedYear}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant={isFollowing ? "secondary" : "default"}
                onClick={onFollow}
                iconName={isFollowing ? "Check" : "Plus"}
                iconPosition="left"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button
                variant="outline"
                onClick={onContact}
                iconName="MessageCircle"
                iconPosition="left"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Vendor Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Vendor Stats */}
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <Icon name="Package" size={16} />
              <span>{vendor?.totalProducts} Products</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} />
              <span>Responds in {vendor?.responseTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={16} />
              <span>{vendor?.location}</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-3">
            {vendor?.isVerified && (
              <div className="flex items-center gap-1 px-2 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
                <Icon name="Shield" size={14} />
                <span>Verified</span>
              </div>
            )}
            {vendor?.isPremium && (
              <div className="flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                <Icon name="Crown" size={14} />
                <span>Premium</span>
              </div>
            )}
            {vendor?.fastShipping && (
              <div className="flex items-center gap-1 px-2 py-1 bg-warning/10 text-warning rounded-full text-xs font-medium">
                <Icon name="Zap" size={14} />
                <span>Fast Shipping</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - Mobile */}
        <div className="flex lg:hidden items-center gap-3 mt-4">
          <Button
            variant={isFollowing ? "secondary" : "default"}
            onClick={onFollow}
            iconName={isFollowing ? "Check" : "Plus"}
            iconPosition="left"
            fullWidth
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
          <Button
            variant="outline"
            onClick={onContact}
            iconName="MessageCircle"
            iconPosition="left"
            fullWidth
          >
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VendorHeader;