import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IUser, LoginPayload} from "../../types/Auth";

// Define a service using a base URL and expected endpoints

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/user',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken")
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        auth: builder.mutation<IUser, IUser>({
            query: () => ({
                url: `/auth`,
                method: 'POST'
            }),
        }),
        login: builder.mutation<LoginPayload, IUser>({
            query: (payload) => ({
                url: `/login`,
                method: 'POST',
                body: payload
            }),
        }),
        // register: builder.query<any>({
        //     query: () => `/lecturer/report/general-report`,
        // }),
        // login2fa: builder.query< any>({
        //     query: () => `/lecturer/report/general-report`,
        // }),

        // forgotPassword: builder.query< any>({
        //     query: () => `/lecturer/report/general-report`,
        // }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAuthMutation, useLoginMutation } = authApi
