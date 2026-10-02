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
});