import { create } from 'zustand';

interface SearchState {
  isLoading: boolean;
  searchResults: string | null;
  setLoading: (loading: boolean) => void;
  setResults: (results: string | null) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isLoading: false,
  searchResults: null,
  setLoading: (loading) => set({ isLoading: loading }),
  setResults: (results) => set({ searchResults: results }),
}));
