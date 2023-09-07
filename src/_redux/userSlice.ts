import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from './store';
import { IUserProps } from '../types';

const initialState = {
    user: null
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { setUser } = userSlice.actions

export default userSlice.reducer;

export const handleSetUser = (data: IUserProps) => (dispatch: AppDispatch) => {
    dispatch(setUser(data));
}