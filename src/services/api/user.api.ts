import {
    API_ENDPOINTS,
    type ApiResponse,
    type UserPasswordRequest,
    type UserProfileRequest
} from "../../contracts/api-contracts.ts";
import apiClient from "../api-service.ts";

export async function updateUserProfile(data: UserProfileRequest):Promise<UserProfileRequest> {
    const response = await apiClient.patch<ApiResponse<UserProfileRequest>>(API_ENDPOINTS.USER.PROFILE, data);
    return response.data.data
}

export async function updateUserAvatar(data: FormData):Promise<{profile: string}> {
    const response = await apiClient.patch<ApiResponse<{profile: string}>>(API_ENDPOINTS.USER.AVATAR, data, {headers: {
        "Content-Type": "multipart/form-data"
        }});
    return response.data.data
}

export async function updateUserPassword(data: UserPasswordRequest):Promise<UserPasswordRequest> {
    const response = await apiClient.patch<ApiResponse<UserPasswordRequest>>(API_ENDPOINTS.USER.PASSWORD, data)
    return response.data.data
}

export async function getCurrenUser(): Promise<UserProfileRequest> {
    const response = await apiClient.get<UserProfileRequest>(API_ENDPOINTS.USER.ME);

    return response.data;
}