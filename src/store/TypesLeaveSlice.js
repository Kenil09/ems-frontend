import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../service/service';

const initialState = {
    data: [],
    fetchState: 'idle'
};
export const fetchTypeLeaves = createAsyncThunk('designation/fetchDesignations', async (id) => {
    try {
        const url = `/leave/typesLeave/${id}`;
        const { data } = await apiClient().get(url);
        return data?.leaves;
    } catch (error) {
        //(error);
    }
});

const TypesLeaveSlice = createSlice({
    name: 'TypesLeave',
    initialState,
    reducers: {
        AddLeaveAccount: (state, { payload }) => {
            state.data = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTypeLeaves.fulfilled, (state, { payload }) => {
                state.data = payload;
                state.fetchState = 'idle';
            })
            .addCase(fetchTypeLeaves.pending, (state) => {
                state.fetchState = 'pending';
            })
            .addCase(fetchTypeLeaves.rejected, (state) => {
                state.fetchState = 'error';
            });
    }
});

export const { AddLeaveAccount } = TypesLeaveSlice.actions;

export default TypesLeaveSlice.reducer;
