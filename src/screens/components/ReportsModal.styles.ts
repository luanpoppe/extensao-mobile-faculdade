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
    maxHeight: '88%',
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
  scroll: {
    maxHeight: 400,
  },
  scrollContent: {
    paddingBottom: Theme.spacing.sm,
    gap: Theme.spacing.md,
  },
  kpiRow: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  kpiBox: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Theme.colors.primary,
  },
  kpiValueMoney: {
    fontSize: 18,
    fontWeight: '800',
    color: Theme.colors.secondary,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.sm,
  },
  catCard: {
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  catCardHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.sm,
  },
  catRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  catRowLabel: {
    fontSize: 14,
    color: Theme.colors.textMuted,
  },
  catRowValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.text,
  },
  footnote: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    lineHeight: 18,
    marginTop: Theme.spacing.xs,
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
