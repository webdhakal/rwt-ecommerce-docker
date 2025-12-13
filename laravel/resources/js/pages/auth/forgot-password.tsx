// ForgetPassword.tsx

'use client';

import GuestLayout from '@/layouts/guest-layout';
import { toast } from '@/shadcn/hooks/use-toast';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// Hooks
import { useForgotPassword } from '@/api/hooks/useAuth';

// ShadCN UI Components
import { Alert, AlertDescription, AlertTitle } from '@/shadcn/ui/alert';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { Input } from '@/shadcn/ui/input';
import { Label } from '@/shadcn/ui/label';
import { CheckCircle, Loader2, Mail } from 'lucide-react';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const forgotPasswordMutation = useForgotPassword();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast({
                title: 'Error',
                description: 'Email is required',
                variant: 'destructive',
            });
            return;
        }
        forgotPasswordMutation.mutate({ email });
    };

    return (
        // Wrap the content with the common GuestLayout
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mx-auto w-full max-w-md p-4 sm:p-6 lg:p-8">
                <Card className="shadow-2xl">
                    <CardHeader className="space-y-1 text-center">
                        <Mail className="mx-auto mb-2 h-10 w-10 text-primary" />
                        <CardTitle className="text-2xl">Forgot Your Password?</CardTitle>
                        <CardDescription>Enter your email address below to receive a password reset link.</CardDescription>
                    </CardHeader>

                    <CardContent>
                        {success ? (
                            <Alert className="border-green-400 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                <CheckCircle className="h-4 w-4" />
                                <AlertTitle>Success!</AlertTitle>
                                <AlertDescription>Password reset link has been sent to your email. Please check your inbox.</AlertDescription>
                            </Alert>
                        ) : (
                            <div className="space-y-6">
                                <p className="text-sm text-muted-foreground">
                                    No problem. We will email you a password reset link that will allow you to choose a new one.
                                </p>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        placeholder="you@example.com"
                                        autoComplete="username"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={forgotPasswordMutation.isPending}
                                        autoFocus
                                    />
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="mt-2 space-y-6">
                            {!success && (
                                <Button type="submit" className="w-full" disabled={forgotPasswordMutation.isPending}>
                                    {forgotPasswordMutation.isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Password Reset Link'
                                    )}
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
