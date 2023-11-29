import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from './utils/test-utils';
import apiBase from '../api/constants/apiBase';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import MainSection from '../pages/mainPage/components/MainSection';
import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';
import { apiSlice } from '../api/helpers/apiSlice';
import userEvent from '@testing-library/user-event';

jest.mock('../assets/search.svg', (): void => require('./__mock__/image-search'));
jest.mock('../assets/card-picture.jpg', (): void => require('./__mock__/image-card-picture'));

const handlers = [
  http.get(`${apiBase.baseUrl}${apiBase.path}`, async () => {
    await delay(150);
    return HttpResponse.json();
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('MainSection', () => {
  it('renders MainSection component', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    renderWithProviders(
      <MemoryRouter>
        <MainSection />
      </MemoryRouter>
    );

    await waitFor(() => {
      const selectElement: HTMLSelectElement | null = screen.getByTestId('select-component').querySelector('select');
      if (selectElement) {
        fireEvent.change(selectElement, { target: { value: 'value' } });
      }
    });

    const mainSectionElement = screen.getByTestId('main-section-component');
    expect(mainSectionElement).toBeInTheDocument();
  });

  it('navigates when detailsIsOpen is true (page is set)', async () => {
    const history = createMemoryHistory({ initialEntries: ['/?page=1&details=1'] });

    const initialStore = {
      searchTerm: {
        value: 'Mocked Search Term',
      },
      page: {
        value: 1,
      },
      pageInfo: {
        value: {
          hasNextPage: true,
          hasPrevPage: true,
        },
      },
      cardsPerPage: {
        value: 10,
      },
      details: {
        value: {
          id: 'id',
          isOpen: true,
        },
      },
      api: {
        queries: {},
        mutations: {},
        provided: {},
        subscriptions: {},
        config: {
          refetchOnMountOrArgChange: false,
          refetchOnReconnect: false,
          refetchOnFocus: false,
          reducerPath: apiSlice.reducerPath,
          online: true,
          focused: true,
          middlewareRegistered: false,
          keepUnusedDataFor: 60,
        },
      },
    };

    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <MainSection />
      </Router>,
      {
        preloadedState: initialStore,
      }
    );

    await waitFor(() => userEvent.click(screen.getByTestId('search-results')));
    expect(history.location.search).toBe('?page=1');
  });

  it('navigates when detailsIsOpen is true (page is not set)', async () => {
    const history = createMemoryHistory({ initialEntries: ['/?details=1'] });

    const initialStore = {
      searchTerm: {
        value: 'Mocked Search Term',
      },
      page: {
        value: 1,
      },
      pageInfo: {
        value: {
          hasNextPage: true,
          hasPrevPage: true,
        },
      },
      cardsPerPage: {
        value: 10,
      },
      details: {
        value: {
          id: 'id',
          isOpen: true,
        },
      },
      api: {
        queries: {},
        mutations: {},
        provided: {},
        subscriptions: {},
        config: {
          refetchOnMountOrArgChange: false,
          refetchOnReconnect: false,
          refetchOnFocus: false,
          reducerPath: apiSlice.reducerPath,
          online: true,
          focused: true,
          middlewareRegistered: false,
          keepUnusedDataFor: 60,
        },
      },
    };

    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <MainSection />
      </Router>,
      {
        preloadedState: initialStore,
      }
    );

    await waitFor(() => userEvent.click(screen.getByTestId('search-results')));
    expect(history.location.search).toBe('?page=1');
  });
});
