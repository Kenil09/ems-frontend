import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../service/service';
import { startLoader, endLoader } from './loaderSlice';

const initialState = {
    data: [],
    fetchState: 'idle'
};

export const fetchDepartments = createAsyncThunk('department/fetchDepartments', async (params, { dispatch }) => {
    try {
        dispatch(startLoader());
        const { data } = await apiClient().get('/department');
        dispatch(endLoader());
        return data?.departments;
    } catch (error) {
        console.log(error);
    }
});

const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        addDepartment: (state, { payload }) => {
            state.data.push(payload);
        },
        updateDepartment: (state, { payload }) => {
            const index = state.data.findIndex((department) => department._id === payload._id);
            state.data[index] = payload;
        },
        deleteDepartment: (state, { payload }) => {
            const department = state.data;
            const deleteDepartment = department.filter((department) => department._id !== payload._id);
            state.data = deleteDepartment;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartments.fulfilled, (state, { payload }) => {
                state.data = payload;
                state.fetchState = 'idle';
            })
            .addCase(fetchDepartments.pending, (state) => {
                state.fetchState = 'pending';
            })
            .addCase(fetchDepartments.rejected, (state) => {
                state.fetchState = 'error';
            });
    }
});

export const { addDepartment, updateDepartment, deleteDepartment } = departmentSlice.actions;

export default departmentSlice.reducer;
