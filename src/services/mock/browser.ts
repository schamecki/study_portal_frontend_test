import { setupWorker } from 'msw/browser';
import {servicesHandlers} from "./service.mock.ts";

const handlers = [
    ...servicesHandlers
]

export const worker = setupWorker(...handlers);