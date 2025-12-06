import { Filters } from '@/types/MockData';
import { SetStateAction } from 'react';

export const useSorting = (initialParams: Filters, setParams: React.Dispatch<SetStateAction<Filters>>) => {
    const sort = (column: string) => {
        setParams((prevParams) => ({
            ...prevParams,
            col: column,
            sort: prevParams.sort ? (prevParams.sort === 'asc' ? 'desc' : 'asc') : 'asc',
        }));
    };

    return { sort };
};
