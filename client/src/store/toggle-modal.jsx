import { create } from "zustand";

export const useAddItemModal = create((set) => ({
  isAddItemOpen: false,
  toggleIsAddItemOpen: () =>
    set((state) => ({ isAddItemOpen: !state.isAddItemOpen })),
}));
