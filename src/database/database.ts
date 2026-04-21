import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'artes_foto_bahia.db';

export interface StockItem {
  id: number;
  name: string;
  category: 'porcelana' | 'moldura';
  quantity: number;
  price: number;
  description: string;
  lastUpdated: string;
}

export const initDatabase = async () => {
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

  // Insert initial data if empty
  const result = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM stock_items');
  if (result && result.count === 0) {
    await db.runAsync(
      'INSERT INTO stock_items (name, category, quantity, price, description) VALUES (?, ?, ?, ?, ?)',
      ['Porcelana Oval 10x15', 'porcelana', 50, 120.00, 'Tamanho padrão para túmulos']
    );
    await db.runAsync(
      'INSERT INTO stock_items (name, category, quantity, price, description) VALUES (?, ?, ?, ?, ?)',
      ['Moldura Bronze Clássica', 'moldura', 30, 85.00, 'Moldura resistente ao tempo']
    );
  }

  return db;
};

export const getStockSummary = async () => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const porcelanas = await db.getFirstAsync<{ total: number }>(
    "SELECT SUM(quantity) as total FROM stock_items WHERE category = 'porcelana'"
  );
  const molduras = await db.getFirstAsync<{ total: number }>(
    "SELECT SUM(quantity) as total FROM stock_items WHERE category = 'moldura'"
  );
  
  return {
    porcelanas: porcelanas?.total || 0,
    molduras: molduras?.total || 0,
  };
};
