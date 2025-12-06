import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';

const VendorHeader = ({ vendor, onFollow, onContact, isFollowing }) => {
    return (
        <div className="border-b border-border bg-background">
            {/* Cover Image Section */}
            <div className="relative h-48 overflow-hidden lg:h-64">
                <img src={vendor?.coverImage} alt={`${vendor?.name} cover`} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Overlay Content */}
                <div className="absolute right-4 bottom-4 left-4 text-white">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex items-end gap-4">
                            {/* Vendor Logo */}
                            <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-white p-2 lg:h-20 lg:w-20">
                                <img src={vendor?.logo} alt={`${vendor?.name} logo`} className="h-full w-full object-contain" />
                            </div>

                            {/* Vendor Info */}
                            <div className="min-w-0 flex-1">
                                <h1 className="mb-1 truncate text-xl font-bold text-white lg:text-2xl">{vendor?.name}</h1>
                                <div className="flex items-center gap-4 text-sm text-white/90">
                                    <div className="flex items-center gap-1">
                                        <Icon name="Star" size={16} className="fill-current text-yellow-400" />
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
                        <div className="hidden items-center gap-3 lg:flex">
                            <Button
                                variant={isFollowing ? 'secondary' : 'default'}
                                onClick={onFollow}
                                iconName={isFollowing ? 'Check' : 'Plus'}
                                iconPosition="left"
                                className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={onContact}
                                iconName="MessageCircle"
                                iconPosition="left"
                                className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                            >
                                Contact
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Vendor Details Section */}
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Vendor Stats */}
                    <div className="text-text-secondary flex items-center gap-6 text-sm">
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
                            <div className="bg-success/10 text-success flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium">
                                <Icon name="Shield" size={14} />
                                <span>Verified</span>
                            </div>
                        )}
                        {vendor?.isPremium && (
                            <div className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                                <Icon name="Crown" size={14} />
                                <span>Premium</span>
                            </div>
                        )}
                        {vendor?.fastShipping && (
                            <div className="bg-warning/10 text-warning flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium">
                                <Icon name="Zap" size={14} />
                                <span>Fast Shipping</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons - Mobile */}
                <div className="mt-4 flex items-center gap-3 lg:hidden">
                    <Button
                        variant={isFollowing ? 'secondary' : 'default'}
                        onClick={onFollow}
                        iconName={isFollowing ? 'Check' : 'Plus'}
                        iconPosition="left"
                        fullWidth
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    <Button variant="outline" onClick={onContact} iconName="MessageCircle" iconPosition="left" fullWidth>
                        Contact
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default VendorHeader;
