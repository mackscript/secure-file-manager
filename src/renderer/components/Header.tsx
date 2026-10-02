function Header() {
    return (
        <header className="header">

            <div>
                <h1>
                    My Vault
                </h1>

                <p>
                    Your encrypted files
                </p>
            </div>

            <div className="header-actions">

                <div className="security-status">
                    <span className="status-dot"></span>

                    Vault Protected
                </div>

            </div>

        </header>
    );
}

export default Header;