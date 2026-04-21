import * as SQLite from "expo-sqlite";
import { DATABASE_NAME } from "../helpers/contants";

export async function initDatabase(): Promise<void> {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS stock_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      quantity INTEGER DEFAULT 0,
      price REAL DEFAULT 0,
      description TEXT,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const result = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM stock_items",
  );

  if (result && result.count === 0) {
    await db.runAsync(
      "INSERT INTO stock_items (name, category, quantity, price, description) VALUES (?, ?, ?, ?, ?)",
      [
        "Porcelana Oval 10x15",
        "porcelana",
        50,
        120.0,
        "Tamanho padrão para túmulos",
      ],
    );

    await db.runAsync(
      "INSERT INTO stock_items (name, category, quantity, price, description) VALUES (?, ?, ?, ?, ?)",
      [
        "Moldura Bronze Clássica",
        "moldura",
        30,
        85.0,
        "Moldura resistente ao tempo",
      ],
    );
  }
}
