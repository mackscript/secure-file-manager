import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    getMessage: (): Promise<string> => {
        return ipcRenderer.invoke("get-message");
    },
});