import { useCallback } from 'react';
import { useAuthStore } from '../store/auth.store';
import { keycloakService } from '../services/keycloak.service';

export function useAuth() {
    const { authUser, isAuthenticated, isLoading } = useAuthStore();

    const initialize = useCallback(async () => {
        const { setAuthUser, setLoading, clearUser } = useAuthStore.getState();

        setLoading(true);

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

            console.log(user, 'as user', keycloakService)

            setAuthUser(user);
        } catch (error) {
            console.error('Auth initialization failed:', error);

            // 🔥 Clean state
            clearUser();

            // 🔥 Option : forcer logout pour reset session
            //await keycloakService.logout();
        } finally {
            setLoading(false);
        }
    }, []);

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
        initialize,
        login,
        logout,
    };
}