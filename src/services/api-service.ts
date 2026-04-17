import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { keycloakService } from './keycloak.service';

// --------------- Axios Instance ---------------

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --------------- Request Interceptor ---------------
// Injects the JWT Bearer token into every outgoing request.

apiClient.interceptors.request.use(
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

// --------------- Response Interceptor ---------------
// On network error or 5xx, falls back to mock data.

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const config = error.config;
        if (!config) return Promise.reject(error);


        // Handle 401 — attempt token refresh then retry once
        if (error.response?.status === 401) {
            try{
                const refreshed = await keycloakService.refreshToken(0);
                if (refreshed && config) {
                    const token = keycloakService.getToken();
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                    return apiClient(config);
                }
                await keycloakService.logout();
            }catch(err){
                // Refresh failed — redirect to login
                await keycloakService.logout();

                console.log(err)
            }
        }

        return Promise.reject(error);
    },
);

export default apiClient;