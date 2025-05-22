import { StateCreator } from 'zustand';
import {
  getCategories,
  getRecipeById,
  getRecipes,
} from '../services/RecipeService';
import { Categories, Drink, Drinks, Recipe } from '../types';
import { SearchFilter } from '../types/index';
import { FavoritesSliceType } from './favoritesSlice';

export type RecipeSliceType = {
  categories: Categories;
  drinks: Drinks;
  selectedRecipe: Recipe;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipes: (searchFilters: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink['idDrink']) => Promise<void>;
  closeModal: () => void;
};

export const createRecipesSlice: StateCreator<
  RecipeSliceType & FavoritesSliceType,
  [],
  [],
  RecipeSliceType
> = (set) => ({
  categories: { drinks: [] },
  drinks: { drinks: [] },
  selectedRecipe: {} as Recipe,
  modal: false,
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
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeById(id);
    set({
      selectedRecipe,
      modal: true,
    });
  },
  closeModal: () => {
    set({
      modal: false,
      selectedRecipe: {} as Recipe,
    });
  },
});
