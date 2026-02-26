import { create } from "zustand";

interface SearchState {
  search: string;
  activeCategory: string;
  categories: string[];
  setSearch: (val: string) => void;
  setCategory: (cat: string) => void;
  setCategories: (cats: string[]) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  search: "",
  activeCategory: "ALL",
  categories: ["ALL"],
  setSearch: (search) => set({ search }),
  setCategory: (activeCategory) => set({ activeCategory }),
  setCategories: (categories) => set({ categories }),
}));
