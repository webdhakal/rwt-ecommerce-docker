import { useEffect } from "react";
import { toast } from "sonner";

export function useAutoLogout() {
    useEffect(() => {
        const expiresAt = localStorage.getItem("expiresAt");
        if (!expiresAt) return;

        const expiryTime = new Date(expiresAt).getTime();
        const now = Date.now();

        const remaining = expiryTime - now;

        if (remaining <= 0) {
            handleLogout("Your session has expired");
            return;
        }

        const timer = setTimeout(() => {
            handleLogout("Your session has expired");
        }, remaining);

        return () => clearTimeout(timer);
    }, []);
}

function handleLogout(message: string) {
    toast.error(message);

    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiresAt");

    window.location.href = "/login";
}
