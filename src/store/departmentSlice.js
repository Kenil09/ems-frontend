import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../service/service';

const initialState = {
    data: [],
    fetchState: 'idle'
};

export const fetchDepartments = createAsyncThunk('company/fetchCompany', async () => {
    try {
        const { data } = await apiClient().get('/department');
        return data?.departments;
    } catch (error) {
        //(error);
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
