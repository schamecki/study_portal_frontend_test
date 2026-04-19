import axios, { type AxiosInstance } from 'axios';
import { keycloakService } from './keycloak.service';

// --------------- Axios Instance ---------------

const keycloackApiClient: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_KEYCLOAK_URL}` || 'http://localhost:8080',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --------------- Request Interceptor ---------------
// Injects the JWT Bearer token into every outgoing request.

keycloackApiClient.interceptors.request.use(
    async (config) => {
        if (keycloakService.getToken()) {
            await keycloakService.refreshToken(30);
            const token = keycloakService.getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config
    },
    (error) => Promise.reject(error),
);

export default keycloackApiClient;