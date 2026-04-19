import { setupWorker } from 'msw/browser';
import {servicesHandlers} from "./service.mock.ts";
import {usersHandlers} from "./user.mock.ts";

const handlers = [
    ...servicesHandlers,
    ...usersHandlers
]

export const worker = setupWorker(...handlers);