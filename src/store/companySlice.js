import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../service/service';

const initialState = {
    data: [],
    fetchState: 'idle'
};

export const fetchCompanies = createAsyncThunk('company/fetchCompany', async (companyId) => {
    let url;
    if (!companyId) {
        url = '/company';
    } else {
        url = `/company/${companyId}`;
    }
    try {
        const { data } = await apiClient().get(url);
        return data?.companies;
    } catch (error) {
        console.log(error);
    }
});

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        addCompany: (state, { payload }) => {
            state.data.push(payload);
        },
        updateCompany: (state, { payload }) => {
            const index = state.data.findIndex((company) => company._id === payload._id);
            state.data[index] = payload;
        },
        deleteCompany: (state, { payload }) => {
            const company = state.data;
            const deleteCompany = company.filter((company) => company._id !== payload._id);
            state.data = deleteCompany;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanies.fulfilled, (state, { payload }) => {
                state.data = payload;
                state.fetchState = 'idle';
            })
            .addCase(fetchCompanies.pending, (state) => {
                state.fetchState = 'pending';
            })
            .addCase(fetchCompanies.rejected, (state) => {
                state.fetchState = 'error';
            });
    }
});

export const { addCompany, updateCompany, deleteCompany } = companySlice.actions;

export default companySlice.reducer;
