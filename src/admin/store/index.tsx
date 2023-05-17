import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux';

import type { TypedUseSelectorHook } from 'react-redux';
import type { ThunkAction } from '@reduxjs/toolkit';
import {configureStore} from '@reduxjs/toolkit';
import type {Action} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, undefined, Action<string>>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch = () => useReduxDispatch<AppDispatch>();

export default store;

