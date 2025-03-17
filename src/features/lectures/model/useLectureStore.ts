import { create } from 'zustand';

interface SearchStore {
  searchTitle: string | null;
  setSearchTitle: (term: string) => void;
}
// 제목 키워드 검색어 저장
export const useSearchStore = create<SearchStore>((set) => ({
  searchTitle: '',
  setSearchTitle: (title: string) => set({ searchTitle: title }),
  clearAccessToken: () => {
    set({ searchTitle: null });
  },
}));
