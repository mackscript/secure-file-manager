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

export function insertFileMetadata(
  originalName: string,
  encryptedName: string,
  size: number,
  mimeType: string | null
): void {
  const statement = db.prepare(`
    INSERT INTO files (
      original_name,
      encrypted_name,
      size,
      mime_type,
      created_at
    )
    VALUES (
      @originalName,
      @encryptedName,
      @size,
      @mimeType,
      @createdAt
    )
  `);

  statement.run({
    originalName,
    encryptedName,
    size,
    mimeType,
    createdAt: new Date().toISOString(),
  });

  console.log("File metadata saved to SQLite");
}

export function getAllFiles() {
  const statement = db.prepare(`
    SELECT
      id,
      original_name,
      encrypted_name,
      size,
      mime_type,
      created_at
    FROM files
    ORDER BY id DESC
  `);

  return statement.all();
}