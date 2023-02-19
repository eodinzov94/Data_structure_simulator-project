import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  IUser,
  LoginPayload,
  RegisterLecturerPayload,
  RegisterPayload,
  VerificationCodePayload,
} from '../../types/Auth'
import { setEmailFor2Factor, setUser } from './auth-reducer'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api',
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
        url: `/user/auth-me`,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {
          console.log(error)
        }
      },

    }),

    login: builder.mutation<{ token: string, status: 'Redirect-2FA' | 'OK', user: IUser,email?:string }, LoginPayload>({
      query: (payload) => ({
        url: `/user/login`,
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.status === 'OK') {
            localStorage.setItem('accessToken', data.token)
            dispatch(setUser(data.user))
          }else if(data.status === 'Redirect-2FA' && data.email){
            dispatch(setEmailFor2Factor(data.email))
          }
        } catch (error) {
          console.log(error)
        }
      },

    }),

    register: builder.mutation<{ token: string, status: string, user: IUser }, RegisterPayload>({
      query: (payload) => ({
        url: `/user/register`,
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
    registerLecturer: builder.mutation<{ token: string, status: string, user: IUser }, RegisterLecturerPayload>({
      query: (payload) => ({
        url: `/lecturer/register-lecturer`,
        method: 'POST',
        body: {...payload,role:'Lecturer'},
      }),
    }),
    verify2fa: builder.mutation<{ token: string, status: 'OK', user: IUser }, VerificationCodePayload>({
      query: (payload) => ({
        url: `/user/verify-2fa`,
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.status === 'OK') {
            localStorage.setItem('accessToken', data.token)
            dispatch(setUser(data.user))
          }
        } catch (error) {
          console.log(error)
        }
      },
    }),

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
export const { useAuthMeQuery, useLoginMutation, useRegisterMutation,useVerify2faMutation,useRegisterLecturerMutation } = authApi
