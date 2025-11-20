import Icon from '@/components/AppIcon';

const MobileMenuToggle = ({ isOpen, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className="text-text-secondary rounded-md p-2 transition-colors duration-200 hover:text-primary focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:outline-none"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
        >
            <div className="relative h-5 w-5">
                {/* Hamburger Icon */}
                <div className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
                    <Icon name="Menu" size={20} />
                </div>

                {/* Close Icon */}
                <div className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`}>
                    <Icon name="X" size={20} />
                </div>
            </div>
        </button>
    );
};

export default MobileMenuToggle;
