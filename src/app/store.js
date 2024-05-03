import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer } from 'redux-persist';

import filmsReducer from '../features/films/filmsSlice';
import genresReducer from '../features/genres/genresSlice';
import userReducer from '../features/user/userSlice';

const persistConfig = {
    key: 'root', 
    storage, 
    whitelist: ['user'] 
};

const rootReducer = combineReducers({
    films: filmsReducer,
    genres: genresReducer,
    user: userReducer 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE', 'persist/REGISTER']
            }
        }),
});

    export const persistor = persistStore(store);
