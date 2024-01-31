import {  combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import userSlice from '../features/userSlice';
const persistConfig={
    key:'root',
    version:1,
    storage
}
const rootReducer= combineReducers({
    user: userSlice,
})
const persistedReducer= persistReducer(persistConfig,rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    // middleware:[thunk]
})
export default store;
export const persistor= persistStore(store)