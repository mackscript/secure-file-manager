export { };

declare global {
    interface Window {
        electronAPI: {
            getMessage: () => Promise<string>;
        };
    }
}