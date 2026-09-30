import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    ping: (): string => "pong",
    getMessase: () => {
        return ipcRenderer.invoke('get-message')
    }
});