import { FilterState } from '@/types/Sidebar';

export function queryParamsBuilder(filters: FilterState): string {
    const data: string[] = ['search_type=advance'];

    (Object.keys(filters) as (keyof FilterState)[]).forEach((key) => {
        const value = filters[key];

        if (Array.isArray(value)) {
            value.forEach((innerItem, index) => {
                data.push(`filters[${key}][${index}]=${innerItem}`);
            });
        } else if (value && typeof value === 'object') {
            Object.entries(value).forEach(([innerKey, innerValue]) => {
                data.push(`filters[${key}][${innerKey}]=${innerValue}`);
            });
        } else if (typeof value === 'string') {
            data.push(`filters[${key}]=${value}`);
        }
    });

    return data.join('&');
}
