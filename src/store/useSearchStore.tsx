import { create } from "zustand";

interface SearchStore {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  keyword: "",
  setKeyword: (keyword) => set({ keyword: keyword }),
}));

export default useSearchStore;
