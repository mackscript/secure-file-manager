import { app } from 'electron'
import path from 'node:path'
import fs from "node:fs";

import {
    decryptFile,
    encryptFile,
} from "../crypto/encryption.js";
import { file } from 'bun';

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
    );

    fs.writeFileSync(
        destinationPath,
        encryptedData
    );
    return encryptedName;
}

export async function restoreFile(
    encryptedName: string,
    destinationPath: string
): Promise<void> {

    // vault folder path 
    const vaultPath = getVaultPath()

    // vault folder path -> full url 
    const encryptedPath = path.join(
        vaultPath,
        encryptedName
    )


    if (!fs.existsSync(encryptedPath)) {
        throw new Error(
            "Encrypted file does not exist"
        );
    }

    // read file 
    const encryptedData = fs.readFileSync(encryptedPath)


    // 
    const decryptedData = await decryptFile(
        encryptedData
    );


    //  save decrypted  file
    fs.writeFileSync(
        destinationPath,
        decryptedData
    );


    console.log(
        "File decrypted successfully:"
    );

    console.log(
        "Restored to:",
        destinationPath
    );
}


export function deleteVaultFile(
    encryptedName: string
): void {

    const vaultPath = getVaultPath()

    const encryptedPath = path.join(
        vaultPath,
        encryptedName
    )

    if (!fs.existsSync(encryptedPath)) {
        throw new Error(
            "Encrypted file does not exist"
        );
    }

    fs.unlinkSync(encryptedPath);



    console.log(
        "Encrypted file deleted:",
        encryptedName
    );
}

