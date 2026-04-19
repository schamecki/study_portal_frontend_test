import { http, HttpResponse } from 'msw';
import type {UserPasswordRequest, UserProfileRequest} from "../../contracts/api-contracts.ts";
import keycloackApiClient from "../keycloack-api-service.ts";
import {realm} from "../keycloak.service.ts";
import {sleep} from "../../useful/time.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
let number = 3

export const usersHandlers = [
    http.patch(`${BASE_URL}/api/users/account/profile`, async ({request}) => {
        const data = await request.json() as UserProfileRequest;
        await sleep()
        await keycloackApiClient.post(`/realms/${realm}/account`, data)

        return HttpResponse.json(
            {
                data,
                success: true,
                message: 'Services fetched successfully',
            }
        );
    }),
    http.patch(`${BASE_URL}/api/users/account/password`, async ({request}) => {
        const data = await request.json() as UserPasswordRequest;
        await sleep()
        await keycloackApiClient.post(`/realms/${realm}/account/credentials/password`, data)

        return HttpResponse.json(
            {
                data,
                success: true,
                message: 'Services fetched successfully',
            }
        );
    }),

    http.get(`${BASE_URL}/api/users/account/me`, async () => {
        const response = await keycloackApiClient.get(`/realms/${realm}/account`);
        await sleep()
        const {data} = response

        const {email, firstName, lastName, attributes} = data
        return HttpResponse.json(
            {
                email,
                firstName,
                lastName,
                attributes
            }
        )
    }),
    http.patch(`${BASE_URL}/api/users/account/avatar`, async ({request}) => {
        const data = await request.formData()
        console.log(data)
        await sleep()
        const url = `https://randomuser.me/api/portraits/men/${number}.jpg`
        number++
        return HttpResponse.json(
            {
                data: {profile: url},
                success: true,
                message: 'Services fetched successfully',
            }
        );
    })
];