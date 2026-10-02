import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    getMessage: (): Promise<string> => {
        return ipcRenderer.invoke("get-message");
    },
    selectFile: (): Promise<string> => {
        return ipcRenderer.invoke("select-file");
    },
    importSelectedFile: (): Promise<{
        originalName: string;
        encryptedName: string;
    } | null> => {
        return ipcRenderer.invoke(
            "import-selected-file"
        );
    },
    getFiles: () => {
        return ipcRenderer.invoke("get-files");
    },
    restoreFile: (
        encryptedName: string,
        originalName: string
    ): Promise<boolean> => {
        return ipcRenderer.invoke("resotre-file", encryptedName, originalName)
    },

    deleteFile: (
        id: number,
        encryptedName: string
    ): Promise<boolean> => {
        return ipcRenderer.invoke("delete-file", id, encryptedName)
    }
});