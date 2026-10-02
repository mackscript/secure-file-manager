import { app } from 'electron'
import path from 'node:path'
import fs from "node:fs";

import {
    encryptFile,
} from "../crypto/encryption.js";

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

export async function importFile(
    sourcePath: string,
    encryptionKey: Buffer
): Promise<string> {
    const vaultPath = getVaultPath();

    const timestamp = Date.now();

    const encryptedName = `${timestamp}.enc`;

    const destinationPath = path.join(
        vaultPath,
        encryptedName
    );

    const originalData = fs.readFileSync(
        sourcePath
    );

    const encryptedData = await encryptFile(
        originalData,
        encryptionKey
    );

    fs.writeFileSync(
        destinationPath,
        encryptedData
    );
    return encryptedName;
}