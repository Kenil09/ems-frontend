import { combineReducers, configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationReducer';
import userReducer from './userSlice';

const rootReducer = combineReducers({
    customization: customizationReducer,
    user: userReducer
});

export const store = configureStore({
    reducer: rootReducer
});
