import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import MainPage from '../pages/mainPage/components/MainPage';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('../api/helpers/getSearchResult', () => require('./__mock__/mockGetSearchResult'));
jest.mock('../assets/search.svg', (): void => require('./__mock__/image-search'));
jest.mock('../assets/card-picture.jpg', (): void => require('./__mock__/image-card-picture'));

const mockStore = configureStore([]);

describe('MainPage', () => {
  it('renders MainPage component', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const store = mockStore({
      searchTerm: {
        value: 'Mocked Search Term',
      },
      cardsPerPage: {
        value: [
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
      },
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const selectElement: HTMLSelectElement | null = screen.getByTestId('select-component').querySelector('select');
      if (selectElement) {
        fireEvent.change(selectElement, { target: { value: 'value' } });
      }
    });

    const mainSection = screen.getByTestId('main-section-component');
    const startScreenSection = screen.getByTestId('start-screen-component');

    expect(mainSection).toBeInTheDocument();
    expect(startScreenSection).toBeInTheDocument();
  });
});
