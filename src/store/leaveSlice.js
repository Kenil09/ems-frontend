import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../service/service';

const initialState = {
    data: [],
    fetchState: 'idle'
};
export const fetchLeaves = createAsyncThunk('leave/fetchLeaves', async (id) => {
    try {
        const url = `/leave/${id}`;
        const { data } = await apiClient().get(url);
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
        // deleteDepartment: (state, { payload }) => {
        //     const department = state.data;
        //     const deleteDepartment = department.filter((department) => department._id !== payload._id);
        //     state.data = deleteDepartment;
        // }
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
