import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    fetchState: 'idle' // idle, pending, error
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        removeUser: (state) => {
            state.user = null;
        }
    }
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
