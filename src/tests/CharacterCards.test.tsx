import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from './utils/test-utils';
import { MemoryRouter } from 'react-router-dom';

import { http, HttpResponse, delay } from 'msw';
import { HttpHandler } from 'msw';
import { setupServer } from 'msw/node';
import apiBase from '../api/constants/apiBase';
import CharacterCards from '../modules/characterCards';
import { SearchResponse } from '../types';

jest.mock('../assets/card-picture.jpg', (): void => require('./__mock__/image-card-picture'));

const server = setupServer();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const getHandlers = (testCase: string): HttpHandler[] => {
  switch (testCase) {
    case 'emptyResp':
      return [
        http.get(`${apiBase.baseUrl}${apiBase.path}`, async () => {
          await delay(150);
          const response: SearchResponse = {
            data: [],
            links: {
              current: '/2',
              first: '/1',
              last: '/3',
              self: '/1',
              next: '/3',
              prev: '/1',
            },
            meta: {
              copyright: '',
              generated_at: '',
              pagination: {
                current: 2,
                first: 1,
                last: 3,
                records: 5,
                next: 3,
                prev: 1,
              },
            },
          };
          return HttpResponse.json(response);
        }),
      ];
    case 'respWith1Card':
      return [
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
              last: '/3',
              self: '/1',
              next: '/3',
              prev: '/1',
            },
            meta: {
              copyright: '',
              generated_at: '',
              pagination: {
                current: 2,
                first: 1,
                last: 3,
                records: 5,
                next: 3,
                prev: 1,
              },
            },
          };
          return HttpResponse.json(response);
        }),
      ];
    default:
      return [];
  }
};

describe('CharacterCards component', () => {
  it('should render the component onto the screen', async () => {
    const handlers = getHandlers('respWith1Card');
    server.use(...handlers);
    renderWithProviders(
      <MemoryRouter>
        <CharacterCards />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByTestId('character-cards-component')).toBeInTheDocument());
  });

  it('renders the correct number of cards when cardInfos are present', async () => {
    const handlers = getHandlers('respWith1Card');
    server.use(...handlers);

    renderWithProviders(
      <MemoryRouter>
        <CharacterCards />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getAllByTestId('character-card')).toHaveLength(1));
  });

  it('displays an appropriate message if no cards are present', async () => {
    const handlers = getHandlers('emptyResp');
    server.use(...handlers);
    renderWithProviders(
      <MemoryRouter>
        <CharacterCards />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.queryByTestId('character-card')).toBeNull());
    await waitFor(() =>
      expect(
        screen.getByText("We couldn't find any results for your request. Please try again with different keywords")
      )
    );
  });

  it('displays a loading indicator while fetching data', async () => {
    const handlers = getHandlers('respWith1Card');
    server.use(...handlers);

    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <CharacterCards />
      </MemoryRouter>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
