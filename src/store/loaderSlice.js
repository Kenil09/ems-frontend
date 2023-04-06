import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loaderState: 'idle',
    isLoading: false
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        startLoader: (state) => {
            state.loaderState = 'pending';
            state.isLoading = true;
        },
        endLoader: (state) => {
            state.loaderState = 'idle';
            state.isLoading = false;
        }
    }
});

export const { startLoader, endLoader } = loaderSlice.actions;
export const getLoader = (state) => state.loader.loaderState;
export default loaderSlice.reducer;
