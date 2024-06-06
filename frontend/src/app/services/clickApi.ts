import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const clickApi = createApi({
    reducerPath: "clickApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL, credentials: "include" }),
    endpoints: (builder) => ({

        getAllClicks: builder.query<any, { from?: string; to?: string }>({
            query: ({ from, to }) => {
                const params = new URLSearchParams();
                if (from) params.append('from', from);
                if (to) params.append('to', to);
                return {
                    url: `api/clicks/all/?${params.toString()}`,
                    method: "GET",
                }
            }
        }),

    })
})

export const {
    useGetAllClicksQuery,
    useLazyGetAllClicksQuery,
} = clickApi
