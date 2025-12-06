import { AboutData } from '@/MOCK_DATA';
import { cn } from '@/shadcn/lib/utils';
import { Button } from '@/shadcn/ui/button';
import { Input } from '@/shadcn/ui/input';
import { BsSend } from 'react-icons/bs';
import img4 from '../../../../public/images/bannerImages/img4.png';

const NewsLetterSection = ({ className }: { className?: string }) => {
    return (
        <div className={cn('mt-24 mb-12 overflow-hidden rounded-2xl bg-green-50 px-8 py-12 dark:bg-black', className)}>
            <div className="flex items-center justify-between">
                <div className="w-[600px]">
                    <h2 className="text-center text-2xl font-bold text-slate-900 md:text-left md:text-3xl lg:text-4xl dark:text-slate-400">
                        {AboutData.newsletter.heading}
                    </h2>
                    <p className="font-secondary mt-4 text-center text-slate-500 md:text-left">
                        {AboutData.newsletter.description} <span className="text-green-600">{AboutData.newsletter.martName}</span>
                    </p>
                    <div className="mt-8 flex w-full max-w-md items-center gap-2 rounded-3xl bg-white pl-2 dark:bg-black dark:ring-1 dark:ring-slate-700">
                        <BsSend className="ml-2 hidden text-3xl lg:block" />
                        <Input
                            placeholder="Your email address"
                            className="placeholder:font-secondary border-none py-5 shadow-none placeholder:text-sm focus:border-transparent focus:ring-0 focus:outline-none focus-visible:border-transparent focus-visible:ring-0 focus-visible:outline-none"
                            inputParentClassName="border-none shadow-none"
                        />

                        <Button className="rounded-3xl bg-primary p-6 hover:bg-green-600">{AboutData.newsletter.buttonText}</Button>
                    </div>
                </div>
                <div>
                    {/* // this image here can be sent from through pageProps for each page from the backend. (for
          now fetched from /public/images/bannerImages) */}
                    <img src={img4} className="hidden size-[250px] lg:block" />
                </div>
            </div>
        </div>
    );
};

export default NewsLetterSection;
