import { useQuery } from '@tanstack/react-query';
import { getBanners, getSiteSetting } from '../endpoints/site-setting';


export const useBanner = () => {
    return useQuery({
        queryKey: ['banners', ],
        queryFn: () => getBanners().then(res => res?.payload),
    });
};

export const useSiteSetting =() =>{
    return useQuery({
        queryKey: ['site-setting', ],
        queryFn: () => getSiteSetting().then(res => res?.payload),
    })
}   