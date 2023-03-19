import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    details: null,
    fetchState: 'idle' // idle, pending, error
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.details = payload;
        },
        removeUser: (state) => {
            state.details = null;
        }
    }
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
