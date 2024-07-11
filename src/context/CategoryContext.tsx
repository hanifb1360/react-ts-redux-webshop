import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CategoryContextProps } from '../types';

// Create a context for the category
const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

interface CategoryProviderProps {
  children: ReactNode;
}

// Provide the context to child components
export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook to use the CategoryContext
export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};





