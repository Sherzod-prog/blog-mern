import { create } from "zustand";

interface State {
  category: number;
  setCategory: (category: number) => void;
}
export const useCategoryStore = create<State>()((set) => ({
  category: 1,
  setCategory: (category: number) => set({ category }),
}));
