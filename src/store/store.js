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
import shiftReducer from './shiftSlice';
import SignUpSlice from './SignUpSlice';
import leaveSlice from './leaveSlice';
import TypesLeaveSlice from './TypesLeaveSlice';
import leavesSlice from './allLeaveSlice';
import AllLeaveAccountSlice from './allLeaveAccount';
import loaderReducer from './loaderSlice';
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
    designation: designationReducer,
    shift: shiftReducer,
    leave: leaveSlice,
    SignUpUser: SignUpSlice,
    leaves: leavesSlice,
    AllLeaveAccount: AllLeaveAccountSlice,
    TypesLeave: TypesLeaveSlice,
    loader: loaderReducer
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
