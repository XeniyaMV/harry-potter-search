import { configureStore } from '@reduxjs/toolkit';
import searchTermSlice from '../helpers/reducers/searchTermSlice';

export const store = configureStore({
  reducer: {
    searchTerm: searchTermSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
