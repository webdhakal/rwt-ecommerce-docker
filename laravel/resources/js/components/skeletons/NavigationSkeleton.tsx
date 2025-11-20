const NavigationSkeleton = () => {
    const skeletonItems = Array.from({ length: 5 });

    return (
        <div className="hidden border-b border-secondary lg:block">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex animate-pulse items-center justify-between py-3">
                    {/* Left side (categories) */}
                    <div className="flex items-center space-x-8">
                        {/* All Categories dropdown placeholder */}
                        <div className="h-5 w-28 rounded bg-muted"></div>

                        {/* Category buttons placeholders */}
                        {skeletonItems.map((_, idx) => (
                            <div key={idx} className="h-5 w-20 rounded bg-muted"></div>
                        ))}
                    </div>

                    {/* Right side (deals & vendors) */}
                    <div className="flex items-center space-x-6">
                        <div className="h-5 w-24 rounded bg-muted"></div>
                        <div className="h-5 w-28 rounded bg-muted"></div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default NavigationSkeleton;
