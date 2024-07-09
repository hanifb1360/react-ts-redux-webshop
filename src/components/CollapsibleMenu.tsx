// src/components/CollapsibleMenu.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCategories } from '../slices/categorySlice';
import supabase from '../supabaseClient';
import './CollapsibleMenu.css';
import { useCategoryContext } from '../context/CategoryContext';

const CollapsibleMenu: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const { setSelectedCategory } = useCategoryContext();

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

  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleSubCategoryClick = (subCategoryId: string) => {
    setSelectedCategory(subCategoryId);
  };

  return (
    <div className="collapsible-menu">
      {mainCategories.map(category => (
        <div key={category.id} className="category">
          <div className="category-header" onClick={() => handleCategoryClick(category.id)}>
            {category.name}
          </div>
          {expandedCategory === category.id && (
            <div className="sub-categories">
              {getSubCategories(category.id).map(subCategory => (
                <div key={subCategory.id} className="sub-category" onClick={() => handleSubCategoryClick(subCategory.id)}>
                  {subCategory.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CollapsibleMenu;










