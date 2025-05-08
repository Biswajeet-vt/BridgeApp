import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://user-auth-gateway-staging.viewtrade.in/uma/api/v1/auth/b2c/login' }),
  endpoints: (builder) => ({
    auth: builder.mutation<{ accessToken: string }, { login: string; password: string }>({
      query: ({ login, password }) => ({
        url: '/basic',
        method: 'POST',
        body: { login, password, device_id : "0"
 },
 headers: {   firm: "397",}
      }),
    }),
    getWatchmenToken: builder.mutation<{ token: string }, { accessToken: string }>({
      query: ({ accessToken }) => ({
        url: '/watchmen',
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    }),
    getSessionId: builder.mutation<{ sessionId: string }, { watchmenToken: string }>({
      query: ({ watchmenToken }) => ({
        url: '/sso',
        method: 'GET',
        headers: { Authorization: `Bearer ${watchmenToken}` },
      }),
    }),
  }),
});
export const {
  useAuthMutation,
  useGetWatchmenTokenMutation,
  useGetSessionIdMutation,
} = authApi;