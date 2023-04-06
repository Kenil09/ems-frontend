import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../service/service';
import { startLoader, endLoader } from './loaderSlice';

const initialState = {
    data: [],
    fetchState: 'idle'
};
export const fetchAllLeaves = createAsyncThunk('leave/fetchAllLeaves', async (params, { dispatch }) => {
    try {
        dispatch(startLoader());
        const url = `/leave/`;
        const { data } = await apiClient().get(url);
        dispatch(endLoader());
        return data?.leaves;
    } catch (error) {
        //(error);
    }
});

const leaveSlice = createSlice({
    name: 'leaves',
    initialState,
    reducers: {
        applyLeave: (state, { payload }) => {
            state.data.push(payload);
        },
        cancelLeave: (state, { payload }) => {
            const { leaveId, message } = payload;
            const leaveIndex = state.data.findIndex((l) => l._id === leaveId);

            if (leaveIndex !== -1) {
                const updatedLeave = { ...state.data[leaveIndex] };
                if (message) {
                    updatedLeave.CancelledMessage = message;
                }
                updatedLeave.Status = 'Rejected';
                state.data[leaveIndex] = updatedLeave;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLeaves.fulfilled, (state, { payload }) => {
                state.data = payload;
                state.fetchState = 'idle';
            })
            .addCase(fetchAllLeaves.pending, (state) => {
                state.fetchState = 'pending';
            })
            .addCase(fetchAllLeaves.rejected, (state) => {
                state.fetchState = 'error';
            });
    }
});

export const { applyLeave, cancelLeave } = leaveSlice.actions;

export default leaveSlice.reducer;
