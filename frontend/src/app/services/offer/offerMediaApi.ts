import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseOfferMediaData, UpdateOfferMediaData } from '../../../types/api/offerMediaTypes'


export const offerMediaApi = createApi({
    reducerPath: "offerMediaApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL, credentials: 'include' }),
    endpoints: (builder) => ({
        updateOfferMedia: builder.mutation<any, { data: UpdateOfferMediaData, offer: string | number, pk: string | number }>({
            query: ({data, offer, pk}) => ({
                url: `api/offers/${offer}/media/${pk}/edit/`,
                method: "PATCH",
                body: data
            })
        }),

        deleteOfferMedia: builder.mutation<any, { offer: string | number, pk: string | number }>({
            query: ({offer, pk}) => ({
                url: `api/offers/${offer}/media/${pk}/edit/`,
                method: "DELETE",
            })
        }),

        createOfferMedia: builder.mutation<any, { data: BaseOfferMediaData, offer: string | number }>({
            query: ({data, offer}) => ({
                url: `api/offers/${offer}/media/create/`,
                method: "POST",
                body: data
            })
        }),

        getAllOfferMedias: builder.query<any, { offer: string | number }>({
            query: ({offer}) => ({
                url: `api/offers/${offer}/media/all/`,
                method: "GET",
            })
        }),

    })
})

export const {
    useCreateOfferMediaMutation,
    useDeleteOfferMediaMutation,
    useUpdateOfferMediaMutation,
    useGetAllOfferMediasQuery,
} = offerMediaApi
