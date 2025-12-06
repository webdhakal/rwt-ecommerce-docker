import FloatingContactButton from '@/components/Common/FloatingContactButton';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

interface GuestLayoutProps {
    children: ReactNode;
}

export default function GuestLayout({ children, ...props }: GuestLayoutProps) {
    const headerRef = useRef<HTMLElement>(null);
    const [headerHeight, setHeaderHeight] = useState(0);

    useLayoutEffect(() => {
        function updateHeight() {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.offsetHeight);
            }
        }

        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    return (
        <div {...props}>
            <Header ref={headerRef} />

            <main style={{ marginTop: headerHeight }}>{children}</main>

            <Footer />
            <FloatingContactButton onContact={() => {}} />
            <ScrollToTop />
        </div>
    );
}
