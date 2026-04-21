import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { Theme } from '../../theme/theme';
import type { InsertStockItemDto, StockCategory } from '../../types/stock';
import { styles } from './NewItemModal.styles';

type NewItemModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (dto: InsertStockItemDto) => Promise<void>;
};

export function NewItemModal({ visible, onClose, onSave }: NewItemModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<StockCategory>('porcelana');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setName('');
    setCategory('porcelana');
    setQty('');
    setPrice('');
    setDescription('');
  };

  useEffect(() => {
    if (!visible) {
      reset();
    }
  }, [visible]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    const qtyParsed = parseInt(qty.replace(/\D/g, ''), 10);
    const quantity = Number.isFinite(qtyParsed) ? Math.max(0, qtyParsed) : 0;
    const priceRaw = price.replace(',', '.').replace(/[^\d.]/g, '');
    const priceNum = priceRaw ? parseFloat(priceRaw) : 0;

    setSaving(true);
    try {
      await onSave({
        name: trimmedName,
        category,
        quantity,
        price: priceNum,
        description: description.trim(),
      });
      handleClose();
    } catch (error) {
      console.error('Erro ao salvar item:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable style={styles.modalOverlay} onPress={handleClose}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Novo item</Text>
            <Text style={styles.modalLabel}>Nome</Text>
            <TextInput
              style={styles.modalInput}
              value={name}
              onChangeText={setName}
              placeholder="Ex.: Porcelana retangular"
              placeholderTextColor={Theme.colors.textMuted}
            />
            <Text style={styles.modalLabel}>Categoria</Text>
            <View style={styles.categoryRow}>
              <TouchableOpacity
                style={[
                  styles.categoryChip,
                  category === 'porcelana' && styles.categoryChipActive,
                ]}
                onPress={() => setCategory('porcelana')}
              >
                <Text style={styles.categoryChipText}>Porcelana</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.categoryChip,
                  category === 'moldura' && styles.categoryChipActive,
                ]}
                onPress={() => setCategory('moldura')}
              >
                <Text style={styles.categoryChipText}>Moldura</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalLabel}>Quantidade</Text>
            <TextInput
              style={styles.modalInput}
              value={qty}
              onChangeText={setQty}
              keyboardType="number-pad"
              placeholder="0"
              placeholderTextColor={Theme.colors.textMuted}
            />
            <Text style={styles.modalLabel}>Preço (R$)</Text>
            <TextInput
              style={styles.modalInput}
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
              placeholder="0,00"
              placeholderTextColor={Theme.colors.textMuted}
            />
            <Text style={styles.modalLabel}>Descrição (opcional)</Text>
            <TextInput
              style={[styles.modalInput, { minHeight: 72, textAlignVertical: 'top' }]}
              value={description}
              onChangeText={setDescription}
              multiline
              placeholder="Observações"
              placeholderTextColor={Theme.colors.textMuted}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButtonSecondary}
                onPress={handleClose}
                disabled={saving}
              >
                <Text style={styles.modalButtonSecondaryText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonPrimary}
                onPress={submit}
                disabled={saving || !name.trim()}
              >
                <Text style={styles.modalButtonPrimaryText}>
                  {saving ? 'Salvando…' : 'Salvar'}
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
