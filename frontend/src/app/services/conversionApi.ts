import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseUserData, UpdateUserData } from '../../types/api/userTypes'
import { BasePartnerData, UpdatePartnerData } from '../../types/api/partnerTypes'


export const conversionApi = createApi({
    reducerPath: "conversionApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL, credentials: "include" }),
    endpoints: (builder) => ({

        getAllConverions: builder.query<any, { from?: string, to?: string }>({
            query: ({ from, to }) => {
                const params = new URLSearchParams();
                if (from) params.append('from', from);
                if (to) params.append('to', to);
                return {
                    url: `api/conversions/all/?${params.toString()}`,
                    method: "GET",
                }
            }
        }),

    })
})

export const {
    useGetAllConverionsQuery,
    useLazyGetAllConverionsQuery
} = conversionApi
