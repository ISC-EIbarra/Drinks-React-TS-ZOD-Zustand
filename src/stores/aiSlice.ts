import { StateCreator } from 'zustand';
import { generateRecipe } from '../services/AIService';

export type AISliceType = {
  recipe: string;
  isGenerating: boolean;
  generateRecipe: (prompt: string) => Promise<void>;
};

export const createAISlice: StateCreator<AISliceType, [], [], AISliceType> = (
  set
) => ({
  recipe: '',
  isGenerating: false,
  generateRecipe: async (prompt) => {
    set({ recipe: '', isGenerating: true });
    const data = await generateRecipe(prompt);
    for await (const textPart of data) {
      set((state) => ({
        recipe: state.recipe + textPart,
      }));
    }
    set({
      isGenerating: false,
    });
  },
});
