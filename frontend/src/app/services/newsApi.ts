import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


type BaseNewsData = {
    title: string,
    body: string,
    creator: number,
    is_published: boolean | null,
}

type UpdateNewsData = Partial<BaseNewsData>


// interface Offer {
//     pk: number;
//     image: File | string; // При создании объекта Offer изображение будет файлом, при отображении - строкой (URL-адрес)
//     name: string;
//     type: number; // Идентификатор типа
//     category: number; // Идентификатор категории
//     reward_from: number | null;
//     reward_to: number | null;
//     medias: number[]; // Массив идентификаторов медиафайлов
//     description: string;
//     rules: string;
//     target_action: number | null; // Идентификатор целевого действия
//     source_url: string;
//   }



export const newsApi = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
    endpoints: (builder) => ({
        createNewsItem: builder.mutation<any, BaseNewsData>({
            query: (data: BaseNewsData) => ({
                url: 'api/news/create/',
                method: "POST",
                body: data
            })
        }),

        getAllNews: builder.query<any, void>({
            query: () => ({
                url: 'api/news/',
                method: "GET"
            })
        }),

        getShortNewsItem: builder.query<any, {pk: number | string}>({
            query: ({pk}) => ({
                url: `api/news/${pk}/`,
                method: "GET"
            })
        }),

        getAllNewsToEdit: builder.query<any, void>({
            query: () => ({
                url: 'api/news/edit/all/',
                method: "GET"
            })
        }),

        updateNewsItem: builder.mutation<any, {data: UpdateNewsData, pk: number | string}>({
            query: ({data, pk}) => ({
                url: `api/news/${pk}/edit/`,
                method: "PATCH",
                body: data
            })
        }),

        getFullNewsItem: builder.query<any, {pk: number | string}>({
            query: ({pk}) => ({
                url: `api/news/${pk}/edit/`,
                method: 'GET',
            })
        }),

        deleteNewsItem: builder.mutation<any, {pk: number | string}>({
            query: ({pk}) => ({
                url: `api/news/${pk}/delete/`,
                method: 'DELETE',
            })
        }),

    })
})

export const {
    useCreateNewsItemMutation,
    useGetAllNewsQuery,
    useGetShortNewsItemQuery,
    useGetAllNewsToEditQuery,
    useUpdateNewsItemMutation,
    useGetFullNewsItemQuery,
    useDeleteNewsItemMutation,
} = newsApi