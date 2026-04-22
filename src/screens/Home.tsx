import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Package, 
  Layers, 
  AlertTriangle, 
  Plus, 
  TrendingUp, 
  History, 
  Settings,
  ChevronRight
} from 'lucide-react-native';
import { Theme } from '../theme/theme';
import { initDatabase } from '../database/database';
import { stockRepository } from '../database/repository';
import { LOW_STOCK_THRESHOLD } from '../helpers/contants';
import { lowStockQuantityPhrase } from '../helpers/stockDisplay';
import type { InsertStockItemDto, StockItem } from '../types/stock';
import { styles } from './Home.styles';
import { NewItemModal } from './components/NewItemModal';
import { HistoryModal } from './components/HistoryModal';
import { LowStockAlertsModal } from './components/LowStockAlertsModal';
import { ReportsModal } from './components/ReportsModal';
import { RegisteredItemsList } from './components/RegisteredItemsList';
import { SettingsModal } from './components/SettingsModal';

const Home = () => {
  const [summary, setSummary] = useState({ porcelanas: 0, molduras: 0 });
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItemOpen, setNewItemOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const lowStockItems = useMemo(
    () =>
      items
        .filter((i) => i.quantity <= LOW_STOCK_THRESHOLD)
        .sort((a, b) => a.quantity - b.quantity),
    [items]
  );

  const refreshData = async () => {
    const [summaryData, list] = await Promise.all([
      stockRepository.getStockSummary(),
      stockRepository.getAllStockItems(),
    ]);
    setSummary(summaryData);
    setItems(list);
  };

  useEffect(() => {
    const setup = async () => {
      try {
        await initDatabase();
        await refreshData();
      } catch (error) {
        console.error('Database error:', error);
      } finally {
        setLoading(false);
      }
    };
    setup();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <View style={[styles.statCard, Theme.shadows.medium]}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Icon size={24} color={color} />
      </View>
      <View style={styles.statInfo}>
        <Text style={styles.statTitle}>{title}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
    </View>
  );

  const ActionButton = ({
    title,
    icon: Icon,
    color,
    onPress,
  }: {
    title: string;
    icon: React.ComponentType<{ size: number; color: string }>;
    color: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.actionButton, Theme.shadows.light]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.actionIcon, { backgroundColor: color }]}>
        <Icon size={20} color={Theme.colors.white} />
      </View>
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
  );

  const saveNewItem = async (dto: InsertStockItemDto) => {
    await stockRepository.insertStockItem(dto);
    await refreshData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <NewItemModal
        visible={newItemOpen}
        onClose={() => setNewItemOpen(false)}
        onSave={saveNewItem}
      />
      <HistoryModal visible={historyOpen} onClose={() => setHistoryOpen(false)} />
      <LowStockAlertsModal
        visible={alertsOpen}
        onClose={() => setAlertsOpen(false)}
        items={lowStockItems}
        threshold={LOW_STOCK_THRESHOLD}
      />
      <ReportsModal
        visible={reportsOpen}
        onClose={() => setReportsOpen(false)}
        items={items}
      />
      <SettingsModal
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        items={items}
        summary={summary}
        lowStockCount={lowStockItems.length}
        alertThreshold={LOW_STOCK_THRESHOLD}
        onRefreshData={refreshData}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Bem-vindo,</Text>
            <Text style={styles.companyName}>Artes Foto Bahia</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => setSettingsOpen(true)}
            activeOpacity={0.7}
          >
            <Settings size={24} color={Theme.colors.slate} />
          </TouchableOpacity>
        </View>

        {/* Stock Overview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Visão Geral do Estoque</Text>
        </View>

        <View style={styles.statsRow}>
          <StatCard 
            title="Porcelanas" 
            value={summary.porcelanas} 
            icon={Package} 
            color={Theme.colors.primary} 
          />
          <StatCard 
            title="Molduras" 
            value={summary.molduras} 
            icon={Layers} 
            color={Theme.colors.secondary} 
          />
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.actionsGrid}>
          <ActionButton
            title="Novo Item"
            icon={Plus}
            color={Theme.colors.success}
            onPress={() => setNewItemOpen(true)}
          />
          <ActionButton
            title="Histórico"
            icon={History}
            color={Theme.colors.primary}
            onPress={() => setHistoryOpen(true)}
          />
          <ActionButton
            title="Relatórios"
            icon={TrendingUp}
            color={Theme.colors.slate}
            onPress={() => setReportsOpen(true)}
          />
          <ActionButton
            title="Alertas"
            icon={AlertTriangle}
            color={Theme.colors.warning}
            onPress={() => setAlertsOpen(true)}
          />
        </View>

        {/* Low Stock Section */}
        <View style={styles.alertSection}>
          <View style={styles.alertHeader}>
            <AlertTriangle size={20} color={Theme.colors.danger} />
            <Text style={styles.alertTitle}>Alertas de Baixo Estoque</Text>
          </View>
          {lowStockItems.length === 0 ? (
            <View style={[styles.alertCard, styles.alertCardEmpty, Theme.shadows.light]}>
              <View style={styles.alertInfo}>
                <Text style={styles.alertItemName}>Nenhum alerta ativo</Text>
                <Text style={styles.alertItemStockMuted}>
                  Itens com até {LOW_STOCK_THRESHOLD} unidades aparecem aqui. Estoque em dia.
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.alertCardsContainer}>
              {lowStockItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.alertCard, Theme.shadows.light]}
                  onPress={() => setAlertsOpen(true)}
                  activeOpacity={0.7}
                >
                  <View style={styles.alertInfo}>
                    <Text style={styles.alertItemName}>{item.name}</Text>
                    <Text style={styles.alertItemStock}>
                      {lowStockQuantityPhrase(item.quantity)}
                    </Text>
                  </View>
                  <ChevronRight size={20} color={Theme.colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <RegisteredItemsList items={items} />

      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
