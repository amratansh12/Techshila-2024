import { create } from "zustand";

export const useSidebar = create((set) => ({
  isOpen: false,
  toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
