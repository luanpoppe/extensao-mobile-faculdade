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
    maxHeight: '90%',
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
  scroll: {
    maxHeight: 420,
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Theme.spacing.sm,
  },
  infoCard: {
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.primary,
    marginBottom: 4,
  },
  infoLine: {
    fontSize: 14,
    color: Theme.colors.textMuted,
    lineHeight: 20,
  },
  infoLineStrong: {
    fontSize: 14,
    color: Theme.colors.text,
    lineHeight: 20,
    marginTop: Theme.spacing.sm,
  },
  actionPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    marginBottom: Theme.spacing.sm,
  },
  actionPressablePrimary: {
    backgroundColor: Theme.colors.primary + '10',
    borderColor: Theme.colors.primary + '35',
  },
  actionTextWrap: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Theme.colors.primary,
  },
  actionSubtitle: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    marginTop: 2,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: Theme.spacing.sm,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
  },
  closeButtonText: {
    color: Theme.colors.textMuted,
    fontWeight: '700',
  },
});
