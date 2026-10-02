type SidebarProps = {
    activeTab: string;
    onChangeTab: (tab: string) => void;
};

function Sidebar({
    activeTab,
    onChangeTab,
}: SidebarProps) {
    return (
        <aside className="sidebar">


            <div className="sidebar-logo">

                <div className="logo-icon">
                    🔐
                </div>

                <span>
                    Secure Vault
                </span>

            </div>


            <nav className="sidebar-nav">


                <button
                    className={`nav-item ${activeTab === "vault"
                        ? "active"
                        : ""
                        }`}
                    onClick={() =>
                        onChangeTab("vault")
                    }
                >
                    <span>🏠</span>
                    <span>My Vault</span>
                </button>


                <button
                    className={`nav-item ${activeTab === "files"
                        ? "active"
                        : ""
                        }`}
                    onClick={() =>
                        onChangeTab("files")
                    }
                >
                    <span>📁</span>
                    <span>Files</span>
                </button>


                <button
                    className={`nav-item ${activeTab === "backups"
                        ? "active"
                        : ""
                        }`}
                    onClick={() =>
                        onChangeTab("backups")
                    }
                >
                    <span>💾</span>
                    <span>Backups</span>
                </button>

            </nav>


            <div className="sidebar-bottom">

                <button
                    className={`nav-item ${activeTab === "settings"
                        ? "active"
                        : ""
                        }`}
                    onClick={() =>
                        onChangeTab("settings")
                    }
                >
                    <span>⚙️</span>
                    <span>Settings</span>
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;