import { app } from 'electron'
import path from 'node:path'
import fs from "node:fs";


export function getVaultPath(): string {

    const userDataPath = app.getPath("userData")

    const vaultPath = path.join(
        userDataPath,
        "vault"
    )

    if (!fs.existsSync(vaultPath)) {
        fs.mkdirSync(vaultPath, {
            recursive: true,
        });
    }

    return vaultPath;

}

export function importFile(
    sourcePath: string
): string {

    const vaultPath = getVaultPath()
    const originalName = path.basename(sourcePath);
    const timestamp = Date.now();
    const encryptedName = `${timestamp}.enc`;

    const destinationPath = path.join(
        vaultPath,
        encryptedName
    );
    fs.copyFileSync(
        sourcePath,
        destinationPath
    );

    console.log("File imported:");
    console.log("Original:", originalName);
    console.log("Stored as:", encryptedName);
    console.log('destinationPath :>> ', destinationPath);

    return encryptedName;

}