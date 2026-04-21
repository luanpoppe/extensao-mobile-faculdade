import * as SQLite from 'expo-sqlite';
import { DATABASE_NAME } from '../helpers/contants';
import type { InsertStockItemDto } from '../types/stock';

export type StockSummary = {
  porcelanas: number;
  molduras: number;
};

export class StockRepository {
  private openDb() {
    return SQLite.openDatabaseAsync(DATABASE_NAME);
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
