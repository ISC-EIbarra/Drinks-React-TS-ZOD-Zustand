import { StateCreator } from 'zustand';
import { getCategories, getRecipes } from '../services/RecipeService';
import { Categories, Drinks } from '../types';
import { SearchFilter } from '../types/index';

export type RecipeSliceType = {
  categories: Categories;
  drinks: Drinks;
  fetchCategories: () => Promise<void>;
  searchRecipes: (searchFilters: SearchFilter) => Promise<void>;
};

export const createRecipesSlice: StateCreator<RecipeSliceType> = (set) => ({
  categories: { drinks: [] },
  drinks: { drinks: [] },
  fetchCategories: async () => {
    const categories = await getCategories();
    set({
      categories,
    });
  },
  searchRecipes: async (searchFilters) => {
    const drinks = await getRecipes(searchFilters);
    set({
      drinks,
    });
  },
});
