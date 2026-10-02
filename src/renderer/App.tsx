import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar.tsx";
import Header from "./components/Header.tsx";
import FilesPage from "./components/FilesPage";
import "./styles/app.scss";

type VaultFile = {
    id: number;
    original_name: string;
    encrypted_name: string;
    size: number;
    mime_type: string | null;
    created_at: string;
};

function App() {
    const [activeTab, setActiveTab] =
        useState("vault");

    const [files, setFiles] = useState<VaultFile[]>(
        []
    );

    const loadFiles = async () => {
        const result =
            await window.electronAPI.getFiles();

        setFiles(result);
    };

    const handleImportFile = async () => {
        const result =
            await window.electronAPI.importSelectedFile();

        if (!result) {
            return;
        }

        await loadFiles();
    };

    const handleRestore = async (
        file: VaultFile
    ) => {
        try {
            const restored =
                await window.electronAPI.restoreFile(
                    file.encrypted_name,
                    file.original_name
                );

            if (restored) {
                console.log(
                    "File restored successfully"
                );
            }
        } catch (error) {
            console.error(
                "Restore failed:",
                error
            );
        }
    };

    const handleDelete = async (
        file: VaultFile
    ) => {
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

            if (deleted) {
                await loadFiles();
            }

        } catch (error) {
            console.error(
                "Delete failed:",
                error
            );
        }
    };

    useEffect(() => {
        loadFiles();
    }, []);

    return (
        <div className="app">

            <Sidebar
                activeTab={activeTab}
                onChangeTab={setActiveTab}
            />

            <main className="main-content">

                <Header />
                {activeTab === "files" ? (
                    <FilesPage
                        files={files}
                        onRestore={handleRestore}
                        onDelete={handleDelete}
                    />) : (
                    <section className="content">

                        <div className="content-top">

                            <div>
                                <h2>
                                    Your Files
                                </h2>

                                <p>
                                    {files.length} encrypted file
                                    {files.length !== 1
                                        ? "s"
                                        : ""}
                                </p>
                            </div>

                            <button
                                className="import-button"
                                onClick={handleImportFile}
                            >
                                + Import File
                            </button>

                        </div>

                        <div className="files-container">

                            {files.length === 0 ? (
                                <div className="empty-state">

                                    <div className="empty-icon">
                                        🔐
                                    </div>

                                    <h3>
                                        Your vault is empty
                                    </h3>

                                    <p>
                                        Import a file to securely
                                        encrypt and store it.
                                    </p>

                                    <button
                                        className="import-button"
                                        onClick={handleImportFile}
                                    >
                                        + Import Your First File
                                    </button>

                                </div>
                            ) : (
                                <div className="file-list">

                                    {files.map((file) => (
                                        <div
                                            className="file-card"
                                            key={file.id}
                                        >

                                            <div className="file-icon">
                                                📄
                                            </div>

                                            <div className="file-info">

                                                <h3>
                                                    {file.original_name}
                                                </h3>

                                                <p>
                                                    {file.size} bytes
                                                </p>

                                            </div>

                                            <div className="file-security">
                                                🔒
                                            </div>

                                            <div className="file-actions">

                                                <button
                                                    onClick={() =>
                                                        handleRestore(file)
                                                    }
                                                >
                                                    Restore
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(file)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </div>
                                    ))}

                                </div>
                            )}

                        </div>

                    </section>)}


            </main>

        </div>
    );
}

export default App;