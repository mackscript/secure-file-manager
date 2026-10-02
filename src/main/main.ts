import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initializeDatabase } from "../database/database.js";
import { getVaultPath } from "../filesystem/vault.js";
import { importFile } from "../filesystem/vault.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


ipcMain.handle("get-message", () => {
    return "Hello from Main Process";
});

function createWindow(): void {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,

        webPreferences: {
            preload: path.join(
                __dirname,
                "../preload/preload.cjs"
            ),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    mainWindow.loadFile(
        path.join(__dirname, "../renderer/index.html")
    );
}

app.whenReady().then(() => {
    initializeDatabase();
    const vaultPath = getVaultPath()
    importFile(
        "/Users/mack/Documents/mack.jpeg"
    );
    createWindow();
});
