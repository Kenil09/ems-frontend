import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../service/service';
import { startLoader, endLoader } from './loaderSlice';

const initialState = {
    data: [],
    fetchState: 'idle'
};

export const fetchDesignations = createAsyncThunk('designation/fetchDesignations', async (params, { dispatch }) => {
    try {
        dispatch(startLoader());
        const { data } = await apiClient().get('/designation');
        dispatch(endLoader());
        return data?.designations;
    } catch (error) {
        console.log(error);
    }
});

const designationSlice = createSlice({
    name: 'designation',
    initialState,
    reducers: {
        addDesignation: (state, { payload }) => {
            state.data.push(payload);
        },
        updateDesignation: (state, { payload }) => {
            const index = state.data.findIndex((designation) => designation._id === payload._id);
            state.data[index] = payload;
        },
        deleteDesignation: (state, { payload }) => {
            const designations = state.data;
            const deleteDesignation = designations.filter((designation) => designation._id !== payload._id);
            state.data = deleteDesignation;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDesignations.fulfilled, (state, { payload }) => {
                state.data = payload;
                state.fetchState = 'idle';
            })
            .addCase(fetchDesignations.pending, (state) => {
                state.fetchState = 'pending';
            })
            .addCase(fetchDesignations.rejected, (state) => {
                state.fetchState = 'error';
            });
    }
});

export const { addDesignation, updateDesignation, deleteDesignation } = designationSlice.actions;

export default designationSlice.reducer;
