import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseTargetActionData, UpdateTargetActionData } from '../../../types/api/targetActionTypes'


export const targetActionApi = createApi({
    reducerPath: "targetActionApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL, credentials: 'include' }),
    endpoints: (builder) => ({
        updateTargetAction: builder.mutation<any, { data: UpdateTargetActionData, pk: string | number }>({
            query: ({ data, pk }) => ({
                url: `api/offers/target-actions/${pk}/edit/`,
                method: "PATCH",
                body: data
            })
        }),

        deleteTargetAction: builder.mutation<any, { pk: string | number }>({
            query: ({ pk }) => ({
                url: `api/offers/target-actions/${pk}/edit/`,
                method: "DELETE",
            })
        }),

        getTargetAction: builder.query<any, { pk: string | number }>({
            query: ({ pk }) => ({
                url: `api/offers/target-actions/${pk}/`,
                method: "GET"
            })
        }),

        createTargetAction: builder.mutation<any, BaseTargetActionData>({
            query: (data: BaseTargetActionData) => ({
                url: 'api/offers/target-actions/create/',
                method: "POST",
                body: data
            })
        }),

        getAllTargetActions: builder.query<any, void>({
            query: () => ({
                url: 'api/offers/target-actions/all/',
                method: "GET",
            })
        }),

    })
})

export const {
    useCreateTargetActionMutation,
    useDeleteTargetActionMutation,
    useGetAllTargetActionsQuery,
    useGetTargetActionQuery,
    useUpdateTargetActionMutation,
} = targetActionApi
