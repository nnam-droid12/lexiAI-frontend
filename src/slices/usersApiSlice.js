import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `auth/register`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (accessToken) => ({
        url: 'auth/logout',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseHandler: (response) => response.text(),
      }),
    }),
    getEnvelopId: builder.mutation({
      query: (data) => ({
        url: `documents/upload`,
        method: 'POST',
        body: data,
      }),
    }),
}),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useGetEnvelopIdMutation
  } = userApiSlice;