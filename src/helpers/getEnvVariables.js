export const getEnvVariables = () => {

    // NOTE: Se comenta porque tiene problemas con vite. De momento se exportarán manualmente.
    // import.meta.env;

    return {
        // ...import.meta.env
        VITE_APP_URL: import.meta.env.VITE_APP_URL,
        VITE_MODE: import.meta.env.VITE_MODE
    };

};