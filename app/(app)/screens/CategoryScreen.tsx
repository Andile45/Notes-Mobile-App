import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { colors, common } from '../../../constants/theme';
import { useCategories } from '../../../contexts/CategoryContext';
import { ConfirmModal } from '../../../components/ConfirmModal';

const CategoryScreen: React.FC = () => {
  const [categoryName, setCategoryName] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const { categories, addCategory, deleteCategory } = useCategories();

  const handleAddCategory = async () => {
    if (categoryName.trim()) {
      const success = await addCategory(categoryName.trim());
      if (success) {
        setCategoryName('');
      } else {
        Alert.alert('Error', 'Category with this name already exists.');
      }
    } else {
      Alert.alert('Error', 'Category name cannot be empty.');
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      deleteCategory(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <View style={styles.container}>
      <ConfirmModal
        visible={deleteTargetId !== null}
        title="Delete Category"
        message="Are you sure you want to delete this category? Notes in this category will not be deleted."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
        variant="destructive"
      />
      <Stack.Screen options={{ title: 'Categories' }} />
      <Text style={styles.title}>Manage Categories</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Category Name"
          placeholderTextColor={colors.muted}
          value={categoryName}
          onChangeText={setCategoryName}
        />
        <TouchableOpacity style={styles.primaryButton} onPress={handleAddCategory}>
          <Text style={styles.primaryButtonText}>Add Category</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryText}>{item.name}</Text>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setDeleteTargetId(item.id)}>
              <Text style={styles.secondaryButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name="folder-open-outline" size={56} color={colors.muted} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>No categories yet.</Text>
            <Text style={styles.emptySubtext}>Create one above to organize your notes.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...common.screen,
  },
  title: {
    ...common.title,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    ...common.input,
    marginBottom: 0,
  },
  primaryButton: {
    ...common.primaryButton,
    paddingVertical: 14,
    minWidth: 120,
  },
  primaryButtonText: {
    ...common.primaryButtonText,
    fontSize: 16,
  },
  categoryItem: {
    ...common.card,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 17,
    color: colors.title,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
  secondaryButton: {
    ...common.secondaryButton,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  secondaryButtonText: {
    ...common.secondaryButtonText,
    fontSize: 14,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: colors.title,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: colors.muted,
    fontFamily: 'Poppins-Regular',
  },
});

export default CategoryScreen;

