import React from 'react';

const App = () => {
    const handleGetMessage = async () => {
        const message = await window.electronAPI.getMessage();

        console.log(message);
    };

    return (
        <div>
            <h1>Secure File Vault</h1>

            <button onClick={handleGetMessage}>
                Test Electron IPC
            </button>
        </div>
    );
}

export default App;
