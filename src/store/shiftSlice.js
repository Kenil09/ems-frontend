import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../service/service';
import { startLoader, endLoader } from './loaderSlice';

const initialState = {
    data: [],
    fetchState: 'idle'
};

export const fetchShifts = createAsyncThunk('shift/fetchShifts', async (companyId, { dispatch }) => {
    try {
        dispatch(startLoader());
        const { data } = await apiClient().get(`/shift/${companyId}`);
        dispatch(endLoader());
        return data?.shifts;
    } catch (error) {
        console.log(error);
    }
});

const shiftSlice = createSlice({
    name: 'shift',
    initialState,
    reducers: {
        addShift: (state, { payload }) => {
            state.data.push(payload);
        },
        updateShift: (state, { payload }) => {
            const index = state.data.findIndex((shift) => shift._id === payload._id);
            state.data[index] = payload;
        },
        deleteShift: (state, { payload }) => {
            const shifts = state.data;
            const deleteShift = shifts.filter((shift) => shift._id !== payload._id);
            state.data = deleteShift;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShifts.fulfilled, (state, { payload }) => {
                state.data = payload;
                state.fetchState = 'idle';
            })
            .addCase(fetchShifts.pending, (state) => {
                state.fetchState = 'pending';
            })
            .addCase(fetchShifts.rejected, (state) => {
                state.fetchState = 'error';
            });
    }
});

export const { addShift, updateShift, deleteShift } = shiftSlice.actions;

export default shiftSlice.reducer;
