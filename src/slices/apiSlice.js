import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({baseUrl: '/api/v1', 
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('userInfo');
        const parsedToken = JSON.parse(token);
        const accessToken = parsedToken?.accessToken;

        if (accessToken) {
          headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
      },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Expense', 'User'],
    endpoints: (builder) => ({})
});