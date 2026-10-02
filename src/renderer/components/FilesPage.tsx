type VaultFile = {
    id: number;
    original_name: string;
    encrypted_name: string;
    size: number;
    mime_type: string | null;
    created_at: string;
};

type FilesPageProps = {
    files: VaultFile[];
    onRestore: (file: VaultFile) => void;
    onDelete: (file: VaultFile) => void;
};

function FilesPage({
    files,
    onRestore,
    onDelete,
}: FilesPageProps) {
    return (
        <section className="content">

            <div className="content-top">

                <div>
                    <h2>
                        All Files
                    </h2>

                    <p>
                        {files.length} encrypted file
                        {files.length !== 1
                            ? "s"
                            : ""}
                    </p>
                </div>

            </div>


            {files.length === 0 ? (
                <div className="empty-state">

                    <div className="empty-icon">
                        📁
                    </div>

                    <h3>
                        No files found
                    </h3>

                    <p>
                        Your vault does not contain
                        any encrypted files yet.
                    </p>

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
                                        onRestore(file)
                                    }
                                >
                                    Restore
                                </button>

                                <button
                                    onClick={() =>
                                        onDelete(file)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </section>
    );
}

export default FilesPage;