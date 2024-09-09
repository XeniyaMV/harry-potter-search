import { renderWithProviders } from './utils/test-utils';
import { screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from '../modules/details';

import { http, HttpResponse, delay } from 'msw';
import { HttpHandler } from 'msw';
import { setupServer } from 'msw/node';

import apiBase from '../api/constants/apiBase';
import { CharacterResponse } from '../types';

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
          throw new Error('Error');
        }),
      ];
    case 'respWith1Card':
      return [
        http.get(`${apiBase.baseUrl}${apiBase.path}`, async () => {
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
    default:
      return [];
  }
};

describe('Details', () => {
  it('renders Details component', async () => {
    const handlers = getHandlers('respWith1Card');
    server.use(...handlers);
    renderWithProviders(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    const detailsComponent = await screen.findByTestId('details-component');
    expect(detailsComponent).toBeInTheDocument();
  });

  it('displays a loading indicator while fetching data', async () => {
    const handlers = getHandlers('respWith1Card');
    server.use(...handlers);
    renderWithProviders(
      <MemoryRouter initialEntries={['/details/?page=1&details=1']}>
        <Details />
      </MemoryRouter>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    const detailsComponent = await screen.findByTestId('details-component');
    expect(detailsComponent).toBeInTheDocument();
  });

  it('correctly displays the detailed card data', async () => {
    const handlers = getHandlers('respWith1Card');
    server.use(...handlers);
    renderWithProviders(
      <MemoryRouter initialEntries={['/details/?page=1&details=1']}>
        <Details />
      </MemoryRouter>
    );
    const detailsComponent = screen.getByTestId('details-component');
    await waitFor(() => expect(detailsComponent).toBeInTheDocument());

    await waitFor(() => expect(screen.getByText('name:')).toBeInTheDocument());
    expect(screen.getByText('height:')).toBeInTheDocument();
    expect(screen.getByText('weight:')).toBeInTheDocument();
    expect(screen.getByText('gender:')).toBeInTheDocument();
    expect(screen.getByText('born:')).toBeInTheDocument();
    expect(screen.getByText('died:')).toBeInTheDocument();
    expect(screen.getByText('hair color:')).toBeInTheDocument();
    expect(screen.getByText('skin color:')).toBeInTheDocument();
    expect(screen.getByText('eye color:')).toBeInTheDocument();
    expect(screen.getByText('marital status:')).toBeInTheDocument();
    expect(screen.getByText('blood status:')).toBeInTheDocument();
    expect(screen.getByText('patronus:')).toBeInTheDocument();
    expect(screen.getByText('species:')).toBeInTheDocument();
    expect(screen.getByText('jobs:')).toBeInTheDocument();
  });

  it('hides when close button is clicked', async () => {
    const handlers = getHandlers('respWith1Card');
    server.use(...handlers);
    renderWithProviders(
      <MemoryRouter initialEntries={['/details/?page=1&details=1']}>
        <Routes>
          <Route path="details" element={<Details />} />
          <Route path="/" element={<main>Test page</main>} />
        </Routes>
      </MemoryRouter>
    );
    const closeElement = await screen.findByTestId('close');
    await waitFor(() => userEvent.click(closeElement));
    expect(screen.queryByTestId('details-component')).toBeNull();
  });

  it('displays message when data not found', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const handlers = getHandlers('emptyResp');
    server.use(...handlers);
    renderWithProviders(
      <MemoryRouter initialEntries={['/details/?page=1&details=1']}>
        <Details />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText(/Not Found/i)).toBeInTheDocument());
  });
});
