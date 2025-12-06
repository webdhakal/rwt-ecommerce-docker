const CategoryBanner = ({ category, searchQuery }) => {
    const categoryBanners = {
        Electronics: {
            image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=300&fit=crop',
            title: 'Electronics & Gadgets',
            description: 'Discover the latest in technology and innovation',
        },
        Clothing: {
            image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?w=1200&h=300&fit=crop',
            title: 'Fashion & Clothing',
            description: 'Style that speaks to you',
        },
        'Home & Garden': {
            image: 'https://images.pixabay.com/photo/2017/03/28/12/11/chairs-2181947_1280.jpg?w=1200&h=300&fit=crop',
            title: 'Home & Garden',
            description: 'Transform your living space',
        },
        Sports: {
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=300&fit=crop',
            title: 'Sports & Fitness',
            description: 'Gear up for your active lifestyle',
        },
    };

    const defaultBanner = {
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=300&fit=crop',
        title: 'Shop Everything',
        description: "Find exactly what you're looking for",
    };

    const bannerData = categoryBanners?.[category] || defaultBanner;

    if (searchQuery) {
        return (
            <div className="relative h-32 overflow-hidden bg-gradient-to-r from-accent to-accent/80 lg:h-48">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative flex h-full items-center justify-center px-4 text-center">
                    <div>
                        <h1 className="mb-2 text-2xl font-bold text-white lg:text-4xl">Search Results</h1>
                        <p className="text-sm text-white/90 lg:text-base">Showing results for "{searchQuery}"</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-32 overflow-hidden lg:h-48">
            <img src={bannerData?.image} alt={bannerData?.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                <div>
                    <h1 className="mb-2 text-2xl font-bold text-white lg:text-4xl">{bannerData?.title}</h1>
                    <p className="text-sm text-white/90 lg:text-base">{bannerData?.description}</p>
                </div>
            </div>
        </div>
    );
};

export default CategoryBanner;
