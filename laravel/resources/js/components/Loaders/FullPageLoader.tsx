import { useLoader } from '@/hooks/LoaderProvider';

const FullPageLoader = () => {
    const loading = useLoader();

    if (!loading) return null;

    return (
        <div className="bg-opacity-50 absolute inset-0 z-9999 flex items-center justify-center bg-white">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
        </div>
    );
};

export default FullPageLoader;
