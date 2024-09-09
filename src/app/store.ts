import { configureStore } from '@reduxjs/toolkit';
import searchTermSlice from '../helpers/reducers/searchTermSlice';
import cardsPerPageSlice from '../helpers/reducers/cardsPerPageSlice';
import currentPageSlice from '../helpers/reducers/currentPageSlice';
import pageInfoSlice from '../helpers/reducers/pageInfoSlice';
import detailsSlice from '../helpers/reducers/detailsSlice';
import { apiSlice } from '../api/helpers/apiSlice';

export const store = configureStore({
  reducer: {
    searchTerm: searchTermSlice,
    cardsPerPage: cardsPerPageSlice,
    page: currentPageSlice,
    pageInfo: pageInfoSlice,
    details: detailsSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
