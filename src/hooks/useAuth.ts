import { useCallback } from 'react';
import { useAuthStore } from '../store/auth.store';
import { keycloakService } from '../services/keycloak.service';

let isInitializing = false;

export function useAuth() {
    //const { authUser, isAuthenticated, isLoading } = useAuthStore();

    const  authUser = useAuthStore((state) => state.authUser);
    const  isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const  isLoading = useAuthStore((state) => state.isLoading);
    const  authError = useAuthStore((state) => state.authError);
    const  setAuthUserStore = useAuthStore((state) => state.setAuthUser);
    const initialize = useCallback(async () => {
        if (isInitializing) return;
        isInitializing = true;
        
        const { setAuthUser, setLoading, clearUser, setAuthError } = useAuthStore.getState();

        setLoading(true);
        setAuthError(null);

        try {
            const authenticated = await keycloakService.init();

            if (!authenticated) {
                // 🔥 Pas connecté → redirection login
                await keycloakService.login();
                return;
            }

            const user = keycloakService.getUser();

            if (!user) {
                throw new Error('User not found in token');
            }

            setAuthUser(user);
            setAuthUserStore(user)
        } catch (error) {
            console.error('Auth initialization failed:', error);
            
            setAuthError(error instanceof Error ? error.message : "Erreur lors de la communication avec le serveur d'authentification.");

            // 🔥 Clean state
            clearUser();

            // 🔥 Option : forcer logout pour reset session
            //await keycloakService.logout();
        } finally {
            setLoading(false);
            isInitializing = false;
        }
    }, [setAuthUserStore]);

    const login = useCallback(async () => {
        await keycloakService.login();
    }, []);

    const logout = useCallback(async () => {
        const { clearUser } = useAuthStore.getState();

        await keycloakService.logout();
        clearUser();
    }, []);

    return {
        authUser,
        isAuthenticated,
        isLoading,
        authError,
        initialize,
        login,
        logout,
    };
}