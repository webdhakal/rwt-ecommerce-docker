import Icon from '@/components/AppIcon';

const AboutTab = ({ vendor }) => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-8 lg:col-span-2">
                    {/* About Section */}
                    <div className="rounded-lg border border-border bg-card p-6">
                        <h2 className="text-text-primary mb-4 text-xl font-bold">About Our Store</h2>
                        <div className="prose prose-sm text-text-secondary max-w-none">
                            <p className="mb-4">{vendor?.description}</p>
                            <p className="mb-4">{vendor?.story}</p>
                            <p>{vendor?.mission}</p>
                        </div>
                    </div>

                    {/* Business Credentials */}
                    <div className="rounded-lg border border-border bg-card p-6">
                        <h2 className="text-text-primary mb-4 text-xl font-bold">Business Information</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="flex items-center gap-3">
                                <Icon name="Building" size={20} className="text-text-secondary" />
                                <div>
                                    <div className="text-text-secondary text-sm">Business Type</div>
                                    <div className="text-text-primary font-medium">{vendor?.businessType}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Icon name="Calendar" size={20} className="text-text-secondary" />
                                <div>
                                    <div className="text-text-secondary text-sm">Established</div>
                                    <div className="text-text-primary font-medium">{vendor?.establishedYear}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Icon name="Users" size={20} className="text-text-secondary" />
                                <div>
                                    <div className="text-text-secondary text-sm">Team Size</div>
                                    <div className="text-text-primary font-medium">{vendor?.teamSize} employees</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Icon name="Award" size={20} className="text-text-secondary" />
                                <div>
                                    <div className="text-text-secondary text-sm">Certifications</div>
                                    <div className="text-text-primary font-medium">{vendor?.certifications?.join(', ')}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gallery */}
                    <div className="rounded-lg border border-border bg-card p-6">
                        <h2 className="text-text-primary mb-4 text-xl font-bold">Store Gallery</h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            {vendor?.gallery?.map((image, index) => (
                                <div key={index} className="aspect-square overflow-hidden rounded-lg">
                                    <img
                                        src={image?.url}
                                        alt={image?.caption}
                                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Contact Information */}
                    <div className="rounded-lg border border-border bg-card p-6">
                        <h3 className="text-text-primary mb-4 text-lg font-bold">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Icon name="MapPin" size={20} className="text-text-secondary mt-0.5" />
                                <div>
                                    <div className="text-text-secondary text-sm">Address</div>
                                    <div className="text-text-primary font-medium">{vendor?.address}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Icon name="Phone" size={20} className="text-text-secondary" />
                                <div>
                                    <div className="text-text-secondary text-sm">Phone</div>
                                    <div className="text-text-primary font-medium">{vendor?.phone}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Icon name="Mail" size={20} className="text-text-secondary" />
                                <div>
                                    <div className="text-text-secondary text-sm">Email</div>
                                    <div className="text-text-primary font-medium">{vendor?.email}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Icon name="Globe" size={20} className="text-text-secondary" />
                                <div>
                                    <div className="text-text-secondary text-sm">Website</div>
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
                    <div className="rounded-lg border border-border bg-card p-6">
                        <h3 className="text-text-primary mb-4 text-lg font-bold">Business Hours</h3>
                        <div className="space-y-2">
                            {vendor?.businessHours?.map((hours, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-text-secondary">{hours?.day}</span>
                                    <span className="text-text-primary font-medium">{hours?.hours}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Location Map */}
                    <div className="rounded-lg border border-border bg-card p-6">
                        <h3 className="text-text-primary mb-4 text-lg font-bold">Location</h3>
                        <div className="aspect-video overflow-hidden rounded-lg">
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
                    <div className="rounded-lg border border-border bg-card p-6">
                        <h3 className="text-text-primary mb-4 text-lg font-bold">Follow Us</h3>
                        <div className="flex gap-3">
                            {vendor?.socialMedia?.map((social) => (
                                <a
                                    key={social?.platform}
                                    href={social?.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-secondary flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
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
