import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { setCredentials, logOut } from '../../features/auth/authSlice'
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/v1/`,
    credentials: 'include',
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const auth = api.getState().auth;
                
                const refreshResult = await baseQuery({
                    url: args,
                    headers: {
                        'enaminerefreshauth': auth.token
                    },
                }, api, extraOptions);
                
                if (refreshResult?.data) {
                    const user = api.getState().auth.user;
                    const token = refreshResult.meta.response.headers.get('enaminerefreshauth');
                    
                    // store the new token 
                    api.dispatch(setCredentials({ refreshToken: token, user }))
                    // retry the original query with new access token 
                    result = refreshResult;
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