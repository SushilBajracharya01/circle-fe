import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from './store';

const initialState = {
    notifications: []
}

const notificationSlice = createSlice({
    name: "notification",
    initialState: initialState,
    reducers: {
        setNotitificaitons: (state, action) => {
            state.notifications = action.payload;
        }
    }
});

export const { setNotitificaitons } = notificationSlice.actions

export default notificationSlice.reducer;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleSetNotifications = (data: any) => (dispatch: AppDispatch) => {
    dispatch(setNotitificaitons(data));
}