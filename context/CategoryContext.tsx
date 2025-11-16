import React, { createContext, useState, ReactNode } from 'react';
import { Category } from '../types';
import { initialCategories } from '../data/categories';

interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Category) => void;
  updateCategory: (oldCategory: Category, newCategory: Category) => void;
  deleteCategory: (category: Category) => void;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const addCategory = (category: Category) => {
    if (!categories.includes(category)) {
      setCategories(prev => [...prev, category]);
    }
  };

  const updateCategory = (oldCategory: Category, newCategory: Category) => {
    setCategories(prev => prev.map(c => (c === oldCategory ? newCategory : c)));
  };

  const deleteCategory = (categoryToDelete: Category) => {
    setCategories(prev => prev.filter(c => c !== categoryToDelete));
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
