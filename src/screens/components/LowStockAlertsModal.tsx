import React from 'react';
import { View, Text, Modal, ScrollView, Pressable, StyleSheet } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { categoryLabel, lowStockQuantityPhrase } from '../../helpers/stockDisplay';
import { Theme } from '../../theme/theme';
import type { StockItem } from '../../types/stock';
import { styles } from './LowStockAlertsModal.styles';

type LowStockAlertsModalProps = {
  visible: boolean;
  onClose: () => void;
  items: StockItem[];
  threshold: number;
};

export function LowStockAlertsModal({
  visible,
  onClose,
  items,
  threshold,
}: LowStockAlertsModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityLabel="Fechar ao tocar fora"
        />
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Alertas de baixo estoque</Text>
          <Text style={styles.modalSubtitle}>
            Itens com {threshold} unidades ou menos. Revise o pedido ou reposição.
          </Text>

          {items.length === 0 ? (
            <Text style={styles.emptyText}>
              Nenhum item nesta condição. O estoque está acima do limite de alerta.
            </Text>
          ) : (
            <ScrollView
              style={{ maxHeight: 360 }}
              nestedScrollEnabled
              showsVerticalScrollIndicator
              contentContainerStyle={styles.listContent}
              keyboardShouldPersistTaps="handled"
            >
              {items.map((item) => (
                <View key={item.id} style={styles.row}>
                  <View style={{ marginRight: Theme.spacing.sm, marginTop: 2 }}>
                    <AlertTriangle size={20} color={Theme.colors.danger} />
                  </View>
                  <View style={styles.rowBody}>
                    <Text style={styles.rowName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={styles.rowStockLine}>
                      {lowStockQuantityPhrase(item.quantity)}
                    </Text>
                    <View style={styles.rowMeta}>
                      <View style={styles.categoryPill}>
                        <Text style={styles.categoryText}>{categoryLabel(item.category)}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
