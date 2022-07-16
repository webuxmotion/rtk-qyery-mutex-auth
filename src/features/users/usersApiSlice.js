import { apiSlice } from "../../app/api/apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserDetails: builder.query({
            query: () => '/user/details',
            keepUnusedDataFor: 1,
        }),
        getCartContent: builder.query({
            query: () => '/cart/content',
            keepUnusedDataFor: 1,
        }),
        getCartInfo: builder.query({
            query: () => '/cart/info',
            keepUnusedDataFor: 0,
        }),
    })
})

export const {
    useGetUserDetailsQuery,
    useGetCartContentQuery,
    useGetCartInfoQuery,
} = usersApiSlice 