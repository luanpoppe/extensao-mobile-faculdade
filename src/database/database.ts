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
    CREATE TABLE IF NOT EXISTS stock_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stock_item_id INTEGER NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const result = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM stock_items",
  );

  if (result && result.count === 0) {
    const r1 = await db.runAsync(
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
      "INSERT INTO stock_history (stock_item_id, message) VALUES (?, ?)",
      [
        Number(r1.lastInsertRowId),
        "Item cadastrado: Porcelana Oval 10x15 · 50 un. · Porcelana",
      ],
    );

    const r2 = await db.runAsync(
      "INSERT INTO stock_items (name, category, quantity, price, description) VALUES (?, ?, ?, ?, ?)",
      [
        "Moldura Bronze Clássica",
        "moldura",
        30,
        85.0,
        "Moldura resistente ao tempo",
      ],
    );

    await db.runAsync(
      "INSERT INTO stock_history (stock_item_id, message) VALUES (?, ?)",
      [
        Number(r2.lastInsertRowId),
        "Item cadastrado: Moldura Bronze Clássica · 30 un. · Moldura",
      ],
    );
  }

  const histCount = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM stock_history",
  );
  if (histCount && histCount.count === 0) {
    const existing = await db.getAllAsync<{
      id: number;
      name: string;
      category: string;
      quantity: number;
    }>("SELECT id, name, category, quantity FROM stock_items");
    for (const row of existing) {
      const label = row.category === "porcelana" ? "Porcelana" : "Moldura";
      await db.runAsync(
        "INSERT INTO stock_history (stock_item_id, message) VALUES (?, ?)",
        [
          row.id,
          `Item cadastrado: ${row.name} · ${row.quantity} un. · ${label}`,
        ],
      );
    }
  }
}
