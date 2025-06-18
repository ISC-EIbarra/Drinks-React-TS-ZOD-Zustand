import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RecipeSliceType, createRecipesSlice } from './recipeSlice';
import { FavoritesSliceType, createFavoritesSlice } from './favoritesSlice';
import {
  NotificactionSliceType,
  createNotificationSlice,
} from './notificationSlice';
import { AISliceType, createAISlice } from './aiSlice';

export const useAppStore = create<
  RecipeSliceType & FavoritesSliceType & NotificactionSliceType & AISliceType
>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a),
  }))
);
