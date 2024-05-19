import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseOfferTypeData, UpdateOfferTypeData } from '../../../types/api/offerTypeTypes'


export const offerTypeApi = createApi({
    reducerPath: "offerTypeApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
    endpoints: (builder) => ({
        updateOfferType: builder.mutation<any, { data: UpdateOfferTypeData, pk: string | number }>({
            query: ({ data, pk }) => ({
                url: `api/offers/types/${pk}/edit/`,
                method: "PATCH",
                body: data
            })
        }),

        deleteOfferType: builder.mutation<any, { pk: string | number }>({
            query: ({ pk }) => ({
                url: `api/offers/types/${pk}/edit/`,
                method: "DELETE",
            })
        }),

        getOfferType: builder.query<any, { pk: string | number }>({
            query: ({ pk }) => ({
                url: `api/offers/types/${pk}/`,
                method: "GET"
            })
        }),

        createOfferType: builder.mutation<any, BaseOfferTypeData>({
            query: (data: BaseOfferTypeData) => ({
                url: 'api/offers/types/create/',
                method: "POST",
                body: data
            })
        }),

        getAllOfferTypes: builder.query<any, void>({
            query: () => ({
                url: 'api/offers/types/all/',
                method: "GET",
            })
        }),

    })
})

export const {
    useCreateOfferTypeMutation,
    useDeleteOfferTypeMutation,
    useGetAllOfferTypesQuery,
    useGetOfferTypeQuery,
    useUpdateOfferTypeMutation,
} = offerTypeApi
