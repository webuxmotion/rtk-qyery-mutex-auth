import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { setCredentials, logOut } from '../../features/auth/authSlice'
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult = await baseQuery('/refresh', api, extraOptions)
                
                if (refreshResult?.data) {
                    const user = api.getState().auth.user
                    // store the new token 
                    api.dispatch(setCredentials({ ...refreshResult.data, user }))
                    // retry the original query with new access token 
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    api.dispatch(logOut())
                }
              } finally {
                // release must be called once the mutex should be released again.
                release()
              }

        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
        
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})