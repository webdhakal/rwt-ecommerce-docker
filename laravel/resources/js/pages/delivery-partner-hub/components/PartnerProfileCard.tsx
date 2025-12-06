import Button from '@/components/Button';
import { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PartnerProfileCard = ({ partnerData, onUpdateProfile }) => {
    const [isEditing, setIsEditing] = useState(false);

    const verificationItems = [
        { label: 'Identity Verified', status: partnerData?.verifications?.identity, icon: 'UserCheck' },
        { label: 'Background Check', status: partnerData?.verifications?.background, icon: 'Shield' },
        { label: 'Vehicle Registered', status: partnerData?.verifications?.vehicle, icon: 'Car' },
        { label: 'Insurance Active', status: partnerData?.verifications?.insurance, icon: 'FileCheck' },
    ];

    return (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-text-primary text-lg font-semibold">Partner Profile</h3>
                <Button variant="ghost" size="sm" iconName="Edit" iconPosition="left" onClick={() => setIsEditing(!isEditing)}>
                    Edit Profile
                </Button>
            </div>
            <div className="mb-6 flex items-center space-x-4">
                <div className="relative">
                    <img src={partnerData?.avatar} alt={partnerData?.avatarAlt} className="h-16 w-16 rounded-full object-cover" />
                    <div className="bg-success absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background">
                        <Icon name="Check" size={12} color="white" />
                    </div>
                </div>
                <div>
                    <h4 className="text-text-primary text-xl font-semibold">{partnerData?.name}</h4>
                    <p className="text-text-secondary">{partnerData?.email}</p>
                    <p className="text-text-secondary text-sm">{partnerData?.phone}</p>
                </div>
            </div>
            {/* Partner Stats */}
            <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-text-primary text-2xl font-bold">{partnerData?.stats?.totalDeliveries}</p>
                    <p className="text-text-secondary text-sm">Total Deliveries</p>
                </div>
                <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-text-primary text-2xl font-bold">{partnerData?.stats?.memberSince}</p>
                    <p className="text-text-secondary text-sm">Member Since</p>
                </div>
            </div>
            {/* Verification Status */}
            <div className="mb-6">
                <h5 className="text-text-primary mb-3 font-medium">Verification Status</h5>
                <div className="space-y-2">
                    {verificationItems?.map((item, index) => (
                        <div key={index} className="flex items-center justify-between rounded-lg bg-muted/50 p-2">
                            <div className="flex items-center space-x-2">
                                <Icon name={item?.icon} size={16} className={item?.status ? 'text-success' : 'text-muted-foreground'} />
                                <span className="text-text-primary text-sm">{item?.label}</span>
                            </div>
                            <Icon
                                name={item?.status ? 'CheckCircle' : 'Clock'}
                                size={16}
                                className={item?.status ? 'text-success' : 'text-warning'}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Vehicle Information */}
            <div className="mb-6">
                <h5 className="text-text-primary mb-3 font-medium">Vehicle Information</h5>
                <div className="rounded-lg bg-muted/50 p-4">
                    <div className="mb-2 flex items-center space-x-3">
                        <Icon name="Car" size={20} className="text-primary" />
                        <div>
                            <p className="text-text-primary font-medium">{partnerData?.vehicle?.type}</p>
                            <p className="text-text-secondary text-sm">{partnerData?.vehicle?.model}</p>
                        </div>
                    </div>
                    <p className="text-text-secondary text-sm">License: {partnerData?.vehicle?.license}</p>
                </div>
            </div>
            {/* Service Areas */}
            <div>
                <h5 className="text-text-primary mb-3 font-medium">Service Areas</h5>
                <div className="flex flex-wrap gap-2">
                    {partnerData?.serviceAreas?.map((area, index) => (
                        <span key={index} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                            {area}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PartnerProfileCard;
