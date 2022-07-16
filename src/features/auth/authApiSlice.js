import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => {

                return {
                    url: '/auth/sign-in',
                    method: 'POST',
                    body: { 
                        email: btoa(credentials.user),
                        password: btoa(credentials.pwd)
                     }
                }
            }
        }),
    })
})

export const {
    useLoginMutation
} = authApiSlice