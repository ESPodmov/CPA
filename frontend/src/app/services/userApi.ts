import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseUserData, UpdateUserData } from '../../types/api/userTypes'


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<any, BaseUserData>({
            query: (data: BaseUserData) => ({
                url: 'api/users/user/',
                method: "POST",
                body: data
            })
        }),

        loginUser: builder.mutation<any, BaseUserData>({
            query: (data: BaseUserData) => ({
                url: 'api/users/login/',
                method: "POST",
                body: data
            })
        }),

        logoutUser: builder.mutation<any, void>({
            query: () => ({
                url: 'api/users/logout/',
                method: "POST"
            })
        }),

        deleteUser: builder.mutation<any, { pk: number } | void>({
            query: (data) => ({
                url: 'api/users/user/',
                method: "DELETE",
                body: data
            })
        }),

        updateUser: builder.mutation<any, UpdateUserData>({
            query: (data: UpdateUserData) => ({
                url: 'api/users/user/',
                method: "UPDATE",
                body: data
            })
        }),

        getUser: builder.query<any, void>({
            query: () => ({
                url: 'api/users/user/',
                method: "GET"
            })
        }),

        getOtherUser: builder.query<any, {param: string, val: number | string}>({
            query: ({param, val}) => ({
                url: `api/users/user/?${param}=${val}}`,
                method: "GET",
            })
        })

    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useGetUserQuery,
    useGetOtherUserQuery,
} = userApi
