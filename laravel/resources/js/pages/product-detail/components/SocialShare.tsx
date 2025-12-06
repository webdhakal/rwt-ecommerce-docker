import Icon from '@/components/AppIcon';
import { Button } from '@/shadcn/ui/button';
import { useState } from 'react';

const SocialShare = ({ product }: { product: any }) => {
    const [copied, setCopied] = useState(false);
    const currentUrl = window.location?.href;
    const shareText = `Check out this amazing product: ${product?.name}`;

    const shareOptions = [
        {
            name: 'Facebook',
            icon: 'Facebook',
            color: 'text-blue-600',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        },
        {
            name: 'Twitter',
            icon: 'Twitter',
            color: 'text-blue-400',
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
        },
        {
            name: 'WhatsApp',
            icon: 'MessageCircle',
            color: 'text-green-600',
            url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`,
        },
        {
            name: 'Pinterest',
            icon: 'Image',
            color: 'text-red-600',
            url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&description=${encodeURIComponent(shareText)}`,
        },
    ];

    const handleShare = (url) => {
        window.open(url, '_blank', 'width=600,height=400');
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard?.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product?.name,
                    text: shareText,
                    url: currentUrl,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        }
    };

    return (
        <div className="bg-surface rounded-lg p-4">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-text-primary font-medium">Share this product</h3>
                <Icon name="Share2" size={18} className="text-text-secondary" />
            </div>
            {/* Social Share Buttons */}
            <div className="mb-4 grid grid-cols-2 gap-3">
                {shareOptions?.map((option) => (
                    <button
                        key={option?.name}
                        onClick={() => handleShare(option?.url)}
                        className="flex items-center space-x-2 rounded-lg bg-background p-3 transition-colors duration-200 hover:bg-muted"
                    >
                        <Icon name={option?.icon} size={18} className={option?.color} />
                        <span className="text-text-primary text-sm font-medium">{option?.name}</span>
                    </button>
                ))}
            </div>
            {/* Copy Link */}
            <div className="space-y-3">
                <Button variant="outline" fullWidth onClick={handleCopyLink} iconName={copied ? 'Check' : 'Copy'} iconPosition="left">
                    {copied ? 'Link Copied!' : 'Copy Link'}
                </Button>

                {/* Native Share (Mobile) */}
                {navigator.share && (
                    <Button variant="ghost" fullWidth onClick={handleNativeShare} iconName="Share" iconPosition="left">
                        Share via...
                    </Button>
                )}
            </div>
            {/* Share Stats */}
            <div className="mt-4 border-t border-border pt-4">
                <div className="text-text-secondary flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={14} />
                        <span>{product?.viewCount} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Icon name="Share2" size={14} />
                        <span>{product?.shareCount} shares</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialShare;
