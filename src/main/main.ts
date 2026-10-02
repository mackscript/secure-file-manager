import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAllFiles, initializeDatabase, insertFileMetadata } from "../database/database.js";
import { getVaultPath } from "../filesystem/vault.js";
import { importFile } from "../filesystem/vault.js";
import { decryptFile, generateEncryptionKey } from "../crypto/encryption.js";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let encryptionKey: Buffer;

ipcMain.handle("get-message", () => {
    return "Hello from Main Process";
});



ipcMain.handle("select-file", async () => {

    const result = await dialog.showOpenDialog({
        properties: [
            "openFile"
        ]
    });
    if (result.canceled) {
        return null;
    }
    return result.filePaths[0];


});


ipcMain.handle("import-selected-file", async () => {
    const result = await dialog.showOpenDialog({
        properties: [
            "openFile"
        ]
    })

    if (result.canceled) {
        return null;
    }

    const sourcePath = result.filePaths[0]
    const fileStats =
        fs.statSync(sourcePath);

    const encryptedName = await importFile(
        sourcePath,
        encryptionKey
    )
    const originalName =
        path.basename(sourcePath);

    insertFileMetadata(
        originalName,
        encryptedName,
        fileStats.size,
        null
    );

    return {
        originalName,
        encryptedName,
    };

});

ipcMain.handle(
    "get-files",
    () => {
        return getAllFiles();
    }
);


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

    encryptionKey = generateEncryptionKey();
    getVaultPath();


    // const encryptedName = await importFile(
    //     sourcePath,
    //     key
    // );



    // const vaultPath = getVaultPath();

    // const encryptedPath = path.join(
    //     vaultPath,
    //     encryptedName
    // );


    // const encryptedData =
    //     fs.readFileSync(encryptedPath)



    // const decryptedData = await decryptFile(
    //     encryptedData
    // );


    // const restoredPath = path.join(
    //     vaultPath,
    //     "restored-suvadeep.jpeg"
    // );

    // fs.writeFileSync(
    //     restoredPath,
    //     decryptedData
    // );

    // console.log('restoredPath :>> ', restoredPath);
    // console.log('encryptedName :>> ', encryptedName);
    // console.log('vaultPath :>> ', vaultPath);
    // console.log('encryptedPath :>> ', encryptedPath);
    // console.log('encryptedData :>> ', encryptedData);
    createWindow();
});
