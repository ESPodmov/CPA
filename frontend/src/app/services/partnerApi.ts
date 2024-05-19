import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BasePartnerData, UpdatePartnerData } from '../../types/api/partnerTypes'


export const partnerApi = createApi({
    reducerPath: "partnerApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
    endpoints: (builder) => ({
        updatePartner: builder.mutation<any, { data: UpdatePartnerData, pk: number | string }>({
            query: ({ data, pk }) => ({
                url: `api/offers/partners/${pk}/edit/`,
                method: "PATCH",
                body: data
            })
        }),

        deletePartner: builder.mutation<any, {pk: number | string}>({
            query: ({pk}) => ({
                url: `api/offers/partners/${pk}/edit/`,
                method: "DELETE",
            })
        }),

        getPartner: builder.query<any, {pk: number | string}>({
            query: ({pk}) => ({
                url: `api/offers/partners/${pk}/`,
                method: "GET"
            })
        }),

        createPartner: builder.mutation<any, BasePartnerData>({
            query: (data: BasePartnerData) => ({
                url: 'api/offers/partners/create/',
                method: "POST",
                body: data
            })
        }),

        getAllPartners: builder.query<any, void>({
            query: () => ({
                url: 'api/offers/partners/all/',
                method: "GET",
            })
        }),

    })
})

export const {
    useUpdatePartnerMutation,
    useDeletePartnerMutation,
    useGetPartnerQuery,
    useCreatePartnerMutation,
    useGetAllPartnersQuery,
    // useLazyGetAllPartnersQuery
} = partnerApi
