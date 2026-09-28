import { app, BrowserWindow } from 'electron'
import path from "node:path"

function createWindow(): void {
    const mainwindow = new BrowserWindow({
        width: 1200,
        height: 800
    })

    mainwindow.loadFile(
        path.join(__dirname, "../renderer/index.html")
    )
}



app.whenReady().then(() => {
    createWindow()
})