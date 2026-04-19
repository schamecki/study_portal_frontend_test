// ============================================================
// Keycloak Service — StudyPortal
// Wraps keycloak-js for authentication lifecycle:
// init, login, logout, token refresh, authorities extraction.
// ============================================================

import Keycloak from 'keycloak-js';
import type {AuthUser} from '../contracts/api-contracts';

export const url = import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080'as string
export const realm = import.meta.env.VITE_KEYCLOAK_REALM || 'study-portal-realm' as string;
const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'frontend-app'

// --------------- Configuration ---------------

const keycloakConfig: Keycloak.KeycloakConfig = {
    url,
    realm,
    clientId,
};

// --------------- Keycloak Instance ---------------

const keycloak = new Keycloak(keycloakConfig);

// --------------- Service ---------------

export const keycloakService = {
    /**
     * Initializes Keycloak with check-sso for silent authentication.
     * Returns true if the user is already authenticated.
     */
    async init(): Promise<boolean> {
        return await keycloak.init({
            onLoad:  'check-sso',
            //checkLoginIframe: false,
            silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
            pkceMethod: 'S256',
        });
    },

    /**
     * Redirects the user to the Keycloak login page.
     */
    async login(): Promise<void> {
        await keycloak.login();
    },

    /**
     * Logs the user out and redirects to the app root.
     */
    async logout(): Promise<void> {
        await keycloak.logout({ redirectUri: window.location.origin });
    },

    /**
     * Returns the current access token string.
     */
    getToken(): string | undefined {
        return keycloak.token;
    },

    /**
     * Returns whether the user is currently authenticated.
     */
    isAuthenticated(): boolean {
        return !!keycloak.authenticated;
    },

    /**
     * Refreshes the token if it expires within `minValidity` seconds.
     * Returns true if the token was successfully refreshed.
     */
    async refreshToken(minValidity: number = 30): Promise<boolean> {
        if(!keycloak.token) return false
        try {
            return await keycloak.updateToken(minValidity);
        } catch(error) {
            console.error('Token refresh failed', error);
            return false;
        }
    },

    /**
     * Parses the JWT token payload and returns an AuthUser object.
     */
    getUser(): AuthUser | null {
        if (!keycloak.tokenParsed) return null;

        const parsed = keycloak.tokenParsed as Record<string, unknown>;

        console.log(parsed, 'as Token Parsed from token');

        return {
            sub: (parsed.sub as string) || '',
            preferred_username: (parsed.preferred_username as string) || '',
            email: (parsed.email as string) || '',
            last_name: parsed.family_name as string || '',
            first_name: parsed.given_name as string || '',
            realm_access: (parsed.realm_access as AuthUser['realm_access']) || { roles: [] },
            resource_access: (parsed.resource_access as AuthUser['resource_access']) || {},
            scope: (parsed.scope as string) || '',
            authorities: this.getAuthorities(),
            exp: (parsed.exp as number) || 0,
            phone_number: (parsed.phone_number as string) || '',
            gender: (parsed.gender as 'M'| 'F') || 'M',
            profile: (parsed.profile as string) || null
        };
    },

    /**
     * Extracts the authorities array from the JWT token.
     * This is the ONLY source of truth for permission checks.
     */
    getAuthorities(): string[] {
        if (!keycloak.tokenParsed) return [];
        return (keycloak.tokenParsed as Record<string, unknown>).authorities as string[] || [];
    },

    /**
     * Returns the raw keycloak instance for advanced usage.
     */
    getInstance(): Keycloak {
        return keycloak;
    },

    async manageAccount(){
        return await keycloak.accountManagement()
    }
};
