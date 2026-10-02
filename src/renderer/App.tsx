import React, { useEffect, useState } from 'react';

import './style/index.css';


type VaultFile = {
    id: number;
    original_name: string;
    encrypted_name: string;
    size: number;
    mime_type: string | null;
    created_at: string;
};
const App = () => {
    const [files, setFiles] = useState<VaultFile[]>([])
    const handleSelectFile = async () => {
        const result = await window.electronAPI.importSelectedFile();

        if (!result) {
            console.log("File selection cancelled");
            return;
        }

        console.log(
            "Original file:",
            result.originalName
        );

        console.log(
            "Encrypted file:",
            result.encryptedName
        );
    };

    const loadFiles = async () => {
        const result =
            await window.electronAPI.getFiles();

        setFiles(result);
    };

    useEffect(() => {
        loadFiles()

    }, []);
    console.log('files :>> ', files);
    return (
        <div>
            <h1>Secure File Vault</h1>

            <button
                onClick={handleSelectFile}
            >
                Select File
            </button>
            {files.length === 0 ? (
                <p>No files in vault.</p>
            ) : (
                <div>
                    {files.map((file) => (
                        <div key={file.id}>
                            <h3>
                                {file.original_name}
                            </h3>

                            <p>
                                Size: {file.size} bytes
                            </p>

                            <p>
                                Encrypted:
                                {file.encrypted_name}
                            </p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default App;
