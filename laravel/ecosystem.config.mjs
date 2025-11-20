import { dirname } from 'path'; // Import path module
import { fileURLToPath } from 'url'; // Import required functions

const __filename = fileURLToPath(import.meta.url); // Get the current file's path
const __dirname = dirname(__filename); // Get the directory of the current file

export const apps = [
    // Use ES Module export syntax
    {
        name: 'rwt', // The name of your app
        script: 'pnpm', // The script to run (npm)
        args: 'dev', // Arguments to pass to npm
        cwd: __dirname, // Set the working directory to the current file's directory
        watch: false, // Enable watching for file changes
    },
];
