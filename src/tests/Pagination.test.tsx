import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';

import { SearchResponse } from '../types';
import { renderWithProviders } from './utils/test-utils';
import { apiSlice } from '../api/helpers/apiSlice';
import apiBase from '../api/constants/apiBase';

import Pagination from '../modules/pagination';

jest.mock('../assets/left-double-arrow.svg', (): void => require('./__mock__/image-pagination'));

const handlers = [
  http.get(`${apiBase.baseUrl}${apiBase.path}`, async () => {
    await delay(150);
    const response: SearchResponse = {
      data: [
        {
          id: '1',
          type: 'character',
          attributes: {
            alias_names: ['Harry'],
            animagus: null,
            blood_status: 'pure',
            boggart: 'dementor',
            born: '31 july',
            died: null,
            eye_color: 'green',
            family_members: null,
            marital_status: 'married',
            gender: 'male',
            hair_color: 'brown',
            height: '6',
            house: 'Grifindor',
            image: null,
            jobs: null,
            name: 'Harry James Potter',
            nationality: null,
            patronus: 'dear',
            romances: null,
            skin_color: null,
            slug: null,
            species: 'Human',
            titles: null,
            wand: null,
            weight: '170',
            wiki: null,
          },
        },
      ],
      links: {
        current: '/2',
        first: '/1',
        last: '/2',
        self: '/1',
        prev: '/1',
      },
      meta: {
        copyright: '',
        generated_at: '',
        pagination: {
          current: 2,
          first: 1,
          last: 2,
          records: 2,
          prev: 1,
        },
      },
    };
    return HttpResponse.json(response);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Pagination', () => {
  it('renders Pagination component', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Pagination />
      </MemoryRouter>
    );
    const paginationElement = await screen.findByTestId('pagination-component');
    expect(paginationElement).toBeInTheDocument();
  });

  it('updates URL query parameter', async () => {
    const history = createMemoryHistory({ initialEntries: ['/?page=2&details=1'] });
    const initialStore = {
      searchTerm: {
        value: 'Mocked Search Term',
      },
      page: {
        value: 2,
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
          id: '',
          isOpen: false,
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
        <Pagination />
      </Router>,
      {
        preloadedState: initialStore,
      }
    );
    const paginationPrev = await screen.findByTestId('pagination-prev');
    await userEvent.click(paginationPrev);
    expect(history.location.search).toBe('?page=1&details=1');

    const paginationNext = await screen.findByTestId('pagination-next');
    await userEvent.click(paginationNext);
    expect(history.location.search).toBe('?page=2&details=1');
  });

  it('handles click events', async () => {
    const history = createMemoryHistory({ initialEntries: ['/?page=1'] });
    const initialStore = {
      searchTerm: {
        value: 'Mocked Search Term',
      },
      page: {
        value: 2,
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
          id: '',
          isOpen: false,
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
        <Pagination />
      </Router>,
      {
        preloadedState: initialStore,
      }
    );

    const pageNumberElement = screen.getByTestId('page-number');
    const paginationPrev = await screen.findByTestId('pagination-prev');
    await userEvent.click(paginationPrev);
    expect(pageNumberElement).toHaveTextContent('1');

    const paginationNext = await screen.findByTestId('pagination-next');
    await userEvent.click(paginationNext);
    expect(pageNumberElement).toHaveTextContent('2');
  });
});
