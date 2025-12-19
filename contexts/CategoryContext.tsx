import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface Category {
  id: string;
  name: string;
}

interface CategoryContextType {
  categories: Category[];
  addCategory: (name: string) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useAuth(); // To associate categories with a user

  const CATEGORIES_STORAGE_KEY = `@categories_${user?.email}`;

  useEffect(() => {
    if (user) {
      loadCategories();
    } else {
      setCategories([]); // Clear categories if user logs out
    }
  }, [user]);

  const loadCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  };

  const saveCategories = async (categoriesToSave: Category[]) => {
    try {
      await AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categoriesToSave));
    } catch (error) {
      console.error("Failed to save categories", error);
    }
  };

  const addCategory = async (name: string) => {
    if (categories.some(cat => cat.name === name)) {
      return false; // Category already exists
    }
    const newCategory: Category = { id: Date.now().toString(), name };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    await saveCategories(updatedCategories);
    return true;
  };

  const deleteCategory = async (id: string) => {
    const updatedCategories = categories.filter(cat => cat.id !== id);
    setCategories(updatedCategories);
    await saveCategories(updatedCategories);
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};

