import { StateCreator } from 'zustand';
import { Recipe } from '../types';
import { createRecipesSlice, RecipeSliceType } from './recipeSlice';
import {
  createNotificationSlice,
  NotificactionSliceType,
} from './notificationSlice';

export type FavoritesSliceType = {
  favorites: Recipe[];
  addFavorite: (recipe: Recipe) => void;
  favoriteExist: (id: Recipe['idDrink']) => boolean;
  loadFromStorage: () => void;
};

export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & RecipeSliceType & NotificactionSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],
  addFavorite: (recipe) => {
    if (get().favoriteExist(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: 'Se eliminó de favoritos',
        error: false,
      });
    } else {
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: 'Se agregó a favoritos',
        error: false,
      });
    }
    createRecipesSlice(set, get, api).closeModal();
    localStorage.setItem('favorites', JSON.stringify(get().favorites));
  },
  favoriteExist: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },
  loadFromStorage: () => {
    const storeFavorites = localStorage.getItem('favorites');
    if (storeFavorites) {
      set({
        favorites: JSON.parse(storeFavorites),
      });
    }
  },
});
