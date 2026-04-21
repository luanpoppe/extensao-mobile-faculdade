import React from 'react';
import { View, Text } from 'react-native';
import { Theme } from '../../theme/theme';
import type { StockItem } from '../../types/stock';
import { styles } from './RegisteredItemsList.styles';

const categoryLabel: Record<StockItem['category'], string> = {
  porcelana: 'Porcelana',
  moldura: 'Moldura',
};

const formatBrl = (value: number) =>
  `R$ ${value.toFixed(2).replace('.', ',')}`;

type RegisteredItemsListProps = {
  items: StockItem[];
};

export function RegisteredItemsList({ items }: RegisteredItemsListProps) {
  return (
    <View>
      <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
        Itens cadastrados
      </Text>
      {items.length === 0 ? (
        <Text style={styles.emptyListText}>
          Nenhum item ainda. Use &quot;Novo Item&quot; para adicionar.
        </Text>
      ) : (
        items.map((item) => (
          <View
            key={item.id}
            style={[styles.stockItemCard, Theme.shadows.light]}
          >
            <View style={styles.stockItemMain}>
              <Text style={styles.stockItemName}>{item.name}</Text>
              <Text style={styles.stockItemLine}>
                {categoryLabel[item.category]} · {item.quantity}{' '}
                {item.quantity === 1 ? 'unidade' : 'unidades'} ·{' '}
                {formatBrl(item.price)}
              </Text>
              {item.description ? (
                <Text style={styles.stockItemDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              ) : null}
            </View>
          </View>
        ))
      )}
    </View>
  );
}
