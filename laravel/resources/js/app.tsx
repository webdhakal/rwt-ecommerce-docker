import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import dynamicThemes from '../../dynamic-themes.json';
import LoaderWrapper from './components/LoaderWrapper';
import { initializeTheme } from './shadcn/hooks/use-appearance';

import { useAutoLogout } from "./hooks/useAutoLogout";

function AppWrapper({ children }: { children: React.ReactNode }) {
    useAutoLogout();
    return <>{children}</>;
}


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
// const isSSR = import.meta.env.SSR

const queryClient = new QueryClient();

// configureEcho({
//     broadcaster: 'reverb',
// });

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <QueryClientProvider client={queryClient}>
                <Toaster
                    position="top-center"
                    richColors
                    closeButton
                    toastOptions={{
                        style: {
                            zIndex: 999999, // Ensure it's above other elements
                        },
                    }}
                />
                {/* <AppWrapper> */}
                <LoaderWrapper>
                    <App {...props} />
                </LoaderWrapper>
                {/* </AppWrapper> */}
            </QueryClientProvider>,
        );

        // isSSR ? hydrateRoot(el, RootComponent) : createRoot(el).render(RootComponent)
    },
    progress: { color: dynamicThemes?.default?.primaryColor || '#4B5563' },
});

// This will set light / dark mode on load...
initializeTheme();
