import Database from "better-sqlite3";
import path from "node:path";
import { app } from "electron";

let db: Database.Database;

export function initializeDatabase(): void {
    const userDataPath = app.getPath("userData");

    const databasePath = path.join(
        userDataPath,
        "vault.db"
    );

    db = new Database(databasePath);
    createTables()
    console.log("SQLite database connected:");
    console.log(databasePath);
}

function createTables(): void {
    db.exec(`
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      original_name TEXT NOT NULL,
      encrypted_name TEXT NOT NULL,
      size INTEGER NOT NULL,
      mime_type TEXT,
      created_at TEXT NOT NULL
    );
  `);

    console.log("Database tables initialized");
}