import { createApi } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AuthResponse, MiddleWareResponse, SessionIdResponse, WatchmenTokenResponse } from '../types/auth';
import { getDeviceId } from '../utils/getDeviceId';

type CustomQueryArgs = {
  url: string;
  method?: string;
  body?: any;
  headers?: HeadersInit;
};

const dynamicBaseQuery: BaseQueryFn<CustomQueryArgs, unknown, unknown> = async (
  { url, method = 'GET', body, headers }
) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    if (!response.ok) {
      return { error: { status: response.status, data } };
    }

    return { data };
  } catch (error: any) {
    return { error: { status: 'FETCH_ERROR', data: error.message } };
  }
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    auth: builder.mutation<AuthResponse , { login: string; password: string; baseUrl: string }>({
      query: ({ login, password, baseUrl }) => ({
        url: `${baseUrl}/basic`,
        method: 'POST',
        body: { login, password, device_id: getDeviceId() },
        headers: { firm: '397' },
      }),
    }),

    getWatchmenToken: builder.mutation<WatchmenTokenResponse, { access_token: string; baseUrl: string }>({
      query: ({ access_token, baseUrl }) => ({
        url: `${baseUrl}/authentication-tokens`,
        method: 'POST',
        headers: { Authorization: `Bearer ${access_token}` },
      }),
    }),

    getSessionId: builder.mutation<SessionIdResponse, { watchmenToken: string; baseUrl: string }>({
      query: ({ watchmenToken, baseUrl }) => ({
        url: `${baseUrl}/platform`,
        method: 'POST',
        body: { token:watchmenToken, platform: 'uma' },
      }),
    }),

    getMiddlewareToken: builder.mutation<MiddleWareResponse, { sessionId: string|null; baseUrl: string }>({
      query: ({ sessionId, baseUrl }) => ({
        url: `${baseUrl}/authenticate`,
        method: 'POST',
        headers: { "watchmen-token":  `${sessionId}`,"firm-id":'397',"application-name":'NextGen' },
      }),
    }),
  }),
});

export const {
  useAuthMutation,
  useGetWatchmenTokenMutation,
  useGetSessionIdMutation,
  useGetMiddlewareTokenMutation
} = authApi;
