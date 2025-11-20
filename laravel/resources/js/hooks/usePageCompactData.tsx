import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

export function usePageCompactData(): PageProps['compact'] | undefined {
    const { page } = usePage<PageProps>().props;

    return page?.compact;
}
