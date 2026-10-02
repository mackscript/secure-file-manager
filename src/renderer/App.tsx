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

        await loadFiles();
    };

    const loadFiles = async () => {
        const result =
            await window.electronAPI.getFiles();

        setFiles(result);
    };


    const handleRestoreFile = async (file: VaultFile) => {
        console.log('file :>> ', file);

        const result = await window.electronAPI.restoreFile(
            file.encrypted_name,
            file.original_name

        )


        if (!result) {
            return;
        }

        await loadFiles();
    }
    const handleDeleteFile = async (file: VaultFile) => {
        try {
            const confirmed = window.confirm(
                `Delete "${file.original_name}"?`
            );
            if (!confirmed) {
                return;
            }
            const deleted =
                await window.electronAPI.deleteFile(
                    file.id,
                    file.encrypted_name
                );
            console.log('result :>> ', deleted);
            if (deleted) {
                await loadFiles()
            }
        } catch (error) {

            console.error(
                "Delete failed:",
                error
            );
        }

    }

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
                <p style={{ color: '#5b6b7e', padding: 32, textAlign: 'center', border: '2px dashed #dbe1e8', borderRadius: 10 }}>
                    No files in vault.
                </p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
                    {files.map((file) => (
                        <div
                            key={file.id}
                            style={{
                                padding: '14px 18px',
                                background: '#ffffff',
                                border: '1px solid #dbe1e8',
                                borderLeft: '4px solid #b88a2e',
                                borderRadius: 10,
                            }}
                        >
                            <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 600, color: '#16263a', overflowWrap: 'anywhere' }}>
                                {file.original_name}
                            </h3>

                            <p style={{ margin: '2px 0', fontSize: 13, color: '#5b6b7e' }}>
                                Size: {file.size} bytes
                            </p>

                            <p style={{ margin: '2px 0', fontSize: 12, color: '#5b6b7e', fontFamily: 'Consolas, Menlo, monospace', overflowWrap: 'anywhere' }}>
                                Encrypted:
                                {file.encrypted_name}
                            </p>
                            <button onClick={() => handleRestoreFile(file)}>Resore file</button>
                            <button onClick={() => handleDeleteFile(file)}>Delete file</button>

                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default App;
