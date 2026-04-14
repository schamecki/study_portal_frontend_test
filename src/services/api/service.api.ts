import {API_ENDPOINTS, type ApiResponse, type Service} from "../../contracts/api-contracts.ts";
import apiClient from "../api-service.ts";

export async function getAppServices():Promise<Service[]> {
    const response = await apiClient.get<ApiResponse<Service[]>>(API_ENDPOINTS.SERVICE.BASE)
    return response.data.data
}