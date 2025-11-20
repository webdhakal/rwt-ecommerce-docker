import GuestLayout from '@/layouts/guest-layout'
import { Head } from '@inertiajs/react'

const Wishlist = () => {
    return (
        <GuestLayout>
            <Head title="Wishlist" />

            <section className="px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    Wishlst
                </div>
            </section>
        </GuestLayout>
    )
}

export default Wishlist