import * as SQLite from 'expo-sqlite';
import { DATABASE_NAME } from '../helpers/contants';
import type { InsertStockItemDto, StockCategory, StockItem } from '../types/stock';

export type StockSummary = {
  porcelanas: number;
  molduras: number;
};

export class StockRepository {
  private openDb() {
    return SQLite.openDatabaseAsync(DATABASE_NAME);
  }

  async getAllStockItems(): Promise<StockItem[]> {
    const db = await this.openDb();
    const rows = await db.getAllAsync<{
      id: number;
      name: string;
      category: string;
      quantity: number;
      price: number;
      description: string | null;
      last_updated: string;
    }>(
      `SELECT id, name, category, quantity, price, description, last_updated
       FROM stock_items
       ORDER BY category, name COLLATE NOCASE`
    );
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      category: row.category as StockCategory,
      quantity: row.quantity,
      price: row.price,
      description: row.description ?? '',
      lastUpdated: row.last_updated,
    }));
  }

  async getStockSummary(): Promise<StockSummary> {
    const db = await this.openDb();
    const porcelanas = await db.getFirstAsync<{ total: number }>(
      "SELECT SUM(quantity) as total FROM stock_items WHERE category = 'porcelana'"
    );
    const molduras = await db.getFirstAsync<{ total: number }>(
      "SELECT SUM(quantity) as total FROM stock_items WHERE category = 'moldura'"
    );

    return {
      porcelanas: porcelanas?.total ?? 0,
      molduras: molduras?.total ?? 0,
    };
  }

  async insertStockItem(dto: InsertStockItemDto): Promise<void> {
    const { name, category, quantity, price, description } = dto;
    const db = await this.openDb();
    await db.runAsync(
      'INSERT INTO stock_items (name, category, quantity, price, description) VALUES (?, ?, ?, ?, ?)',
      [name, category, quantity, price, description]
    );
  }
}

export const stockRepository = new StockRepository();
