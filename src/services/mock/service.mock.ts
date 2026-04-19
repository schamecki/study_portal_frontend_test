import { http, HttpResponse } from 'msw';
import {MOCK_SERVICES} from "./data/service.mock.ts";
import {sleep} from "../../useful/time.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const servicesHandlers = [
    http.get(`${BASE_URL}/api/services`, async () => {
        await sleep()
        return HttpResponse.json(
            {
                data: MOCK_SERVICES.filter(service => service.active),
                success: true,
                message: 'Services fetched successfully',
            }
        );
    }),
];