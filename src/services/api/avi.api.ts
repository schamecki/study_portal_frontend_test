import apiClient from "../api-service.ts";
import {API_ENDPOINTS, type ApiResponse} from "../../contracts/api-contracts.ts";

export async function postAviFirstStep (data: FormData):Promise<boolean> {
    const response = await apiClient.post<ApiResponse<{data: boolean}>>(API_ENDPOINTS.AVI.STEP1, data, {headers: {
            "Content-Type": "multipart/form-data"
        }});
    return response.data.data.data
}