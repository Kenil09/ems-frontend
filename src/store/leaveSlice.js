import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../service/service';
import { startLoader, endLoader } from './loaderSlice';

const initialState = {
    data: [],
    fetchState: 'idle'
};
export const fetchLeaves = createAsyncThunk('leave/fetchLeaves', async (id, { dispatch }) => {
    try {
        dispatch(startLoader());
        const url = `/leave/${id}`;
        const { data } = await apiClient().get(url);
        dispatch(endLoader());
        return data?.leaves;
    } catch (error) {
        //(error);
    }
});

const leaveSlice = createSlice({
    name: 'leave',
    initialState,
    reducers: {
        addLeave: (state, { payload }) => {
            state.data = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeaves.fulfilled, (state, { payload }) => {
                state.data = payload;
                state.fetchState = 'idle';
            })
            .addCase(fetchLeaves.pending, (state) => {
                state.fetchState = 'pending';
            })
            .addCase(fetchLeaves.rejected, (state) => {
                state.fetchState = 'error';
            });
    }
});

export const { addLeave } = leaveSlice.actions;

export default leaveSlice.reducer;
