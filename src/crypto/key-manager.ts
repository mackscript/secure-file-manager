import keytar from "keytar";

const SERVICE_NAME = "SecureFileVault";
const ACCOUNT_NAME = "EncryptionKey";

export async function saveEncryptionKey(
    key: Buffer
): Promise<void> {
    await keytar.setPassword(
        SERVICE_NAME,
        ACCOUNT_NAME,
        key.toString("base64")
    );
}

export async function getEncryptionKey(): Promise<
    Buffer | null
> {
    const storedKey =
        await keytar.getPassword(
            SERVICE_NAME,
            ACCOUNT_NAME
        );

    if (!storedKey) {
        return null;
    }

    return Buffer.from(
        storedKey,
        "base64"
    );
}