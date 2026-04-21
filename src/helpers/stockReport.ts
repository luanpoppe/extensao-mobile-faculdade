import type {
  CategoryReportSlice,
  StockCategory,
  StockItem,
  StockReport,
} from '../types/stock';

function computeCategoryReportSlice(
  items: StockItem[],
  category: StockCategory,
  label: string
): CategoryReportSlice {
  const rows = items.filter((i) => i.category === category);
  let units = 0;
  let value = 0;
  for (const r of rows) {
    units += r.quantity;
    value += r.quantity * r.price;
  }
  return { label, lines: rows.length, units, value };
}

export function computeStockReport(items: StockItem[]): StockReport {
  return {
    itemCount: items.length,
    totalUnits: items.reduce((s, i) => s + i.quantity, 0),
    estimatedValue: items.reduce((s, i) => s + i.quantity * i.price, 0),
    porcelana: computeCategoryReportSlice(items, 'porcelana', 'Porcelanas'),
    moldura: computeCategoryReportSlice(items, 'moldura', 'Molduras'),
  };
}
