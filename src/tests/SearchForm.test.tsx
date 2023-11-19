import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import SearchForm from '../modules/searchForm';
import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('../api/helpers/getSearchResult', () => require('./__mock__/mockGetSearchResult'));

jest.mock('../assets/search.svg', (): void => require('./__mock__/image-search'));

const mockStore = configureStore([]);

describe('SearchForm', () => {
  it('renders SearchForm component', async () => {
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
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <SearchForm submitTitle="search" />
        </Provider>
      </MemoryRouter>
    );
    const searchFormElement = await screen.findByTestId('search-form-component');

    expect(searchFormElement).toBeInTheDocument();
  });

  it('saves entered value to local storage when clicking the Search button', async () => {
    const localStorageSetItemMock = jest.spyOn(Storage.prototype, 'setItem');
    const setLoader = jest.fn();

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
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <SearchForm submitTitle="search" setLoader={setLoader} />
        </Provider>
      </MemoryRouter>
    );

    const searchFormElement = await screen.findByTestId('search-form-component');

    await waitFor(() => fireEvent.submit(searchFormElement));

    expect(setLoader).toHaveBeenCalledTimes(4);
    expect(localStorageSetItemMock).toHaveBeenCalledWith('searchTerm', 'Mocked Search Term');
  });

  it('retrieves the value from local storage upon mounting', async () => {
    const localStorageGetItemMock = jest.spyOn(Storage.prototype, 'getItem');

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
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <SearchForm submitTitle="search" />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => expect(localStorageGetItemMock).toHaveBeenCalledWith('searchTerm'));
  });
});
