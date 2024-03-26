import { create } from "zustand";

type ExitVocabularyState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useExitVocabularyModal = create<ExitVocabularyState>((set) => ({
  isOpen: false,
  open: () => set({isOpen: true}),
  close: () => set({isOpen: false}),
}))