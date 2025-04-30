import { StateCreator } from 'zustand';
import { getCategories } from '../services/RecipeService';
import { Categories } from '../types';
import { SearchFilter } from '../types/index';

export type RecipeSliceType = {
  categories: Categories;
  fetchCategories: () => Promise<void>;
  searchRecipes: (searchFilters: SearchFilter) => Promise<void>;
};

export const createRecipesSlice: StateCreator<RecipeSliceType> = (set) => ({
  categories: { drinks: [] },
  fetchCategories: async () => {
    const categories = await getCategories();
    set({
      categories,
    });
  },
  searchRecipes: async (searchFilters) => {
    console.log(searchFilters);
  },
});
