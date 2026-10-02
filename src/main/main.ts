import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initializeDatabase } from "../database/database.js";
import { getVaultPath } from "../filesystem/vault.js";
import { importFile } from "../filesystem/vault.js";
import { decryptFile, generateEncryptionKey } from "../crypto/encryption.js";
import fs from "node:fs";

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

app.whenReady().then(async () => {
    initializeDatabase();
    const sourcePath =
        "/Users/mack/Documents/suvadeep.jpeg";

    const key = generateEncryptionKey();


    const encryptedName = await importFile(
        sourcePath,
        key
    );



    const vaultPath = getVaultPath();

    const encryptedPath = path.join(
        vaultPath,
        encryptedName
    );


    const encryptedData =
        fs.readFileSync(encryptedPath)



    const decryptedData = await decryptFile(
        encryptedData
    );


    const restoredPath = path.join(
        vaultPath,
        "restored-suvadeep.jpeg"
    );

    fs.writeFileSync(
        restoredPath,
        decryptedData
    );

    console.log('restoredPath :>> ', restoredPath);
    console.log('encryptedName :>> ', encryptedName);
    console.log('vaultPath :>> ', vaultPath);
    console.log('encryptedPath :>> ', encryptedPath);
    console.log('encryptedData :>> ', encryptedData);
    createWindow();
});
