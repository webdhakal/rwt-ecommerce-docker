<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        return Inertia::render('auth/register');
    }

    public function login(Request $request)
    {
        return Inertia::render('auth/login');
    }

    public function forgotPassword(Request $request)
    {
        return Inertia::render('auth/forgot-password');
    }

    public function verifyOtp(Request $request)
    {
        return Inertia::render('auth/verify-otp');
    }

    public function setPassword(Request $request)
    {
        return Inertia::render('auth/set-password');
    }

    public function resetPassword(Request $request)
    {
        return Inertia::render('auth/reset-password');
    }
}
