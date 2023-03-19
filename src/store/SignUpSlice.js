import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    SignUpCache: {
        User: '',
        Company: ''
    }
};
const SignUpSlice = createSlice({
    name: 'SignUp',
    initialState,
    reducers: {
        addCacheData: (state, { payload }) => {
            if (payload.type === 'User') {
                const { type, ...other } = payload;
                state.SignUpCache.User = other;
            }
            if (payload.type === 'company') {
                const { type, ...other } = payload;
                //(other, 'other');
                state.SignUpCache.Company = other;
            }
        },
        deleteCacheData: (state) => {
            state.SignUpCache = {
                User: '',
                Company: ''
            };
        }
    }
});
export const { addCacheData, deleteCacheData } = SignUpSlice.actions;
export default SignUpSlice.reducer;
