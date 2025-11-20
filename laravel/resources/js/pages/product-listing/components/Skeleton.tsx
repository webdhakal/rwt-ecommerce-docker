import { Skeleton } from '@/shadcn/ui/skeleton';

export default function SkeletonProductListingBrowse() {
    const productSkeletonCount = 8;

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(productSkeletonCount)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-4 rounded-lg border border-zinc-700 p-4">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
            ))}
        </div>
    );
}
