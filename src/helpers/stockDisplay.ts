import type { StockCategory } from '../types/stock';

export function categoryLabel(c: StockCategory): string {
  return c === 'porcelana' ? 'Porcelana' : 'Moldura';
}

export function lowStockQuantityPhrase(qty: number): string {
  if (qty <= 0) return 'Sem unidades em estoque';
  if (qty === 1) return 'Resta apenas 1 unidade';
  return `Restam apenas ${qty} unidades`;
}
