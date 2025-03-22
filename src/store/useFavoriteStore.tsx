import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteStore {
  favorites: number[];
  actions: {
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
  };
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

const useFavoriteStore = create(
  persist<FavoriteStore>(
    (set, get) => ({
      favorites: [],
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      actions: {
        addFavorite: (id) => {
          const current = get().favorites;
          set({ favorites: [...current, id] });
        },
        removeFavorite: (id) => {
          const current = get().favorites;
          set({ favorites: current.filter((favId) => favId !== id) });
        },
      },
    }),
    {
      name: "favorite-movies",
    }
  )
);

export default useFavoriteStore;
