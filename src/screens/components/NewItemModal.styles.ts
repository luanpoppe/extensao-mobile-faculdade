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
    width: '100%',
    zIndex: 1,
    ...Theme.shadows.medium,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.md,
  },
  modalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.textMuted,
    marginBottom: Theme.spacing.xs,
    marginTop: Theme.spacing.sm,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: Theme.borderRadius.sm,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    fontSize: 16,
    color: Theme.colors.text,
    backgroundColor: Theme.colors.background,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  categoryChip: {
    flex: 1,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
    borderWidth: 2,
    borderColor: '#DEE2E6',
    alignItems: 'center',
  },
  categoryChipActive: {
    borderColor: Theme.colors.secondary,
    backgroundColor: Theme.colors.secondary + '18',
  },
  categoryChipText: {
    fontWeight: '600',
    color: Theme.colors.text,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Theme.spacing.sm,
    marginTop: Theme.spacing.lg,
  },
  modalButtonSecondary: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
  },
  modalButtonSecondaryText: {
    color: Theme.colors.textMuted,
    fontWeight: '600',
  },
  modalButtonPrimary: {
    backgroundColor: Theme.colors.success,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.sm,
  },
  modalButtonPrimaryText: {
    color: Theme.colors.white,
    fontWeight: '700',
  },
});
