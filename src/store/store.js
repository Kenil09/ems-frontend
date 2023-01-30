import { combineReducers, configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationReducer';
import userReducer from './userSlice';
import companyReducer from './companySlice';

const rootReducer = combineReducers({
    customization: customizationReducer,
    user: userReducer,
    company: companyReducer
});

export const store = configureStore({
    reducer: rootReducer
});
