<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FrontController;
use Illuminate\Support\Facades\Route;

/*--------------------------------------------------------------------------------------------------------------------
||||||||||||||||||||||||||||||||||||||||||||||||||||| PUBLIC PAGES ||||||||||||||||||||||||||||||||||||||||||||||||||
--------------------------------------------------------------------------------------------------------------------*/

Route::get('/', [FrontController::class, 'home'])->name('home');
Route::get('/faqs', [FrontController::class, 'faqs'])->name('faqs');







/*--------------------------------------------------------------------------------------------------------------------
|||||||||||||||||||||||||||||||||||||||||||||||||||||||| PRODUCTS |||||||||||||||||||||||||||||||||||||||||||||||||||
--------------------------------------------------------------------------------------------------------------------*/
Route::get('/product-listing', [FrontController::class, 'productListing'])->name('product-listing');
Route::get('/product/{slug}', [FrontController::class, 'productDetails'])->name('product-detail');





/*--------------------------------------------------------------------------------------------------------------------
|||||||||||||||||||||||||||||||||||||||||||||||||||||| CARTS |||||||||||||||||||||||||||||||||||||||||||||||||||||||||
--------------------------------------------------------------------------------------------------------------------*/
Route::get('/shopping-cart', [FrontController::class, 'shoppingCart'])->name('shopping-cart');





/*--------------------------------------------------------------------------------------------------------------------
|||||||||||||||||||||||||||||||||||||||||||||||| ORDERS AND CHECKOUT |||||||||||||||||||||||||||||||||||||||||||||||||
--------------------------------------------------------------------------------------------------------------------*/
Route::get('/order-tracking', [FrontController::class, 'orderTracking'])->name('order-tracking');
Route::get('/checkout-process', [FrontController::class, 'checkoutProcess'])->name('checkout-process');






/*--------------------------------------------------------------------------------------------------------------------
|||||||||||||||||||||||||||||||||||||||||||||||| VENDOR STORE ||||||||||||||||||||||||||||||||||||||||||||||||||||||||
--------------------------------------------------------------------------------------------------------------------*/
Route::get('/vendor-store', [FrontController::class, 'vendorStore'])->name('vendor-store');







/*--------------------------------------------------------------------------------------------------------------------
|||||||||||||||||||||||||||||||||||||||||||||||| CART & WISHLIST |||||||||||||||||||||||||||||||||||||||||||||||||||||
--------------------------------------------------------------------------------------------------------------------*/
Route::get('/wishlist', [FrontController::class, 'wishlist'])->name('wishlist');
Route::get('/cart', [FrontController::class, 'cart'])->name('cart');






/*--------------------------------------------------------------------------------------------------------------------
|||||||||||||||||||||||||||||||||||||||||||||||| USER DASHBOARD |||||||||||||||||||||||||||||||||||||||||||||||||||||
--------------------------------------------------------------------------------------------------------------------*/
Route::get('/dashboard', [FrontController::class, 'userDashboard'])->name('dashboard');




/*--------------------------------------------------------------------------------------------------------------------
|||||||||||||||||||||||||||||||||||||||||||||||| AUTH ROUTES ||||||||||||||||||||||||||||||||||||||||||||||||||||||||
--------------------------------------------------------------------------------------------------------------------*/
Route::get('/register', [AuthController::class, 'register'])->name('register');
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::get('forgot-password', [AuthController::class, 'forgotPassword'])->name('forgot-password');
Route::get('/verify-otp-for-password', [AuthController::class, 'verifyPasswordResetOtp'])->name('verify-password-reset-otp');
Route::get('/verify-otp', [AuthController::class, 'verifyOtp'])->name('verify-otp');
Route::get('/resend-otp', [AuthController::class, 'resendOtp'])->name('resend-otp');
Route::get('/set-password', [AuthController::class, 'setPassword'])->name('set-password');
Route::get('/reset-password', [AuthController::class, 'resetPassword'])->name('reset-password');
Route::get('/change-password', [AuthController::class, 'changePassword'])->name('change-password');
Route::get('/update-profile', [AuthController::class, 'updateProfile'])->name('update-profile');


/*--------------------------------------------------------------------------------------------------------------------
|||||||||||||||||||||||||||||||||||||||||||||||| DELIVERY PARTNER HUB |||||||||||||||||||||||||||||||||||||||||||||||||
--------------------------------------------------------------------------------------------------------------------*/

Route::get('/delivery-partner-hub', [FrontController::class, 'deliveryPartnerHub'])->name('delivery-partner-hub');
