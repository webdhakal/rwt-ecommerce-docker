import GuestLayout from '@/layouts/guest-layout';
import { cn } from '@/shadcn/lib/utils';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent } from '@/shadcn/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/shadcn/ui/field';
import { Input } from '@/shadcn/ui/input';
import { Checkbox } from '@/shadcn/ui/checkbox';
// 👇 Import the necessary Inertia and React hooks
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';

// Import the Eye icons for password visibility and the loader
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company_name: string;
    address: string;
    password: string;
    password_confirmation: string;
    terms: boolean;
    // Add showPassword to state to manage visibility, mirroring the user register component
    showPassword: boolean;
}

export default function VendorRegister() {
    // Get appName (assuming you might need it for dynamic text, though it's less critical here)
    const { appName } = usePage().props as { appName: string };

    // 1. Integrate useForm and state management with the added 'showPassword' field
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company_name: '',
        address: '',
        password: '',
        password_confirmation: '',
        terms: false,
        showPassword: false, // For password visibility toggle
    });

    // Reset password fields on component mount/unmount for security
    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    // 2. Handle Form Submission
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Adjust the route to match your existing post route
        post(route('vendor.register'));
    };

    // Toggle password visibility function
    const togglePasswordVisibility = () => {
        setData('showPassword', !data.showPassword);
    };

    return (
        <GuestLayout>
            <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <div className="max-w-7xl mx-auto">
                    <div className={cn('flex flex-col gap-6 justify-center items-center')}>
                        <Card className="overflow-hidden p-0 w-full max-w-4xl">
                            <CardContent className="grid p-0 md:grid-cols-2">
                                {/* Form Section */}
                                <form onSubmit={handleSubmit} className="p-6 md:p-8">
                                    <FieldGroup>
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <h1 className="text-2xl font-bold">Register as a Vendor</h1>
                                            <p className="text-sm text-balance text-muted-foreground">
                                                Enter your business details below to create your {appName} Vendor account
                                            </p>
                                        </div>

                                        {/* Name Fields (Grid layout for first/last name) */}
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* First Name */}
                                            <Field>
                                                <FieldLabel htmlFor="first_name">First Name</FieldLabel>
                                                <Input
                                                    id="first_name"
                                                    type="text"
                                                    placeholder="John"
                                                    value={data.first_name}
                                                    onChange={(e) => setData('first_name', e.target.value)}
                                                    required
                                                    autoFocus
                                                />
                                                {errors.first_name && <p className="mt-1 text-sm text-destructive">{errors.first_name}</p>}
                                            </Field>
                                            {/* Last Name */}
                                            <Field>
                                                <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
                                                <Input
                                                    id="last_name"
                                                    type="text"
                                                    placeholder="Doe"
                                                    value={data.last_name}
                                                    onChange={(e) => setData('last_name', e.target.value)}
                                                    required
                                                />
                                                {errors.last_name && <p className="mt-1 text-sm text-destructive">{errors.last_name}</p>}
                                            </Field>
                                        </div>

                                        {/* Email Field */}
                                        <Field>
                                            <FieldLabel htmlFor="email">Email</FieldLabel>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="m@example.com"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                                        </Field>

                                        {/* Phone Field */}
                                        <Field>
                                            <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="98XXXXXXXXX"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                required
                                            />
                                            {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
                                        </Field>

                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Company Name Field */}
                                            <Field>
                                                <FieldLabel htmlFor="company_name">Company Name</FieldLabel>
                                                <Input
                                                    id="company_name"
                                                    type="text"
                                                    placeholder="Acme Corp"
                                                    value={data.company_name}
                                                    onChange={(e) => setData('company_name', e.target.value)}
                                                    required
                                                />
                                                {errors.company_name && <p className="mt-1 text-sm text-destructive">{errors.company_name}</p>}
                                            </Field>

                                            {/* Address Field */}
                                            <Field>
                                                <FieldLabel htmlFor="address">Business Address</FieldLabel>
                                                <Input
                                                    id="address"
                                                    type="text"
                                                    placeholder="123 Commerce St"
                                                    value={data.address}
                                                    onChange={(e) => setData('address', e.target.value)}
                                                    required
                                                />
                                                {errors.address && <p className="mt-1 text-sm text-destructive">{errors.address}</p>}
                                            </Field>
                                        </div>

                                        {/* Password Fields (Grid layout for password/confirmation) */}
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Password */}
                                            <Field>
                                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                                <div className="relative">
                                                    <Input
                                                        id="password"
                                                        type={data.showPassword ? 'text' : 'password'}
                                                        value={data.password}
                                                        onChange={(e) => setData('password', e.target.value)}
                                                        required
                                                        className="pr-10"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={togglePasswordVisibility}
                                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                                        aria-label={data.showPassword ? 'Hide password' : 'Show password'}
                                                    >
                                                        {data.showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>

                                            </Field>

                                            {/* Confirm Password */}
                                            <Field>
                                                <FieldLabel htmlFor="password_confirmation">Confirm Password</FieldLabel>
                                                <div className="relative">
                                                    <Input
                                                        id="password_confirmation"
                                                        type={data.showPassword ? 'text' : 'password'}
                                                        value={data.password_confirmation}
                                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={togglePasswordVisibility}
                                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                                        aria-label={data.showPassword ? 'Hide password' : 'Show password'}
                                                    >
                                                        {data.showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            </Field>
                                            {/* Consolidated error display for passwords */}
                                            {(errors.password || errors.password_confirmation) &&
                                                <p className="col-span-2 mt-1 text-sm text-destructive">{errors.password || errors.password_confirmation}</p>
                                            }
                                        </div>

                                        {/* Terms Checkbox */}
                                        <Field>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="terms"
                                                    checked={data.terms}
                                                    onCheckedChange={(checked) => setData('terms', checked as boolean)}
                                                    required
                                                />
                                                <FieldLabel htmlFor="terms" className="!mt-0 text-sm font-normal">
                                                    I agree to the{' '}
                                                    <a href="#" className="text-primary underline-offset-4 hover:underline">
                                                        Terms of Service
                                                    </a>{' '}
                                                    and{' '}
                                                    <a href="#" className="text-primary underline-offset-4 hover:underline">
                                                        Privacy Policy
                                                    </a>
                                                </FieldLabel>
                                            </div>
                                            {errors.terms && <p className="mt-1 text-sm text-destructive">{errors.terms}</p>}
                                        </Field>

                                        {/* Submit Button */}
                                        <Field>
                                            <Button type="submit" className="w-full" disabled={processing}>
                                                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                                {processing ? 'Registering...' : 'Register as Vendor'}
                                            </Button>
                                        </Field>

                                        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">Or</FieldSeparator>

                                        {/* Sign In Link */}
                                        <p className="mt-4 text-center text-sm">
                                            Already have an account?{' '}
                                            {/* Note: I'm assuming 'login' route is available */}
                                            <Link href={route('login')} className="underline underline-offset-4 hover:text-primary">
                                                Sign in
                                            </Link>
                                        </p>
                                    </FieldGroup>
                                </form>

                                {/* Image Section (Mirroring user register) */}
                                <div className="relative hidden bg-muted md:block">
                                    <img
                                        src="/placeholder.svg" // Replace with a vendor/business-themed image
                                        alt="Vendor Registration Image"
                                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <FieldDescription className="px-6 text-center">
                            By clicking continue, you confirm you are registering a business account.
                        </FieldDescription>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}