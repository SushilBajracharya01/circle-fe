import jsCookie from 'js-cookie';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from './store';
import { LOCAL_REFRESH_TOKEN_NAME } from '../constants/constants';

const authSlice = createSlice({
    name: "auth",
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const accessToken = action.payload;
            state.token = accessToken;
        },
        logOut: (state) => {
            state.token = null
        }
    }
});

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer;

export const logOutUser = () => (dispatch: AppDispatch) => {
    dispatch(logOut());
}

export const handleSetCredentials = (data: { accessToken: 'string', refreshToken: 'string' }) => (dispatch: AppDispatch) => {
    const { accessToken, refreshToken } = data;
    dispatch(setCredentials(accessToken));

    jsCookie.set(LOCAL_REFRESH_TOKEN_NAME, refreshToken);
}