import { create } from "zustand";

export type ShellState = {
	lastStatus: number,
	setStatus: (status: number) => void,
};

export const useShell = create<ShellState>((set) => ({
	lastStatus: 0,
	setStatus: (status: number) => set((state) => ({ ...state, lastStatus: status }))
}));
