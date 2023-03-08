import { combineReducers, configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationReducer';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import userReducer from './userSlice';
import companyReducer from './companySlice';
import departmentReducer from './departmentSlice';
import usersReducer from './usersSlice';
import designationReducer from './designationSlice';
import { api } from './Services/api';

const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    customization: customizationReducer,
    user: userReducer,
    company: companyReducer,
    department: departmentReducer,
    users: usersReducer,
    designation: designationReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(api.middleware, thunk)
});

export const persistor = persistStore(store);
