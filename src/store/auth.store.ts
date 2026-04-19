import { create } from 'zustand';
import type {AuthUser} from "../contracts/api-contracts.ts";

export interface AuthStore {
  authUser: AuthUser | null; // Si l'utilisateur peut être non connecté
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string | null;
  login: (credentials: { email: string; password: string }) => void;
  logout: () => void;
  clearUser: () => void;
  setAuthUser: (authUser: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setAuthError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isAuthenticated: false,
  isLoading: true,
  authError: null,

  setAuthUser: (authUser: AuthUser | null) => set({ authUser, isAuthenticated: !!authUser, authError: null }),

  clearUser: () => set({ authUser: null, isAuthenticated: false, isLoading: false }),

  logout: () => set({ authUser: null, isAuthenticated: false }),

  login: async (credentials: { email: string; password: string  }) => {
    // Simulate an API call
    console.log(credentials)
  },

  setLoading: (isLoading: boolean) => set({ isLoading }),
  
  setAuthError: (error: string | null) => set({ authError: error })
}));