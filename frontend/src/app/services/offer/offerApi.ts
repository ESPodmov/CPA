import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseOfferData, UpdateOfferData } from '../../../types/api/offerTypes'


export const offerApi = createApi({
    reducerPath: "offerApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL, credentials: 'include' }),
    endpoints: (builder) => ({
        updateOffer: builder.mutation<any, { data: UpdateOfferData, pk: string | number }>({
            query: ({ data, pk }) => ({
                url: `api/offers/${pk}/edit/`,
                method: "PATCH",
                body: data
            })
        }),

        deleteOffer: builder.mutation<any, { pk: string | number }>({
            query: ({ pk }) => ({
                url: `api/offers/${pk}/edit/`,
                method: "DELETE",
            })
        }),

        getOffer: builder.query<any, { pk: string | number }>({
            query: ({ pk }) => ({
                url: `api/offers/${pk}/`,
                method: "GET"
            })
        }),

        createOffer: builder.mutation<any, BaseOfferData>({
            query: (data: BaseOfferData) => ({
                url: 'api/offers/create/',
                method: "POST",
                body: data
            })
        }),

        getAllOffers: builder.query<any, { category_pk: number | string }>({
            query: ({ category_pk }) => ({
                url: `api/offers/all/?category=${category_pk}`,
                method: "GET",
            })
        }),

        connectOffer: builder.mutation<any, { pk: string | number }>({
            query: ({ pk }) => ({
                url: `api/offers/${pk}/connect/`,
                method: "POST"
            })
        }),


        getAllConnectedOffers: builder.query<any, void>({
            query: () => ({
                url: 'api/offers/all/connected/',
                method: "GET"
            })
        })

    })
})

export const {
    useCreateOfferMutation,
    useDeleteOfferMutation,
    useGetAllOffersQuery,
    useGetOfferQuery,
    useUpdateOfferMutation,
    useLazyGetAllOffersQuery,
    useLazyGetAllConnectedOffersQuery,
    useConnectOfferMutation
} = offerApi
