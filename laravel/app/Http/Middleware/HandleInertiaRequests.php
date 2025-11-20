<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }

    private function getMenus($slug = 'primary-menu')
    {
        return Cache::rememberForever("menu_cache_{$slug}", function () use ($slug) {
            // return Menu::whereSlug($slug)->value('content');
        });
    }

    private function getHeaderCategories()
    {
        return Cache::remember('header_categories', now()->addMinutes(10), function () {
            // return Category::query()
            //     ->with('subcategories')
            //     ->where('status', 1)
            //     ->whereNull('parent_id')
            //     ->inRandomOrder()
            //     ->take(6)
            //     ->get()
            //     ->map(function ($category) {
            //         return [
            //             'id'   => $category->uuid,
            //             'name' => $category->name,
            //             'href' => $category->slug,
            //             'submenu' => $category?->subcategories->map(function ($subCategory) {
            //                 return [
            //                     'id'   => $subCategory->uuid,
            //                     'name' => $subCategory->name,
            //                     'href' => $subCategory->slug
            //                 ];
            //             })
            //         ];
            //     });
        });
    }
}
