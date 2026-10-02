import crypto from "node:crypto";

import {
    RawAesKeyringNode,
    RawAesWrappingSuiteIdentifier,
    buildClient,
    CommitmentPolicy,
} from "@aws-crypto/client-node";

export function generateEncryptionKey(): Buffer {
    return crypto.randomBytes(32);
}

const keyName = "SecureFileVaultKey";
const keyNamespace = "SecureFileVault";

const wrappingSuite =
    RawAesWrappingSuiteIdentifier.AES256_GCM_IV12_TAG16_NO_PADDING;

// We will keep ONE keyring instance for now.
let currentKeyring: RawAesKeyringNode | null = null;

export function createKeyring(
    encryptionKey: Buffer
): RawAesKeyringNode {

    console.log(
        "Creating keyring:",
        encryptionKey.length
    );

    currentKeyring = new RawAesKeyringNode({
        keyName,
        keyNamespace,
        unencryptedMasterKey: encryptionKey,
        wrappingSuite,
    });

    return currentKeyring;
}

export function getKeyring(): RawAesKeyringNode {

    if (!currentKeyring) {
        throw new Error(
            "Encryption keyring has not been initialized"
        );
    }

    return currentKeyring;
}

export const {
    encrypt,
    decrypt,
} = buildClient(
    CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT
);

export async function encryptFile(
    fileData: Buffer,
    encryptionKey: Buffer
): Promise<Buffer> {

    const keyring = createKeyring(
        encryptionKey
    );

    const { result } = await encrypt(
        keyring,
        fileData
    );

    return result;
}

export async function decryptFile(
    encryptedData: Buffer
): Promise<Buffer> {

    const keyring = getKeyring();

    const { plaintext } = await decrypt(
        keyring,
        encryptedData
    );

    return Buffer.from(plaintext);
}