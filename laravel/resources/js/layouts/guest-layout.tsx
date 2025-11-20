import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContactButton from "@/components/Common/FloatingContactButton";
import ScrollToTop from "@/components/ScrollToTop";

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
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    return (
        <div className="min-h-screen" {...props}>
            <Header ref={headerRef} />

            <main
                className="min-h-screen"
                style={{ marginTop: headerHeight }}
            >
                {children}
            </main>

            <Footer />
            <FloatingContactButton onContact={() => { }} />
            <ScrollToTop />
        </div>
    );
}
