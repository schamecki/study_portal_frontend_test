import { http, HttpResponse } from 'msw';
import {sleep} from "../../useful/time.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const aviHandlers = [
    http.post(`${BASE_URL}/api/avi/firstStep`, async ({request}) => {
        const data = request.body
        console.log(data)
        await sleep()
        return HttpResponse.json(
            {
                data: true,
                success: true,
                message: 'Services fetched successfully',
            }
        );
    }),
]