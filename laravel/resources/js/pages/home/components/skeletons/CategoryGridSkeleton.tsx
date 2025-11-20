const CategoryGridSkeleton = () => {
    const skeletonItems = Array.from({ length: 6 });
    return (
        <section className="animate-pulse py-8 lg:py-12">
            <div className="mb-8">
                <div className="mb-2 h-6 w-48 rounded bg-muted"></div>
                <div className="h-4 w-72 rounded bg-muted"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
                {skeletonItems.map((_, idx) => (
                    <div key={idx} className="bg-surface relative overflow-hidden rounded-lg border border-border">
                        {/* Image placeholder */}
                        <div className="relative h-32 bg-muted sm:h-40 lg:h-32"></div>

                        {/* Info placeholder */}
                        <div className="space-y-2 p-3 lg:p-4">
                            <div className="h-4 w-24 rounded bg-muted"></div>
                            <div className="h-3 w-full rounded bg-muted"></div>
                            <div className="h-3 w-3/4 rounded bg-muted"></div>
                            <div className="flex items-center justify-between pt-2">
                                <div className="h-3 w-16 rounded bg-muted"></div>
                                <div className="h-3 w-3 rounded-full bg-muted"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <div className="mx-auto h-4 w-40 rounded bg-muted"></div>
            </div>
        </section>
    );
};

export default CategoryGridSkeleton;
