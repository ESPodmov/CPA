import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseUserData, UpdateUserData } from '../../types/api/userTypes'
import { BasePartnerData, UpdatePartnerData } from '../../types/api/partnerTypes'


export const conversionApi = createApi({
    reducerPath: "conversionApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
    endpoints: (builder) => ({

        getAllConverions: builder.query<any, void>({
            query: () => ({
                url: 'api/conversions/all/',
                method: "GET",
            })
        }),

    })
})

export const {
    useGetAllConverionsQuery,
} = conversionApi
