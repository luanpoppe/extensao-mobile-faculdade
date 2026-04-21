export type StockCategory = "porcelana" | "moldura";

export interface StockItem {
  id: number;
  name: string;
  category: StockCategory;
  quantity: number;
  price: number;
  description: string;
  lastUpdated: string;
}

export type InsertStockItemDto = Omit<StockItem, "id" | "lastUpdated">;

export type StockHistoryEntry = {
  id: number;
  stockItemId: number;
  message: string;
  createdAt: string;
};

export type CategoryReportSlice = {
  label: string;
  lines: number;
  units: number;
  value: number;
};

export type StockReport = {
  itemCount: number;
  totalUnits: number;
  estimatedValue: number;
  porcelana: CategoryReportSlice;
  moldura: CategoryReportSlice;
};
