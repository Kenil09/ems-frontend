import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../service/service';

const initialState = {
    data: [],
    fetchState: 'idle'
};
export const fetchAllLeaveAccount = createAsyncThunk('leave/fetchAllLeaveAccount', async () => {
    try {
        const url = `/leave/AllLeaveAccount`;
        const { data } = await apiClient().get(url);
        return data;
    } catch (error) {
        //(error);
    }
});

const AllLeaveAccountSlice = createSlice({
    name: 'AllLeaveAccount',
    initialState,
    reducers: {
        addLeave: (state, { payload }) => {
            state.data = payload;
        },
        cancelLeaveTaken: (state, { payload }) => {
            const { employee, duration, LeaveType } = payload;
            const userIndex = state.data.findIndex((user) => user.employee === employee);
            if (userIndex !== -1) {
                const newValue = state.data[userIndex][LeaveType].taken - duration;
                console.log(newValue, 'newValue');
                state.data[userIndex] = {
                    ...state.data[userIndex],
                    [LeaveType]: {
                        ...state.data[userIndex][LeaveType],
                        taken: newValue
                    }
                };
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLeaveAccount.fulfilled, (state, { payload }) => {
                state.data = payload;
                state.fetchState = 'idle';
            })
            .addCase(fetchAllLeaveAccount.pending, (state) => {
                state.fetchState = 'pending';
            })
            .addCase(fetchAllLeaveAccount.rejected, (state) => {
                state.fetchState = 'error';
            });
    }
});

export const { applyLeave, cancelLeaveTaken } = AllLeaveAccountSlice.actions;

export default AllLeaveAccountSlice.reducer;