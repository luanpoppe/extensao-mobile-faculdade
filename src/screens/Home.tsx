import React, { useEffect, useState } from 'react';
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
import type { InsertStockItemDto, StockItem } from '../types/stock';
import { styles } from './Home.styles';
import { NewItemModal } from './components/NewItemModal';
import { HistoryModal } from './components/HistoryModal';
import { RegisteredItemsList } from './components/RegisteredItemsList';

const Home = () => {
  const [summary, setSummary] = useState({ porcelanas: 0, molduras: 0 });
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItemOpen, setNewItemOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

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
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Bem-vindo,</Text>
            <Text style={styles.companyName}>Artes Foto Bahia</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
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
          <ActionButton title="Relatórios" icon={TrendingUp} color={Theme.colors.slate} />
          <ActionButton title="Alertas" icon={AlertTriangle} color={Theme.colors.warning} />
        </View>

        {/* Low Stock Section */}
        <View style={styles.alertSection}>
          <View style={styles.alertHeader}>
            <AlertTriangle size={20} color={Theme.colors.danger} />
            <Text style={styles.alertTitle}>Alertas de Baixo Estoque</Text>
          </View>
          <TouchableOpacity style={[styles.alertCard, Theme.shadows.light]}>
            <View style={styles.alertInfo}>
              <Text style={styles.alertItemName}>Porcelana Oval 10x15</Text>
              <Text style={styles.alertItemStock}>Restam apenas 5 unidades</Text>
            </View>
            <ChevronRight size={20} color={Theme.colors.textMuted} />
          </TouchableOpacity>
        </View>

        <RegisteredItemsList items={items} />

      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
