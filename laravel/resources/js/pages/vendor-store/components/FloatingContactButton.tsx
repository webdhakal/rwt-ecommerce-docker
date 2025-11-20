import React, { useState } from 'react';
import Icon from '@/components/AppIcon';

const FloatingContactButton = ({ onContact }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const contactOptions = [
    { id: 'message', label: 'Send Message', icon: 'MessageCircle' },
    { id: 'call', label: 'Call Now', icon: 'Phone' },
    { id: 'email', label: 'Send Email', icon: 'Mail' },
    { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageSquare' }
  ];

  const handleOptionClick = (option) => {
    onContact(option?.id);
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options */}
      {isExpanded && (
        <div className="mb-4 space-y-2 animate-slide-up">
          {contactOptions?.map((option) => (
            <button
              key={option?.id}
              onClick={() => handleOptionClick(option)}
              className="flex items-center gap-3 bg-background border border-border rounded-lg px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 group"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                <Icon name={option?.icon} size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-primary whitespace-nowrap">
                {option?.label}
              </span>
            </button>
          ))}
        </div>
      )}
      {/* Main Contact Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 border bg-background text-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 ${isExpanded ? 'rotate-45' : 'rotate-0'
          }`}
      >
        <Icon
          name={isExpanded ? "X" : "MessageCircle"}
          size={24}
          className="transition-transform duration-300"
        />
      </button>
    </div>
  );
};

export default FloatingContactButton;