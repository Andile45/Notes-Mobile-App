import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { useCategories } from '../../../contexts/CategoryContext';

const CategoryScreen: React.FC = () => {
  const [categoryName, setCategoryName] = useState('');
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

  const handleDeleteCategory = (id: string) => {
    Alert.alert(
      'Delete Category',
      'Are you sure you want to delete this category? This will not delete notes associated with it.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteCategory(id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Categories' }} />
      <Text style={styles.title}>Manage Categories</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Category Name"
          value={categoryName}
          onChangeText={setCategoryName}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleAddCategory}>
            <Text style={styles.buttonText}>Add Category</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryText}>{item.name}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteCategory(item.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F2F5', // Light Gray background
  },
  title: {
    fontSize: 32, // Larger title
    fontWeight: 'bold',
    marginBottom: 30, // More space below title
    textAlign: 'center',
    color: '#2C3E50', // Darker text for emphasis
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 55, // Taller input fields
    borderColor: '#DCDCDC', // Lighter border
    borderWidth: 1,
    borderRadius: 12, // More rounded corners
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    color: '#34495E',
    marginRight: 10,
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Elevation for Android
    fontFamily: 'Inter-Regular', // Apply Inter font
  },
  buttonContainer: {
    backgroundColor: '#4CAF50', // Green button
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular', // Apply Poppins font
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryText: {
    fontSize: 19,
    color: '#2C3E50',
    fontWeight: '500',
    fontFamily: 'Inter-Regular', // Apply Inter font
  },
  deleteButton: {
    backgroundColor: '#E74C3C', // Red delete button
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular', // Apply Poppins font
  },
});

export default CategoryScreen;

