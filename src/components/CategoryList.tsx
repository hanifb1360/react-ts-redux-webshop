// src/components/CategoryList.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const CategoryList: React.FC = () => {
  // Fetches the categories from the Redux store
  const categories = useSelector((state: RootState) => state.categories.categories);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <ul>
        {/* Maps through the categories and displays each one */}
        {categories.map(category => (
          <li key={category.id} className="mb-2">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
