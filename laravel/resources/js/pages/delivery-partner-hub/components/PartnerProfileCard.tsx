import React, { useState } from 'react';
import Button from '@/components/Button';
import Icon from '../../../components/AppIcon';


const PartnerProfileCard = ({ partnerData, onUpdateProfile }) => {
    const [isEditing, setIsEditing] = useState(false);

    const verificationItems = [
        { label: 'Identity Verified', status: partnerData?.verifications?.identity, icon: 'UserCheck' },
        { label: 'Background Check', status: partnerData?.verifications?.background, icon: 'Shield' },
        { label: 'Vehicle Registered', status: partnerData?.verifications?.vehicle, icon: 'Car' },
        { label: 'Insurance Active', status: partnerData?.verifications?.insurance, icon: 'FileCheck' }
    ];

    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">Partner Profile</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit"
                    iconPosition="left"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    Edit Profile
                </Button>
            </div>
            <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                    <img
                        src={partnerData?.avatar}
                        alt={partnerData?.avatarAlt}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
                        <Icon name="Check" size={12} color="white" />
                    </div>
                </div>
                <div>
                    <h4 className="text-xl font-semibold text-text-primary">{partnerData?.name}</h4>
                    <p className="text-text-secondary">{partnerData?.email}</p>
                    <p className="text-sm text-text-secondary">{partnerData?.phone}</p>
                </div>
            </div>
            {/* Partner Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-text-primary">{partnerData?.stats?.totalDeliveries}</p>
                    <p className="text-sm text-text-secondary">Total Deliveries</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-text-primary">{partnerData?.stats?.memberSince}</p>
                    <p className="text-sm text-text-secondary">Member Since</p>
                </div>
            </div>
            {/* Verification Status */}
            <div className="mb-6">
                <h5 className="font-medium text-text-primary mb-3">Verification Status</h5>
                <div className="space-y-2">
                    {verificationItems?.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                            <div className="flex items-center space-x-2">
                                <Icon
                                    name={item?.icon}
                                    size={16}
                                    className={item?.status ? 'text-success' : 'text-muted-foreground'}
                                />
                                <span className="text-sm text-text-primary">{item?.label}</span>
                            </div>
                            <Icon
                                name={item?.status ? "CheckCircle" : "Clock"}
                                size={16}
                                className={item?.status ? 'text-success' : 'text-warning'}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Vehicle Information */}
            <div className="mb-6">
                <h5 className="font-medium text-text-primary mb-3">Vehicle Information</h5>
                <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3 mb-2">
                        <Icon name="Car" size={20} className="text-primary" />
                        <div>
                            <p className="font-medium text-text-primary">{partnerData?.vehicle?.type}</p>
                            <p className="text-sm text-text-secondary">{partnerData?.vehicle?.model}</p>
                        </div>
                    </div>
                    <p className="text-sm text-text-secondary">License: {partnerData?.vehicle?.license}</p>
                </div>
            </div>
            {/* Service Areas */}
            <div>
                <h5 className="font-medium text-text-primary mb-3">Service Areas</h5>
                <div className="flex flex-wrap gap-2">
                    {partnerData?.serviceAreas?.map((area, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                            {area}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PartnerProfileCard;