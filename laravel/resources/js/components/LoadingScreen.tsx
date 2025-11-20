import { cn } from '@/shadcn/lib/utils';

type Props = {
    className?: string;
    image?: string;
    imageClassName?: string;
    text: string;
};

const LoadingScreen = ({ className, image, imageClassName, text }: Props) => {
    return (
        <div className={cn('inset-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black/50 backdrop-blur-sm', className)}>
            {image && <img src={image} alt="Loading" className={cn('h-[150px] w-[150px] object-cover', imageClassName)} />}
            <div className="loader mb-4"></div>
            <p className="text-white">{text}</p>
        </div>
    );
};

export default LoadingScreen;
