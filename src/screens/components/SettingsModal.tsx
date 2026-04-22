import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  Pressable,
  Share,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';
import { RefreshCw, Share2 } from 'lucide-react-native';
import { buildStockShareText } from '../../helpers/stockReport';
import { Theme } from '../../theme/theme';
import type { StockItem } from '../../types/stock';
import { styles } from './SettingsModal.styles';

type SettingsModalProps = {
  visible: boolean;
  onClose: () => void;
  items: StockItem[];
  summary: { porcelanas: number; molduras: number };
  lowStockCount: number;
  alertThreshold: number;
  onRefreshData: () => Promise<void>;
};

function appVersion(): string {
  return Constants.expoConfig?.version ?? '1.0.0';
}

export function SettingsModal({
  visible,
  onClose,
  items,
  summary,
  lowStockCount,
  alertThreshold,
  onRefreshData,
}: SettingsModalProps) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await onRefreshData();
    } finally {
      setRefreshing(false);
    }
  };

  const handleShare = async () => {
    const message = buildStockShareText(
      items,
      summary,
      lowStockCount,
      alertThreshold,
      appVersion()
    );
    try {
      await Share.share({
        message,
        title: 'Resumo do estoque — Artes Foto Bahia',
      });
    } catch {
      /* usuário cancelou ou indisponível */
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityLabel="Fechar ao tocar fora"
        />
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Configurações</Text>

          <ScrollView
            style={styles.scroll}
            nestedScrollEnabled
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Sobre o app</Text>
              <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Artes Foto Bahia</Text>
                <Text style={styles.infoLine}>Controle simples de estoque de porcelanas e molduras.</Text>
                <Text style={styles.infoLine}>Versão {appVersion()}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Alertas</Text>
              <View style={styles.infoCard}>
                <Text style={styles.infoLineStrong}>
                  Limite de baixo estoque: {alertThreshold} unidades
                </Text>
                <Text style={styles.infoLine}>
                  Itens com quantidade igual ou abaixo desse valor aparecem na seção de alertas e no
                  modal correspondente.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Ações</Text>

              <Pressable
                style={[styles.actionPressable, styles.actionPressablePrimary]}
                onPress={handleShare}
              >
                <Share2 size={22} color={Theme.colors.primary} />
                <View style={styles.actionTextWrap}>
                  <Text style={styles.actionTitle}>Compartilhar resumo</Text>
                  <Text style={styles.actionSubtitle}>
                    Envia um texto com totais, categorias e alertas (WhatsApp, e-mail…)
                  </Text>
                </View>
              </Pressable>

              <Pressable
                style={styles.actionPressable}
                onPress={handleRefresh}
                disabled={refreshing}
              >
                {refreshing ? (
                  <ActivityIndicator color={Theme.colors.primary} />
                ) : (
                  <RefreshCw size={22} color={Theme.colors.slate} />
                )}
                <View style={styles.actionTextWrap}>
                  <Text style={styles.actionTitle}>Atualizar dados</Text>
                  <Text style={styles.actionSubtitle}>
                    Recarrega o estoque a partir do banco local
                  </Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
