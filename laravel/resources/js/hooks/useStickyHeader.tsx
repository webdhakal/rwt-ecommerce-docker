import { useEffect, useRef, useState } from 'react';

export const useStickyHeader = () => {
    const [showStickyHeader, setShowStickyHeader] = useState(false);
    const [isTopOfWindow, setIsTopOfWindow] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 50) {
                setShowStickyHeader(false);
                setIsTopOfWindow(true);
            } else {
                setIsTopOfWindow(false);
                // this is 50% right now can be made to 30% also.
                if (currentScrollY >= (5 / 10) * window.innerHeight) {
                    // down
                    if (currentScrollY > lastScrollY.current) {
                        setShowStickyHeader(false);
                        // up
                    } else if (currentScrollY < lastScrollY.current) {
                        setShowStickyHeader(true);
                        // just let the user decide to show or to hide.
                        // setTimeout(() => {
                        //   setShowStickyHeader(false)
                        // }, 4000)
                    }
                }
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return { showStickyHeader, isTopOfWindow };
};
