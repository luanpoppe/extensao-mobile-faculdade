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
import { getStockSummary, initDatabase } from '../database/database';
import { styles } from './Home.styles';

const Home = () => {
  const [summary, setSummary] = useState({ porcelanas: 0, molduras: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setup = async () => {
      try {
        await initDatabase();
        const data = await getStockSummary();
        setSummary(data);
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

  const ActionButton = ({ title, icon: Icon, color }: any) => (
    <TouchableOpacity style={[styles.actionButton, Theme.shadows.light]}>
      <View style={[styles.actionIcon, { backgroundColor: color }]}>
        <Icon size={20} color={Theme.colors.white} />
      </View>
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
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
          <TouchableOpacity>
            <Text style={styles.seeAll}>Ver tudo</Text>
          </TouchableOpacity>
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
          <ActionButton title="Novo Item" icon={Plus} color={Theme.colors.success} />
          <ActionButton title="Histórico" icon={History} color={Theme.colors.primary} />
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

      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
