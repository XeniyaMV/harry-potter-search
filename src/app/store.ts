import { configureStore } from '@reduxjs/toolkit';
import searchTermSlice from '../helpers/reducers/searchTermSlice';
import cardsPerPageSlice from '../helpers/reducers/cardsPerPageSlice';

export const store = configureStore({
  reducer: {
    searchTerm: searchTermSlice,
    cardsPerPage: cardsPerPageSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
