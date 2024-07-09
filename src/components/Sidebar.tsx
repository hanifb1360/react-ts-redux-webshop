// src/components/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCategories } from '../slices/categorySlice';
import supabase from '../supabaseClient';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) {
        console.error('Error fetching categories:', error);
      }
      if (data) {
        dispatch(setCategories(data.map((category: any) => ({
          id: category.id,
          name: category.name,
          parentId: category.parent_id,
          createdAt: category.created_at,
        }))));
      }
    };

    fetchCategories();
  }, [dispatch]);

  const mainCategories = categories.filter(category => category.parentId === null);
  const getSubCategories = (parentId: string) => categories.filter(category => category.parentId === parentId);

  const handleMainCategoryClick = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="sidebar">
      <ul>
        {mainCategories.map(category => (
          <li key={category.id} onClick={() => handleMainCategoryClick(category.id)}>
            {category.name}
            {expandedCategory === category.id && (
              <ul className="sub-categories">
                {getSubCategories(category.id).map(subCategory => (
                  <li key={subCategory.id}>{subCategory.name}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

