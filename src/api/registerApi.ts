// src/api/registerApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  userId?: string;
}

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_USER_REGISTER_URL }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: '/uma/api/v1/auth/b2c/register',
        method: 'POST',
        body,
        headers: { firm: '397' },
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
