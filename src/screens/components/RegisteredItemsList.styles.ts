import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme';

export const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.md,
  },
  sectionTitleSpaced: {
    marginTop: Theme.spacing.md,
  },
  emptyListText: {
    fontSize: 14,
    color: Theme.colors.textMuted,
    marginBottom: Theme.spacing.lg,
  },
  stockItemCard: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  stockItemMain: {
    flex: 1,
  },
  stockItemName: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.text,
  },
  stockItemLine: {
    fontSize: 13,
    color: Theme.colors.textMuted,
    marginTop: 4,
  },
  stockItemDescription: {
    fontSize: 13,
    color: Theme.colors.slate,
    marginTop: Theme.spacing.sm,
  },
});
