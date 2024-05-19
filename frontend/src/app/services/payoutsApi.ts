import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BasePayoutData, UpdatePayoutData } from '../../types/api/paytoutTypes'


export const payoutApi = createApi({
    reducerPath: "payoutApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
    endpoints: (builder) => ({
        updatePayout: builder.mutation<any, {data: UpdatePayoutData, pk: number | string}>({
            query: ({data, pk}) => ({
                url: `api/payouts/${pk}/edit/`,
                method: "PATCH",
                body: data
            })
        }),

        getAllPayouts: builder.query<any, void>({
            query: () => ({
                url: 'api/payouts/all/',
                method: "GET",
            })
        }),

    })
})

export const {
    useGetAllPayoutsQuery,
    useUpdatePayoutMutation,
} = payoutApi
