class Logger {
    private env: string;

    constructor() {
        this.env = import.meta.env.VITE_APP_ENV || 'production';
    }

    private isDev() {
        return this.env === 'development';
    }

    log(...args: unknown[]) {
        if (this.isDev()) {
            console.log(...args);
        }
    }

    error(...args: unknown[]) {
        if (this.isDev()) {
            console.error(...args);
        }
    }

    warn(...args: unknown[]) {
        if (this.isDev()) {
            console.warn(...args);
        }
    }

    info(...args: unknown[]) {
        if (this.isDev()) {
            console.info(...args);
        }
    }
}

export const logger = new Logger();
