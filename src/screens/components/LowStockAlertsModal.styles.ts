import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: Theme.spacing.md,
  },
  modalCard: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    maxHeight: '85%',
    width: '100%',
    zIndex: 1,
    ...Theme.shadows.medium,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.xs,
  },
  modalSubtitle: {
    fontSize: 14,
    color: Theme.colors.textMuted,
    marginBottom: Theme.spacing.md,
    lineHeight: 20,
  },
  listContent: {
    paddingBottom: Theme.spacing.sm,
    gap: Theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.background,
    borderWidth: 1,
    borderColor: '#F1C9CE',
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.danger,
  },
  rowBody: {
    flex: 1,
    minWidth: 0,
  },
  rowName: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.primary,
    lineHeight: 22,
  },
  rowStockLine: {
    fontSize: 14,
    color: Theme.colors.danger,
    fontWeight: '600',
    marginTop: 4,
  },
  rowMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginTop: Theme.spacing.sm,
  },
  categoryPill: {
    backgroundColor: Theme.colors.card,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: '#DEE2E6',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.text,
  },
  emptyText: {
    fontSize: 15,
    color: Theme.colors.textMuted,
    textAlign: 'center',
    paddingVertical: Theme.spacing.lg,
    lineHeight: 22,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.sm,
  },
  closeButtonText: {
    color: Theme.colors.white,
    fontWeight: '700',
  },
});
