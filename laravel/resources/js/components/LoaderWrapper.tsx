import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';

const LoaderWrapper = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const onStart = () => setIsLoading(true);
        const onFinish = () => setIsLoading(false);
        const onError = () => setIsLoading(false);

        const unsubscribeStart = router.on('start', onStart);
        const unsubscribeFinish = router.on('finish', onFinish);
        const unsubscribeError = router.on('error', onError);

        return () => {
            unsubscribeStart();
            unsubscribeFinish();
            unsubscribeError();
        };
    }, []);

    return (
        <>
            {isLoading && (
                <div className="bg-opacity-50 fixed inset-0 z-[60] flex items-center justify-center bg-black">
                    <LoadingScreen text="Loading..." />
                </div>
            )}
            {children}
        </>
    );
};

export default LoaderWrapper;
