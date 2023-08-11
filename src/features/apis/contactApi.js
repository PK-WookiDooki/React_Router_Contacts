import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
    reducerPath: "contactsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/contacts" }),
    tagTypes: ["api"],
    endpoints: (builder) => ({
        getAllContacts: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["api"],
        }),

        getContactById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: "GET",
            }),
            providesTags: ["api"],
        }),

        createNewContact: builder.mutation({
            query: (contact) => ({
                url: `/`,
                method: "POST",
                body: contact,
            }),
            invalidatesTags: ["api"],
        }),

        updateContact: builder.mutation({
            query: ({ id, contact }) => ({
                url: `/${id}`,
                method: "PUT",
                body: contact,
            }),
            invalidatesTags: ["api"],
        }),

        deleteContact: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["api"],
        }),

        setFavorite: builder.mutation({
            query: ({ id, contact }) => ({
                url: `/${id}`,
                method: "PUT",
                body: contact,
            }),
            invalidatesTags: ["api"],
        }),
    }),
});

export const {
    useGetAllContactsQuery,
    useGetContactByIdQuery,
    useCreateNewContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation,
    useSetFavoriteMutation,
} = contactApi;
