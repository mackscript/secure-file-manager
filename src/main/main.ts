import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
        path.join(__dirname, "../../src/renderer/index.html")
    );
}

app.whenReady().then(() => {
    createWindow();
});