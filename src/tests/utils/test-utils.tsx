import React, { PropsWithChildren } from 'react';
import { render, RenderResult, Queries } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import type { AppStore, RootState } from '../../app/store';
import cardsPerPageSlice from '../../helpers/reducers/cardsPerPageSlice';
import currentPageSlice from '../../helpers/reducers/currentPageSlice';
import pageInfoSlaice from '../../helpers/reducers/pageInfoSlice';
import searchTermSlice from '../../helpers/reducers/searchTermSlice';
import detailsSlice from '../../helpers/reducers/detailsSlice';
import { apiSlice } from '../../api/helpers/apiSlice';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

type RenderResultWithoutQueries = Omit<RenderResult, keyof Queries>;

interface ReturnType extends RenderResultWithoutQueries {
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      searchTerm: {
        value: '',
      },
      cardsPerPage: {
        value: 5,
      },
      page: {
        value: 1,
      },
      pageInfo: {
        value: {
          hasNextPage: true,
          hasPrevPage: false,
        },
      },
      details: {
        value: {
          id: '',
          isOpen: false,
        },
      },
      [apiSlice.reducerPath]: {
        queries: {},
        mutations: {},
        provided: {},
        subscriptions: {},
        config: {
          refetchOnMountOrArgChange: false,
          refetchOnReconnect: false,
          refetchOnFocus: false,
          reducerPath: 'api',
          online: true,
          focused: true,
          middlewareRegistered: false,
          keepUnusedDataFor: 60, // adjust as needed
        },
      },
    },
    store = configureStore({
      reducer: {
        searchTerm: searchTermSlice,
        cardsPerPage: cardsPerPageSlice,
        page: currentPageSlice,
        pageInfo: pageInfoSlaice,
        details: detailsSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
): ReturnType {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
