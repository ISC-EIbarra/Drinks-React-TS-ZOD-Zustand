import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RecipeSliceType, createRecipesSlice } from './recipeSlice';
import { FavoritesSliceType, createFavoritesSlice } from './favoritesSlice';

export const useAppStore = create<RecipeSliceType & FavoritesSliceType>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
  }))
);
