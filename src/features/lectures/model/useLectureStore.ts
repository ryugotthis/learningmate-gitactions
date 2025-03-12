import { create } from 'zustand';

interface SearchStore {
  searchTitle: string | null;
  setSearchTitle: (term: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchTitle: '',
  setSearchTitle: (title: string) => set({ searchTitle: title }),
  clearAccessToken: () => {
    set({ searchTitle: null });
  },
}));
