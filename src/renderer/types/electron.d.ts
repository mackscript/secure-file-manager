export { };

declare global {
    interface Window {
        electronAPI: {
            getMessage: () => Promise<string>;
            selectFile: () => Promise<
                string | null
            >;
            importSelectedFile: () => Promise<{
                originalName: string;
                encryptedName: string;
            } | null>;
            getFiles: () => Promise<
                {
                    id: number;
                    original_name: string;
                    encrypted_name: string;
                    size: number;
                    mime_type: string | null;
                    created_at: string;
                }[]
            >;
        };

    }
}