// src/components/CollapsibleMenu.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCategories } from '../slices/categorySlice';
import supabase from '../supabase/supabaseClient';
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
    <div className="w-64 bg-gray-900 text-white h-auto p-6 pt-10">
      {mainCategories.map(category => (
        <div key={category.id} className="mb-4 ">
          <div 
            className="flex justify-between items-center cursor-pointer p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out" 
            onClick={() => handleCategoryClick(category.id)}
          >
            <span className="font-semibold text-lg">{category.name}</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${expandedCategory === category.id ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          {expandedCategory === category.id && (
            <div className="pl-4 mt-2 transition duration-300 ease-in-out">
              {getSubCategories(category.id).map(subCategory => (
                <div 
                  key={subCategory.id} 
                  className="p-2 text-gray-400 hover:text-white cursor-pointer transition duration-300 ease-in-out" 
                  onClick={() => handleSubCategoryClick(subCategory.id)}
                >
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














