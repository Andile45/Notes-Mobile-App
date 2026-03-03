import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { colors, common } from '../constants/theme';

const { width } = Dimensions.get('window');

export type ConfirmModalVariant = 'destructive' | 'default';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: ConfirmModalVariant;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
}) => {
  const isDestructive = variant === 'destructive';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>{cancelLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                isDestructive ? styles.destructiveButton : styles.confirmButton,
              ]}
              onPress={() => {
                onConfirm();
                onCancel();
              }}
              activeOpacity={0.8}
            >
              <Text
                style={
                  isDestructive
                    ? styles.destructiveButtonText
                    : styles.confirmButtonText
                }
              >
                {confirmLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: Math.min(width - 48, 360),
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    ...common.card,
    marginBottom: 0,
    borderWidth: 0,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: colors.title,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.body,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    ...common.secondaryButton,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    ...common.secondaryButtonText,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  confirmButton: {
    ...common.primaryButton,
  },
  confirmButtonText: {
    ...common.primaryButtonText,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  destructiveButton: {
    ...common.destructiveButton,
  },
  destructiveButtonText: {
    ...common.destructiveButtonText,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});
