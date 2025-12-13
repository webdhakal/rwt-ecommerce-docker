import { useChangePassword, useMe, useUpdateProfile } from '@/api/hooks/useAuth';
import { useLocation } from '@/api/hooks/useLocation';
import { Country, State } from '@/api/endpoints/location.api';
import { useToast } from '@/shadcn/hooks/use-toast';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { Input } from '@/shadcn/ui/input';
import { Label } from '@/shadcn/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs';
import { Calendar, Edit, Eye, EyeOff, Key, Loader2, Lock, Mail, MapPin, Phone, User } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { AvatarUploadModal } from './AvatarUploadModal';
import { UpdateProfilePayload } from '@/api/endpoints/auth.api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/ui/select';
import api from '@/api/clients/axiosClient';

interface Country {
    id: number;
    name: string;
    iso2: string;
}

interface State {
    id: number;
    name: string;
    state_code: string;
}

export default function ProfileTab() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [twoFAEnabled, setTwoFAEnabled] = useState(false);
    const [isLoading2FA, setIsLoading2FA] = useState(false);
    const [isVerifying2FA, setIsVerifying2FA] = useState(false);
    const [show2FASetup, setShow2FASetup] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [twoFASecret, setTwoFASecret] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationError, setVerificationError] = useState<string>('');
    const [backupCodes, setBackupCodes] = useState<string[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [isLoadingCountries, setIsLoadingCountries] = useState(false);
    const [isLoadingStates, setIsLoadingStates] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    // const [selectedState, setSelectedState] = useState<State | null>(null);

    // Fetch 2FA status on component mount
    useEffect(() => {
        const fetch2FAStatus = async () => {
            try {
                const response = await api.get('/api/user/two-factor-authentication');
                setTwoFAEnabled(response.data.enabled);
                if (response.data.qrCode) {
                    setQrCodeUrl(response.data.qrCode);
                    setTwoFASecret(response.data.secret);
                }
            } catch (error) {
                console.error('Error fetching 2FA status:', error);
            }
        };

        fetch2FAStatus();
    }, []);

    // Toggle 2FA
    const toggle2FA = async () => {
        if (twoFAEnabled) {
            // Disable 2FA
            try {
                setIsLoading2FA(true);
                await api.delete('/api/user/two-factor-authentication');
                setTwoFAEnabled(false);
                setShow2FASetup(false);
                setBackupCodes([]);
                toast({
                    title: 'Success',
                    description: 'Two-factor authentication has been disabled.',
                });
            } catch (error) {
                console.error('Error disabling 2FA:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to disable two-factor authentication.',
                    variant: 'destructive',
                });
            } finally {
                setIsLoading2FA(false);
            }
        } else {
            // Enable 2FA - show setup
            setShow2FASetup(true);
            if (!qrCodeUrl) {
                try {
                    const response = await api.post('/api/user/two-factor-authentication');
                    setQrCodeUrl(response.data.qrCode);
                    setTwoFASecret(response.data.secret);
                } catch (error) {
                    console.error('Error setting up 2FA:', error);
                    toast({
                        title: 'Error',
                        description: 'Failed to set up two-factor authentication.',
                        variant: 'destructive',
                    });
                }
            }
        }
    };

    // Verify 2FA code
    const verify2FACode = async () => {
        if (verificationCode.length !== 6) return;

        try {
            setIsVerifying2FA(true);
            setVerificationError('');

            const response = await api.post('/api/user/confirmed-two-factor-authentication', {
                code: verificationCode,
            });

            setTwoFAEnabled(true);
            setBackupCodes(response.data.recoveryCodes);

            toast({
                title: 'Success',
                description: 'Two-factor authentication has been enabled.',
            });
        } catch (error) {
            console.error('Error verifying 2FA code:', error);
            setVerificationError('Invalid verification code. Please try again.');
        } finally {
            setIsVerifying2FA(false);
        }
    };

    const downloadBackupCodes = useCallback(() => {
        if (backupCodes.length === 0) return;

        const blob = new Blob([backupCodes.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '2fa-backup-codes.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [backupCodes]);

    const { data: user, refetch } = useMe();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address1: '',
        address2: '',
        dob: '',
        files: user?.avatar || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        country: '',
        state: '',
    });

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                name: user?.name || '',
                email: user?.email || '',
                phone: user?.phone || '',
                files: user?.avatar || '',
            }));
        }
    }, [user]);

    const updateProfileMutation = useUpdateProfile();
    const changePasswordMutation = useChangePassword();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload: UpdateProfilePayload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address_line1: formData.address1,
            address_line2: formData.address2,
            country: formData.country,
            state: formData.state,
        };

        await updateProfileMutation.mutateAsync(payload);
        refetch();
        toast({ title: 'Profile updated!' });
    };

    const handleAvatarUpload = async (file: File) => {
        const fd = new FormData();
        fd.append('files[]', file);

        try {
            setIsLoading(true);

            const response = await updateProfileMutation.mutateAsync(fd);

            if (response?.payload?.avatar) {
                setFormData((prev) => ({
                    ...prev,
                    avatar: response.payload.avatar,
                }));
            }
            refetch();
            toast({ title: 'Profile image updated!' });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            toast({
                title: 'Error',
                description: 'New password and confirm password do not match',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);

        try {
            const { currentPassword, newPassword, confirmPassword } = formData;
            await changePasswordMutation.mutateAsync({
                old_password: currentPassword,
                new_password: newPassword,
                confirm_password: confirmPassword,
            });

            // Clear password fields on success
            setFormData((prev) => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            }));
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || error.message,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const { country, states: locationStates, isLoading: isLoadingLocation } = useLocation();
    const [selectedState, setSelectedState] = useState<State | null>(null);

    // Set the country and states when data is loaded
    useEffect(() => {
        if (country) {
            setCountries([country]);
            setSelectedCountry(country);
        }
    }, [country]);

    // Update states when they change
    useEffect(() => {
        if (locationStates && locationStates.length > 0) {
            setStates(locationStates);
        }
    }, [locationStates]);

    const handleCountryChange = (value: string) => {
        if (country && country.id.toString() === value) {
            setSelectedCountry(country);
        }
    }


    return (
        <Card className="border shadow-xl">
            <CardHeader>
                <CardTitle className="flex justify-between text-2xl">
                    <p>Manage My Account</p>
                    <div className="group relative flex items-center justify-center gap-2">
                        {user?.avatar ? (
                            <img className="h-12 w-12 rounded-full outline-2 outline-primary" src={user.avatar} alt="" />
                        ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-medium text-primary outline-2 outline-primary">
                                {user?.name
                                    ?.split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .toUpperCase()
                                    .substring(0, 2)}
                            </div>
                        )}

                        {/* Edit icon */}
                        <div
                            className="absolute z-10 hidden cursor-pointer items-center justify-center rounded-full p-1 shadow group-hover:flex"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Edit className="h-4 w-4" />
                        </div>
                    </div>
                    <AvatarUploadModal open={isModalOpen} setOpen={setIsModalOpen} onUpload={handleAvatarUpload} />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">Account Settings</h1>
                        <p className="text-muted-foreground">Manage your account settings and update your personal information</p>
                    </div>

                    <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="profile" className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>Profile</span>
                            </TabsTrigger>
                            <TabsTrigger value="password" className="flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                <span>Password</span>
                            </TabsTrigger>
                            <TabsTrigger value="twoFA" className="flex items-center gap-2">
                                <Key className="h-4 w-4" />
                                <span>2FA</span>
                            </TabsTrigger>
                        </TabsList>

                        {/* Profile Tab */}
                        <TabsContent value="profile">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Information</CardTitle>
                                    <CardDescription>Update your account's profile information.</CardDescription>
                                </CardHeader>
                                <form onSubmit={(e) => handleProfileSubmit(e, false)}>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name</Label>
                                                <div className="relative">
                                                    <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                    <Input
                                                        id="name"
                                                        className="pl-10"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <div className="relative">
                                                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        className="pl-10"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <div className="relative">
                                                    <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        className="pl-10"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="dob">Date of Birth</Label>
                                                <div className="relative">
                                                    <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                    <Input
                                                        id="dob"
                                                        type="date"
                                                        className="pl-10"
                                                        value={formData.dob}
                                                        onChange={handleInputChange}
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="address1">Address-1 </Label>
                                                <div className="relative">
                                                    <MapPin className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="address1"
                                                        className="pl-10"
                                                        value={formData.address1}
                                                        onChange={handleInputChange}
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="address2">Address-2</Label>
                                                <div className="relative">
                                                    <MapPin className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="address2"
                                                        className="pl-10"
                                                        value={formData.address2}
                                                        onChange={handleInputChange}
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="country">Country</Label>
                                                <Select
                                                    value={country?.id.toString() || ''}
                                                    onValueChange={handleCountryChange}
                                                    disabled={isLoading || isLoadingLocation}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder={
                                                            isLoadingLocation
                                                                ? 'Loading...'
                                                                : 'Select a country'
                                                        } />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {country && (
                                                            <SelectItem key={country.id} value={country.id.toString()}>
                                                                {country.name}
                                                            </SelectItem>
                                                        )}
                                                        {!isLoadingLocation && !country && (
                                                            <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                                                No countries available
                                                            </div>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="state">State/Province</Label>
                                                <Select
                                                    value={selectedState?.id.toString() || ''}
                                                    onValueChange={(value) => {
                                                        const state = states.find(s => s.id.toString() === value);
                                                        setSelectedState(state || null);
                                                    }}
                                                    disabled={isLoading || isLoadingLocation || states.length === 0}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue
                                                            placeholder={
                                                                isLoadingLocation
                                                                    ? 'Loading states...'
                                                                    : states.length === 0
                                                                        ? 'No states available'
                                                                        : 'Select a state'
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {states.map((state) => (
                                                            <SelectItem key={state.id} value={state.id.toString()}>
                                                                {state.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {isLoadingStates && (
                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Loading states...
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="mt-4" type="submit" disabled={isLoading || updateProfileMutation.isPending}>
                                            {(isLoading || updateProfileMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Save Changes
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </TabsContent>

                        {/* Password Tab */}
                        <TabsContent value="password">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Update Password</CardTitle>
                                    <CardDescription>Change your password here.</CardDescription>
                                </CardHeader>
                                <form onSubmit={(e) => handlePasswordSubmit(e, true)}>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="currentPassword">Current Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="currentPassword"
                                                    type={showCurrentPassword ? 'text' : 'password'}
                                                    value={formData.currentPassword}
                                                    onChange={handleInputChange}
                                                    className="pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                >
                                                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="newPassword">New Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="newPassword"
                                                    type={showNewPassword ? 'text' : 'password'}
                                                    value={formData.newPassword}
                                                    onChange={handleInputChange}
                                                    className="pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                >
                                                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="confirmPassword"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    value={formData.confirmPassword}
                                                    onChange={handleInputChange}
                                                    className="pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="mt-4" type="submit" disabled={isLoading || changePasswordMutation.isPending}>
                                            {(isLoading || changePasswordMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Update Password
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </TabsContent>
                        <TabsContent value="twoFA">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Two-Factor Authentication</CardTitle>
                                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div>
                                            <h4 className="font-medium">Two-Factor Authentication</h4>
                                            <p className="text-sm text-muted-foreground">{twoFAEnabled ? 'Enabled' : 'Disabled'}</p>
                                        </div>
                                        <Button variant={twoFAEnabled ? 'destructive' : 'default'} onClick={toggle2FA} disabled={isLoading2FA}>
                                            {isLoading2FA ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : twoFAEnabled ? (
                                                'Disable 2FA'
                                            ) : (
                                                'Enable 2FA'
                                            )}
                                        </Button>
                                    </div>

                                    {show2FASetup && (
                                        <div className="space-y-6 rounded-lg border p-4">
                                            <div className="space-y-2">
                                                <h4 className="font-medium">Set Up Authenticator App</h4>
                                                <p className="text-sm text-muted-foreground">Scan the QR code below with your authenticator app</p>
                                                <div className="flex justify-center py-4">
                                                    {qrCodeUrl ? (
                                                        <img src={qrCodeUrl} alt="QR Code" className="h-48 w-48" />
                                                    ) : (
                                                        <div className="flex h-48 w-48 items-center justify-center rounded-lg border-2 border-dashed">
                                                            <Loader2 className="h-8 w-8 animate-spin" />
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Or enter this code manually:{' '}
                                                    <code className="rounded bg-muted px-2 py-1 font-mono">{twoFASecret}</code>
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="verificationCode">Verification Code</Label>
                                                <div className="flex space-x-2">
                                                    <Input
                                                        id="verificationCode"
                                                        placeholder="Enter 6-digit code"
                                                        value={verificationCode}
                                                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                        maxLength={6}
                                                    />
                                                    <Button
                                                        type="button"
                                                        onClick={verify2FACode}
                                                        disabled={verificationCode.length !== 6 || isVerifying2FA}
                                                    >
                                                        {isVerifying2FA ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Verify'}
                                                    </Button>
                                                </div>
                                                {verificationError && <p className="text-sm text-destructive">{verificationError}</p>}
                                            </div>
                                        </div>
                                    )}

                                    {backupCodes.length > 0 && (
                                        <div className="space-y-4 rounded-lg border p-4">
                                            <div>
                                                <h4 className="font-medium">Backup Codes</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Save these codes in a secure place. You can use them to access your account if you lose access to
                                                    your authenticator app.
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 font-mono">
                                                {backupCodes.map((code, index) => (
                                                    <div key={index} className="rounded bg-muted p-2 text-center">
                                                        {code}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex justify-end">
                                                <Button variant="outline" size="sm" onClick={downloadBackupCodes}>
                                                    Download Codes
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </CardContent>
        </Card>
    );
}
