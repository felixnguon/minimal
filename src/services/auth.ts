// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/store'
import { ERoles } from '@/enums/roles'

export interface User {
  username: string
  role: ERoles
}

export interface UserResponse {
  user: User
  token: string
}

export interface LoginRequest {
  username: string
  password: string
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://reqres.in/api' || process.env.API_ENDPOINT, // TODO: Add env variable

    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        // url: 'auth/login',
        url: '/user',  // TODO: fix URL
        method: 'POST',
        body: credentials,
      }),
    }),
    verifyLoginCode: builder.mutation<UserResponse, string>({
      query: (otp) =>({
        // url: 'auth/verify_login_code',
        url: 'user', // TODO: fix URL
        method: 'POST',
        body: { otp },
      })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useVerifyLoginCodeMutation } = authApi
