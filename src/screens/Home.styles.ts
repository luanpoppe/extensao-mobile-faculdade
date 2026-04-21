import { StyleSheet } from 'react-native';
import { Theme } from '../theme/theme';

export const styles = StyleSheet.create({
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
    marginBottom: Theme.spacing.md,
  },
  alertCardsContainer: {
    gap: Theme.spacing.sm,
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
  alertCardEmpty: {
    borderLeftColor: '#CED4DA',
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
  alertItemStockMuted: {
    fontSize: 13,
    color: Theme.colors.textMuted,
    marginTop: 2,
  },
});
