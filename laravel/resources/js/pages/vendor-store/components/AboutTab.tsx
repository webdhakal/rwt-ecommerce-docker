import React from 'react';
import Icon from '@/components/AppIcon';

const AboutTab = ({ vendor }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4">About Our Store</h2>
            <div className="prose prose-sm max-w-none text-text-secondary">
              <p className="mb-4">{vendor?.description}</p>
              <p className="mb-4">{vendor?.story}</p>
              <p>{vendor?.mission}</p>
            </div>
          </div>

          {/* Business Credentials */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4">Business Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Icon name="Building" size={20} className="text-text-secondary" />
                <div>
                  <div className="text-sm text-text-secondary">Business Type</div>
                  <div className="font-medium text-text-primary">{vendor?.businessType}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Icon name="Calendar" size={20} className="text-text-secondary" />
                <div>
                  <div className="text-sm text-text-secondary">Established</div>
                  <div className="font-medium text-text-primary">{vendor?.establishedYear}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Icon name="Users" size={20} className="text-text-secondary" />
                <div>
                  <div className="text-sm text-text-secondary">Team Size</div>
                  <div className="font-medium text-text-primary">{vendor?.teamSize} employees</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Icon name="Award" size={20} className="text-text-secondary" />
                <div>
                  <div className="text-sm text-text-secondary">Certifications</div>
                  <div className="font-medium text-text-primary">{vendor?.certifications?.join(', ')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4">Store Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {vendor?.gallery?.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={image?.url}
                    alt={image?.caption}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={20} className="text-text-secondary mt-0.5" />
                <div>
                  <div className="text-sm text-text-secondary">Address</div>
                  <div className="font-medium text-text-primary">{vendor?.address}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Icon name="Phone" size={20} className="text-text-secondary" />
                <div>
                  <div className="text-sm text-text-secondary">Phone</div>
                  <div className="font-medium text-text-primary">{vendor?.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Icon name="Mail" size={20} className="text-text-secondary" />
                <div>
                  <div className="text-sm text-text-secondary">Email</div>
                  <div className="font-medium text-text-primary">{vendor?.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Icon name="Globe" size={20} className="text-text-secondary" />
                <div>
                  <div className="text-sm text-text-secondary">Website</div>
                  <a
                    href={vendor?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    {vendor?.website}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">Business Hours</h3>
            <div className="space-y-2">
              {vendor?.businessHours?.map((hours, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-text-secondary">{hours?.day}</span>
                  <span className="font-medium text-text-primary">{hours?.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Map */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">Location</h3>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title={vendor?.name}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${vendor?.coordinates?.lat},${vendor?.coordinates?.lng}&z=14&output=embed`}
              />
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {vendor?.socialMedia?.map((social) => (
                <a
                  key={social?.platform}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors duration-200"
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;