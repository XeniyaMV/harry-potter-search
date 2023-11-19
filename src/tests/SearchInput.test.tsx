import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SearchInput from '../modules/searchForm/components/SearchInput';

jest.mock('../assets/search.svg', (): void => require('./__mock__/image-search'));
const mockStore = configureStore([]);

describe('SearchInput', () => {
  it('renders SearchInput component', () => {
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
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );
    expect(screen.getByTestId('search-input-component')).toBeInTheDocument();
  });

  it('calls updateSearchTerm when input value changes', async () => {
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
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );
    await waitFor(() =>
      fireEvent.change(screen.getByTestId('input-text'), {
        target: { value: 'testValue' },
      })
    );

    expect(store.getActions()).toEqual([
      {
        type: 'searchTerm/updated',
        payload: 'testValue',
      },
    ]);
  });
});
