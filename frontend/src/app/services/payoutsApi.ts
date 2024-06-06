import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BasePayoutData, UpdatePayoutData } from '../../types/api/paytoutTypes'


export const payoutApi = createApi({
    reducerPath: "payoutApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL, credentials: "include" }),
    endpoints: (builder) => ({
        updatePayout: builder.mutation<any, { data: UpdatePayoutData, pk: number | string }>({
            query: ({ data, pk }) => ({
                url: `api/payouts/${pk}/edit/`,
                method: "PATCH",
                body: data
            })
        }),

        getAllPayouts: builder.query<any, { from?: string; to?: string }>({
            query: ({ from, to }) => {
                const params = new URLSearchParams();
                if (from) params.append('from', from);
                if (to) params.append('to', to);
                return {
                    url: `api/payouts/all/?${params.toString()}`,
                    method: "GET",
                }
            }
        }),

    })
})

export const {
    useGetAllPayoutsQuery,
    useLazyGetAllPayoutsQuery,
    useUpdatePayoutMutation,
} = payoutApi
