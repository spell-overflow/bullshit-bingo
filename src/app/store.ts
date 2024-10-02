import { create } from "zustand";

interface AppState {
  celebrate: boolean;
  setCelebrate: (value: boolean) => void;
}

export const useCelebrateStore = create<AppState>((set) => ({
  celebrate: false,
  setCelebrate: (value: boolean) => set({ celebrate: value }),
}));
