import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser, LoginPayload } from '../../types/Auth'
import { setUser } from './auth-reducer'


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/user',
    prepareHeaders: (headers, { endpoint }) => {
      const token = localStorage.getItem('accessToken')
      if (token && endpoint !== 'login') {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },

  }),
  endpoints: (builder) => ({
    authMe: builder.query<IUser, null>({
      query: () => ({
        url: `/auth-me`,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {
          console.log(error)
        }
        return
      },

    }),

    login: builder.mutation<{ token: string, status: string ,user:IUser}, LoginPayload>({
      query: (payload) => ({
        url: `/login`,
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          localStorage.setItem('accessToken', data.token)
          dispatch(setUser(data.user))
        } catch (error) {
          console.log(error)
        }
      },

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
export const { useAuthMeQuery, useLoginMutation } = authApi
