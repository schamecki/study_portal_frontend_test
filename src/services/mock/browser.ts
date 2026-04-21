import { setupWorker } from 'msw/browser';
import {servicesHandlers} from "./service.mock.ts";
import {usersHandlers} from "./user.mock.ts";
import {aviHandlers} from "./avi.mock";

const handlers = [
    ...servicesHandlers,
    ...usersHandlers,
    ...aviHandlers
]

export const worker = setupWorker(...handlers);