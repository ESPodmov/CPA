import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseOfferCategoryData, UpdateOfferCategoryData } from '../../../types/api/offerCategoryTypes'


export const offerCategoryApi = createApi({
    reducerPath: "offerCategoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
    endpoints: (builder) => ({
        updateOfferCategory: builder.mutation<any, {data: UpdateOfferCategoryData, pk: string | number}>({
            query: ({data, pk}) => ({
                url: `api/offers/categories/${pk}/edit/`,
                method: "PATCH",
                body: data
            })
        }),

        deleteOfferCategory: builder.mutation<any, {pk: string | number}>({
            query: ({pk}) => ({
                url: `api/offers/categories/${pk}/edit/`,
                method: "DELETE",
            })
        }),

        getOfferCategory: builder.query<any, {pk: string | number}>({
            query: ({pk}) => ({
                url: `api/offers/categories/${pk}/`,
                method: "GET"
            })
        }),

        createOfferCategory: builder.mutation<any, BaseOfferCategoryData>({
            query: (data: BaseOfferCategoryData) => ({
                url: 'api/offers/categories/create/',
                method: "POST",
                body: data
            })
        }),

        getAllOfferCategories: builder.query<any, void>({
            query: () => ({
                url: 'api/offers/categories/all/',
                method: "GET",
            })
        }),

    })
})

export const {
    useCreateOfferCategoryMutation,
    useDeleteOfferCategoryMutation,
    useGetAllOfferCategoriesQuery,
    useGetOfferCategoryQuery,
    useUpdateOfferCategoryMutation,
} = offerCategoryApi
