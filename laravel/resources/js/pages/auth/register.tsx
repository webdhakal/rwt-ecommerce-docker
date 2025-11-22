import GuestLayout from "@/layouts/guest-layout"
import { cn } from "@/shadcn/lib/utils"
import { Button } from "@/shadcn/ui/button"
import { Card, CardContent } from "@/shadcn/ui/card"
import { Input } from "@/shadcn/ui/input"
import { Label } from "@/shadcn/ui/label"
import { PageProps } from "@/types"
import { Link, usePage } from "@inertiajs/react"

export default function LoginPage() {
    const { appName } = usePage<PageProps>().props

    return (
        <GuestLayout>
            <section className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                <div className="max-w-7xl mx-auto">

                </div>
            </section>
        </GuestLayout>
    )
}
