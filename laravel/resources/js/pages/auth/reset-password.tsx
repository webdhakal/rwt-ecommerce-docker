'use client';

import { useState } from 'react';
import { useResetPassword } from '@/api/hooks/useAuth';
import { toast } from '@/shadcn/hooks/use-toast';
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { Input } from "@/shadcn/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shadcn/ui/input-otp";
import GuestLayout from "@/layouts/guest-layout";
import { Loader2, Eye, EyeOff } from "lucide-react";
// import { useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
    // const searchParams = useSearchParams();
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const resetPasswordMutation = useResetPassword();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp.length !== 6) {
            toast({
                title: 'Error',
                description: 'Please enter a valid 6-digit OTP',
                variant: 'destructive'
            });
            return;
        }

        if (password.length < 8) {
            toast({
                title: 'Error',
                description: 'Password must be at least 8 characters long',
                variant: 'destructive'
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: 'Error',
                description: 'Passwords do not match',
                variant: 'destructive'
            });
            return;
        }

        try {
            await resetPasswordMutation.mutateAsync({
                otp,
                password,
                password_confirmation: confirmPassword
            });

            toast({
                title: 'Success',
                description: 'Your password has been reset successfully. Redirecting to login...',
                variant: 'default'
            });

            // Redirect to login after a short delay
            setTimeout(() => {
                window.location.href = route('login');
            }, 2000);
        } catch (error) {
            console.error('Password reset failed:', error);
        }
    };

    return (
        <GuestLayout>
            <section className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                <div className="max-w-md mx-auto">
                    <Card>
                        <CardHeader className="text-center space-y-1">
                            <CardTitle className="text-2xl">Reset Your Password</CardTitle>
                            <CardDescription>Enter the verification code and your new password</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="otp" className="text-sm font-medium leading-none">
                                        Verification Code
                                    </label>
                                    <div className="flex justify-center">
                                        <InputOTP
                                            maxLength={6}
                                            value={otp}
                                            onChange={setOtp}
                                            disabled={resetPasswordMutation.isPending}
                                            className="justify-center"
                                        >
                                            <InputOTPGroup className="gap-2">
                                                {[...Array(6)].map((_, i) => (
                                                    <InputOTPSlot
                                                        key={i}
                                                        index={i}
                                                        className="w-12 h-12 text-lg border-border"
                                                    />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                    <p className="text-sm text-muted-foreground text-center">
                                        Enter the 6-digit code sent to your email.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium leading-none">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={resetPasswordMutation.isPending}
                                            className="pr-10"
                                            minLength={8}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            onClick={() => setShowPassword(!showPassword)}
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Password must be at least 8 characters long
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            disabled={resetPasswordMutation.isPending}
                                            className="pr-10"
                                            minLength={8}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            tabIndex={-1}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={
                                        resetPasswordMutation.isPending ||
                                        otp.length !== 6 ||
                                        !password ||
                                        password !== confirmPassword
                                    }
                                >
                                    {resetPasswordMutation.isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Resetting Password...
                                        </>
                                    ) : (
                                        'Reset Password'
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </GuestLayout>
    );
}