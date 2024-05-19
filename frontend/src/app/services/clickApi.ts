import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const clickApi = createApi({
    reducerPath: "clickApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
    endpoints: (builder) => ({

        getAllClicks: builder.query<any, void>({
            query: () => ({
                url: 'api/clicks/all/',
                method: "GET",
            })
        }),

    })
})

export const {
    useGetAllClicksQuery,
} = clickApi
