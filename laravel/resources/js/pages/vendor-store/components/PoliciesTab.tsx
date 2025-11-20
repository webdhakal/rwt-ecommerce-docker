import React from 'react';
import Icon from '@/components/AppIcon';

const PoliciesTab = ({ policies }) => {
  const PolicySection = ({ title, icon, content, items }) => (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={20} className="text-primary" />
        </div>
        <h3 className="text-lg font-bold text-text-primary">{title}</h3>
      </div>

      {content && (
        <p className="text-text-secondary mb-4">{content}</p>
      )}

      {items && (
        <ul className="space-y-2">
          {items?.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-text-secondary">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipping Policy */}
        <PolicySection
          title="Shipping Policy"
          icon="Truck"
          content={policies?.shipping?.description}
          items={policies?.shipping?.details}
        />

        {/* Return Policy */}
        <PolicySection
          title="Return Policy"
          icon="RotateCcw"
          content={policies?.returns?.description}
          items={policies?.returns?.details}
        />

        {/* Refund Policy */}
        <PolicySection
          title="Refund Policy"
          icon="CreditCard"
          content={policies?.refunds?.description}
          items={policies?.refunds?.details}
        />

        {/* Customer Service */}
        <PolicySection
          title="Customer Service"
          icon="Headphones"
          content={policies?.customerService?.description}
          items={policies?.customerService?.details}
        />

        {/* Privacy Policy */}
        <PolicySection
          title="Privacy Policy"
          icon="Shield"
          content={policies?.privacy?.description}
          items={policies?.privacy?.details}
        />

        {/* Terms of Service */}
        <PolicySection
          title="Terms of Service"
          icon="FileText"
          content={policies?.terms?.description}
          items={policies?.terms?.details}
        />
      </div>
      {/* Additional Information */}
      <div className="mt-8 bg-muted rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-text-primary mb-2">Important Notice</h4>
            <p className="text-text-secondary text-sm">
              All policies are subject to change without prior notice. Please check this page regularly for updates.
              For specific questions about our policies, please contact our customer service team directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesTab;