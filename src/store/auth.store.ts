import { create } from 'zustand';
import type {AuthUser} from "../contracts/api-contracts.ts";

export interface AuthStore {
  authUser: AuthUser | null; // Si l'utilisateur peut être non connecté
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => void;
  logout: () => void;
  clearUser: () => void;
  setUser: (authUser: AuthUser | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isAuthenticated: false,

  setUser: (authUser: AuthUser | null) => set({ authUser }),

  clearUser: () => set({ authUser: null }),

  logout: () => set({ authUser: null }),

  login: async (credentials: { email: string; password: string  }) => {
    // Simulate an API call
    console.log(credentials)
  }
}));