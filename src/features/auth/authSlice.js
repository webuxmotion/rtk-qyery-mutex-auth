import { createSlice } from "@reduxjs/toolkit"
import { PURGE } from "redux-persist";

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { user, refreshToken } = action.payload
            state.user = user
            state.token = refreshToken
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            alert('purge');
        });
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token