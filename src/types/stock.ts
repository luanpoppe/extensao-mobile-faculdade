export interface StockItem {
  id: number;
  name: string;
  category: 'porcelana' | 'moldura';
  quantity: number;
  price: number;
  description: string;
  lastUpdated: string;
}
