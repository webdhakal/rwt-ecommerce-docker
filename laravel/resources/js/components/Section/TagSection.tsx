import { TrendingSearchData as tags } from '@/MOCK_DATA';
import { Link } from '@inertiajs/react';

const TagSection = () => {
    return (
        <div className="z-99999 container">
            {/* <DefaultSectionTitle title="trending tags" subtitle="Makes easy to know our products" /> */}
            <div className="flex flex-wrap gap-2">
                {tags.map((item, _) => (
                    <Link
                        href={item.href}
                        key={_}
                        className="flex-center text-2xsm rounded-lg bg-gray-200 px-2 py-1 hover:bg-primary/50 dark:bg-black"
                    >
                        {item.title}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TagSection;
