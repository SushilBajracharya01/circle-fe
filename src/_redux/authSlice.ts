import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from './store';

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