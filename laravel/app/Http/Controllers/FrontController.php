<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontController extends Controller
{
    public function home()
    {
        return Inertia::render('home/index');
    }

    public function shoppingCart()
    {
        return Inertia::render('shopping-cart/index');
    }

    public function vendorStore()
    {
        return Inertia::render('vendor-store/index');
    }

    public function checkoutProcess()
    {
        return Inertia::render('checkout-process/index');
    }

    public function productListing()
    {
        return Inertia::render('product-listing/index');
    }

    public function productDetails()
    {
        return Inertia::render('product-detail/index');
    }

    public function orderTracking()
    {
        return Inertia::render('order-tracking/index');
    }

    public function faqs()
    {
        return Inertia::render('faqs/index');
    }

    public function wishlist()
    {
        return Inertia::render('wishlist/index');
    }

    public function cart()
    {
        return Inertia::render('cart/index');
    }

    public function userDashboard()
    {
        return Inertia::render('user-dashboard/index');
    }

    public function deliveryPartnerHub()
    {
        return Inertia::render('delivery-partner-hub/index');
    }
}
