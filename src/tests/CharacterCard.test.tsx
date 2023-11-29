import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from './utils/test-utils';
import { MemoryRouter, Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import CharacterCard from '../components/characterCard/CharacterCard';
import Details from '../modules/details';

import apiBase from '../api/constants/apiBase';
import { CharacterResponse } from '../types';
import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';

jest.mock('../assets/card-picture.jpg', (): void => require('./__mock__/image-card-picture'));

const handlers = [
  http.get(`${apiBase.baseUrl}${apiBase.path}1`, async () => {
    await delay(150);
    const response: CharacterResponse = {
      data: {
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
    };
    return HttpResponse.json(response);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('CharacterCard component', () => {
  const cardInfo = {
    id: '1',
    name: 'Harry James Potter',
    height: '6',
    weight: '170',
    gender: 'male',
    born: '31 july',
    died: null,
    image: null,
  };

  it('should render the component onto the screen', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <CharacterCard cardInfo={cardInfo} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('character-card')).toBeInTheDocument();
    expect(screen.getByTestId('card-info-list')).toBeInTheDocument();
    expect(screen.getByTestId('card-image')).toBeInTheDocument();
  });

  it('renders CharacterCard component with relevant data', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <CharacterCard cardInfo={cardInfo} />
      </MemoryRouter>
    );
    expect(screen.getByText('name:')).toBeInTheDocument();
    expect(screen.getByText('height:')).toBeInTheDocument();
    expect(screen.getByText('weight:')).toBeInTheDocument();
    expect(screen.getByText('gender:')).toBeInTheDocument();
    expect(screen.getByText('born:')).toBeInTheDocument();
    expect(screen.getByText('died:')).toBeInTheDocument();
  });

  it('by clicking on CharacterCard changes url', async () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <CharacterCard cardInfo={cardInfo} />
      </Router>
    );
    fireEvent.click(screen.getByTestId('character-card'));
    expect(history.location.pathname).toBe('/details/');
    expect(history.location.search).toBe('?page=1&details=1');
  });

  it('by clicking on CharacterCard opens a detailed card component and triggers API call', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Routes>
          <Route index element={<CharacterCard cardInfo={cardInfo} />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => userEvent.click(screen.getByTestId('character-card')));

    const detailsComponent = await screen.findByTestId('details-component');
    expect(detailsComponent).toBeInTheDocument();
  });
});
