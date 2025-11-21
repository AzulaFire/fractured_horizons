import { create } from 'zustand';

export const useGameStore = create((set) => ({
  fragments: [],
  currentScene: 'chapter1_apartment',
  addFragment: (id) =>
    set((state) => ({
      fragments: state.fragments.includes(id)
        ? state.fragments
        : [...state.fragments, id],
    })),
  goToScene: (scene) => set({ currentScene: scene }),
  showInventory: false,
  toggleInventory: () =>
    set((state) => ({ showInventory: !state.showInventory })),
}));
