import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../service/service';
import { startLoader, endLoader } from './loaderSlice';

const initialState = {
    data: [],
    fetchState: 'idle'
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (companyId, { dispatch }) => {
    try {
        dispatch(startLoader());
        const url = companyId ? `/user?companyId=${companyId}` : `/user`;
        const { data } = await apiClient().get(url);
        dispatch(endLoader());
        return data?.users;
    } catch (error) {
        dispatch(endLoader());
        console.log(error);
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, { payload }) => {
            state.data.push(payload);
        },
        updateUser: (state, { payload }) => {
            const index = state.data.findIndex((user) => user._id === payload._id);
            state.data[index] = payload;
        },
        deleteUser: (state, { payload }) => {
            const users = state.data;
            const deleteUser = users.filter((user) => user._id !== payload._id);
            state.data = deleteUser;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, { payload }) => {
                state.data = payload;
                state.fetchState = 'idle';
            })
            .addCase(fetchUsers.pending, (state) => {
                state.fetchState = 'pending';
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.fetchState = 'error';
            });
    }
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
