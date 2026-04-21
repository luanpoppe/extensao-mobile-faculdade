import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
    marginTop: Theme.spacing.md,
  },
  welcomeText: {
    fontSize: 16,
    color: Theme.colors.textMuted,
    fontWeight: '500',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  profileButton: {
    padding: Theme.spacing.sm,
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.md,
    ...Theme.shadows.light,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.md,
  },
  seeAll: {
    color: Theme.colors.secondary,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
  },
  statCard: {
    backgroundColor: Theme.colors.card,
    flex: 1,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    marginRight: Theme.spacing.sm,
  },
  statInfo: {
    flex: 1,
  },
  statTitle: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
  },
  actionButton: {
    backgroundColor: Theme.colors.card,
    flexBasis: '47%',
    flexGrow: 1,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionIcon: {
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
    marginRight: Theme.spacing.md,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.text,
  },
  alertSection: {
    marginTop: Theme.spacing.sm,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.danger,
    marginLeft: Theme.spacing.sm,
  },
  alertCard: {
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.danger,
  },
  alertInfo: {
    flex: 1,
  },
  alertItemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  alertItemStock: {
    fontSize: 13,
    color: Theme.colors.danger,
    marginTop: 2,
  },
});

export default Home;
