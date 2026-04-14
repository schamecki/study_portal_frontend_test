import { create } from 'zustand';
import type {Service} from "../contracts/api-contracts.ts";

export interface AppStore {
    services: Service[]; // Si l'utilisateur peut être non connecté
    isLoading: boolean;
    setServices: (services: Service[]) => void;
    setLoading: (isLoading: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
    services: [],
    isLoading: false,

    setServices: (services: Service[]) => set({ services, isLoading: false }),

    setLoading: (isLoading: boolean) => set({ isLoading })
}));