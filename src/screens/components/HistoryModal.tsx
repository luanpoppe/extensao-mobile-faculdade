import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { History } from 'lucide-react-native';
import { Theme } from '../../theme/theme';
import { stockRepository } from '../../database/repository';
import type { StockHistoryEntry } from '../../types/stock';
import { styles } from './HistoryModal.styles';

type HistoryModalProps = {
  visible: boolean;
  onClose: () => void;
};

function formatWhen(iso: string): string {
  const d = new Date(iso.includes('T') ? iso : iso.replace(' ', 'T'));
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Formato gerado pelo repositório: `Item cadastrado: {nome} · {qtd} un. · {categoria}` */
function parseCadastroMessage(message: string): {
  itemName: string;
  quantity: string;
  category: string;
} | null {
  const m = message.match(/^Item cadastrado: (.+) · (\d+) un\. · (.+)$/);
  if (!m) return null;
  return {
    itemName: m[1].trim(),
    quantity: m[2],
    category: m[3].trim(),
  };
}

export function HistoryModal({ visible, onClose }: HistoryModalProps) {
  const [entries, setEntries] = useState<StockHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const list = await stockRepository.getStockHistory();
        if (!cancelled) setEntries(list);
      } catch (e) {
        console.error('History load error:', e);
        if (!cancelled) setEntries([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityLabel="Fechar ao tocar fora"
        />
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Histórico do estoque</Text>
          <Text style={styles.modalSubtitle}>
            Cadastros e movimentações recentes
          </Text>

          {loading ? (
            <View style={{ alignItems: 'center', paddingVertical: Theme.spacing.lg }}>
              <ActivityIndicator color={Theme.colors.primary} />
              <Text style={[styles.loadingText, { marginTop: Theme.spacing.sm }]}>
                Carregando…
              </Text>
            </View>
          ) : entries.length === 0 ? (
            <Text style={styles.emptyText}>
              Nenhum registro ainda. Cadastre um item em “Novo Item” para ver o histórico aqui.
            </Text>
          ) : (
            <ScrollView
              style={{ maxHeight: 360 }}
              nestedScrollEnabled
              showsVerticalScrollIndicator
              contentContainerStyle={styles.listContent}
              keyboardShouldPersistTaps="handled"
            >
              {entries.map((entry) => {
                const parsed = parseCadastroMessage(entry.message);
                return (
                  <View key={entry.id} style={styles.row}>
                    <View style={styles.rowIcon}>
                      <History size={18} color={Theme.colors.primary} />
                    </View>
                    <View style={styles.rowBody}>
                      {parsed ? (
                        <>
                          <Text style={styles.rowKind}>Cadastro</Text>
                          <Text style={styles.rowItemName} numberOfLines={3}>
                            {parsed.itemName}
                          </Text>
                          <View style={styles.rowMetaRow}>
                            <View style={styles.qtyBadge}>
                              <Text style={styles.qtyNumber}>{parsed.quantity}</Text>
                              <Text style={styles.qtyUnitLabel}>unidades</Text>
                            </View>
                            <View style={styles.categoryPill}>
                              <Text style={styles.categoryPillText}>{parsed.category}</Text>
                            </View>
                          </View>
                        </>
                      ) : (
                        <Text style={styles.rowMessage}>{entry.message}</Text>
                      )}
                      <Text style={styles.rowDate}>{formatWhen(entry.createdAt)}</Text>
                    </View>
                  </View>
                );
              })}
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
