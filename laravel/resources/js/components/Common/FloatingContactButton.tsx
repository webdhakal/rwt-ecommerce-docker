import Icon from '@/components/AppIcon';
import { useCallback, useEffect, useState } from 'react';

const FloatingContactButton = ({ onContact }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFloatingContactVisible, setIsFloatingContactVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const contactOptions = [
        { id: 'message', label: 'Send Message', icon: 'MessageCircle' },
        { id: 'call', label: 'Call Now', icon: 'Phone' },
        { id: 'email', label: 'Send Email', icon: 'Mail' },
        { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageSquare' },
    ];

    const handleOptionClick = (option) => {
        onContact(option?.id);
        setIsExpanded(false);
    };

    const handleFloatingContactScroll = useCallback(() => {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        setIsFloatingContactVisible(currentScroll > 250);
    }, []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();

        window.addEventListener('resize', checkMobile);
        window.addEventListener('scroll', handleFloatingContactScroll, { passive: true });

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('scroll', handleFloatingContactScroll);
        };
    }, [handleFloatingContactScroll]);

    // ✅ Show always on desktop, only after scroll on mobile
    const shouldShow = !isMobile || (isMobile && isFloatingContactVisible);

    if (!shouldShow) return null;

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {/* Contact Options */}
            {isExpanded && (
                <div className="animate-slide-up mb-4 space-y-2">
                    {contactOptions?.map((option) => (
                        <button
                            key={option?.id}
                            onClick={() => handleOptionClick(option)}
                            className="group flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-200 group-hover:bg-primary/20">
                                <Icon name={option?.icon} size={16} className="text-primary" />
                            </div>
                            <span className="text-sm font-medium whitespace-nowrap text-primary">{option?.label}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Main Contact Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`flex h-14 w-14 items-center justify-center rounded-full border bg-background text-primary shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
                    isExpanded ? 'rotate-45' : 'rotate-0'
                }`}
            >
                <Icon name={isExpanded ? 'X' : 'MessageCircle'} size={24} className="transition-transform duration-300" />
            </button>
        </div>
    );
};

export default FloatingContactButton;
