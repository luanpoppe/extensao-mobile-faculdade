import React, { useMemo } from 'react';
import { View, Text, Modal, ScrollView, Pressable } from 'react-native';
import { computeStockReport, formatCurrencyBrl } from '../../helpers/stockReport';
import type { StockItem } from '../../types/stock';
import { styles } from './ReportsModal.styles';

type ReportsModalProps = {
  visible: boolean;
  onClose: () => void;
  items: StockItem[];
};

export function ReportsModal({ visible, onClose, items }: ReportsModalProps) {
  const report = useMemo(() => computeStockReport(items), [items]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.modalTitle}>Relatório do estoque</Text>
          <Text style={styles.modalSubtitle}>
            Resumo com base nos itens cadastrados e nos preços unitários informados.
          </Text>

          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.kpiRow}>
              <View style={styles.kpiBox}>
                <Text style={styles.kpiLabel}>Itens</Text>
                <Text style={styles.kpiValue}>{report.itemCount}</Text>
              </View>
              <View style={styles.kpiBox}>
                <Text style={styles.kpiLabel}>Unidades</Text>
                <Text style={styles.kpiValue}>{report.totalUnits}</Text>
              </View>
            </View>

            <View style={styles.kpiBox}>
              <Text style={styles.kpiLabel}>Valor estimado (qtd × preço)</Text>
              <Text style={styles.kpiValueMoney}>{formatCurrencyBrl(report.estimatedValue)}</Text>
            </View>

            <Text style={styles.sectionTitle}>Por categoria</Text>

            {[report.porcelana, report.moldura].map((cat) => (
              <View key={cat.label} style={styles.catCard}>
                <Text style={styles.catCardHeader}>{cat.label}</Text>
                <View style={styles.catRow}>
                  <Text style={styles.catRowLabel}>Produtos diferentes</Text>
                  <Text style={styles.catRowValue}>{cat.lines}</Text>
                </View>
                <View style={styles.catRow}>
                  <Text style={styles.catRowLabel}>Unidades em estoque</Text>
                  <Text style={styles.catRowValue}>{cat.units}</Text>
                </View>
                <View style={styles.catRow}>
                  <Text style={styles.catRowLabel}>Valor estimado</Text>
                  <Text style={styles.catRowValue}>{formatCurrencyBrl(cat.value)}</Text>
                </View>
              </View>
            ))}

            <Text style={styles.footnote}>
              O valor é uma estimativa (preço × quantidade por item). Ajuste preços nos cadastros
              para manter o relatório alinhado à realidade.
            </Text>
          </ScrollView>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
