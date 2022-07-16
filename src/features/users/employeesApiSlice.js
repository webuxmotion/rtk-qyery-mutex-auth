import { apiSlice } from "../../app/api/apiSlice"

export const employeesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees: builder.query({
            query: () => '/employees',
            keepUnusedDataFor: 10,
        })
    }),
})

export const {
    useGetEmployeesQuery,
} = employeesApiSlice 