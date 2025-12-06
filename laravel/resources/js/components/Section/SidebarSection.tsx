import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/shadcn/lib/utils';
import { CheckboxWithLabel } from '@/shadcn/ui/checkbox';
import { Separator } from '@/shadcn/ui/separator';
import { ShopPageFilters } from '@/types/MockData';
import { Link } from '@inertiajs/react';
import { SetStateAction } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

interface SidebarSectionProps {
    setFilterDetails?: React.Dispatch<SetStateAction<{}>>;
    isBlogPage?: boolean;
    className?: string;
    firstPage?: boolean;
    filters: ShopPageFilters;
}

const SidebarSection = ({ setFilterDetails, isBlogPage = false, className, firstPage, filters }: SidebarSectionProps) => {
    const { callbackRef, isVisible } = useIntersectionObserver();

    // If used on blog pages, render only blog-specific sections.
    if (isBlogPage) {
        return (
            <div ref={callbackRef} className={cn('w-full space-y-5', isVisible && firstPage && 'animate-slideInFromRight', className)}>
                {/* Categories */}
                <div className="shadow-4 hidden w-full flex-col gap-4 rounded-md border p-4 md:flex">
                    <h1 className="text-xl font-bold">Categories</h1>
                    <Separator className="-mt-2 bg-primary" />
                    <div className="flex max-h-[400px] flex-col gap-4 overflow-y-auto">
                        {filters.categories.map((category, index) => (
                            <div className="flex items-center gap-2" key={`${index}-${category}`}>
                                <CheckboxWithLabel label={category.name} count={category.numberOfItems} />
                            </div>
                        ))}
                    </div>
                    <span className="cursor-pointer text-xs font-bold text-primary">Show more</span>
                </div>

                {/* Popular Tags */}
                <div className="shadow-4 hidden w-full flex-col gap-2 rounded-md border p-4 md:flex">
                    <h1 className="text-xl font-bold">Popular Tags</h1>
                    <Separator className="bg-primary" />
                    <div className="flex flex-wrap gap-2">
                        {filters.tags.map((item, index) => (
                            <div
                                className="font-secondary flex items-center gap-2 rounded-2xl border border-slate-400 p-2 text-xs"
                                key={`${index}-${item}`}
                            >
                                <MdOutlineCancel />
                                <Link href={'#'}>{item.title}</Link>
                            </div>
                        ))}
                    </div>
                    <span className="cursor-pointer text-xs font-bold text-primary">Show more</span>
                </div>

                {/* Gallery */}
                <div className="shadow-4 hidden w-full flex-col gap-2 rounded-md border p-4 md:flex">
                    <h1 className="text-xl font-bold">Gallery</h1>
                    <Separator className="bg-primary" />
                    <div className="grid grid-cols-3 gap-2">
                        {filters.gallery.map((item, index) => (
                            <Link href={item.href} key={`${index}-${item}`}>
                                <img src={item.image} alt={item.name} className="size-16" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
};

export default SidebarSection;
