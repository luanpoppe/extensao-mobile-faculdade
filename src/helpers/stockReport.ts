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

export function formatCurrencyBrl(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

/** Texto plano para compartilhar (WhatsApp, e-mail, etc.). */
export function buildStockShareText(
  items: StockItem[],
  summary: { porcelanas: number; molduras: number },
  lowStockCount: number,
  threshold: number,
  appVersion: string
): string {
  const r = computeStockReport(items);
  return [
    'Artes Foto Bahia — Resumo do estoque',
    `App v${appVersion}`,
    '',
    `Itens cadastrados: ${r.itemCount}`,
    `Total de unidades: ${r.totalUnits}`,
    `Porcelanas: ${summary.porcelanas} un. | Molduras: ${summary.molduras} un.`,
    `Valor estimado: ${formatCurrencyBrl(r.estimatedValue)}`,
    '',
    `Alertas de baixo estoque (≤${threshold} un.): ${lowStockCount} item(ns)`,
  ].join('\n');
}
