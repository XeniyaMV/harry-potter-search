import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import SearchForm from '../modules/searchForm';
import SearchFormContext from '../contexts/searchFormContext/SearchFormContext';
import { SearchFormContextType } from '../types';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../api/helpers/getSearchResult', () => require('./__mock__/mockGetSearchResult'));

jest.mock('../assets/search.svg', (): void => require('./__mock__/image-search'));

const contextValue: SearchFormContextType = {
  searchTerm: 'harry',
  updateSearchTerm: jest.fn(),
  cardInfos: [
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
  updateCardInfos: jest.fn(),
};

describe('SearchForm', () => {
  it('renders SearchForm component', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SearchFormContext.Provider value={contextValue}>
          <SearchForm submitTitle="search" />
        </SearchFormContext.Provider>
      </MemoryRouter>
    );
    const searchFormElement = await screen.findByTestId('search-form-component');

    expect(searchFormElement).toBeInTheDocument();
  });

  it('saves entered value to local storage when clicking the Search button', async () => {
    const localStorageSetItemMock = jest.spyOn(Storage.prototype, 'setItem');

    const { rerender } = render(
      <MemoryRouter initialEntries={['/']}>
        <SearchFormContext.Provider value={contextValue}>
          <SearchForm submitTitle="search" />
        </SearchFormContext.Provider>
      </MemoryRouter>
    );

    const searchFormElement = await screen.findByTestId('search-form-component');
    await waitFor(() =>
      fireEvent.change(screen.getByTestId('input-text'), {
        target: { value: 'testValue' },
      })
    );
    expect(contextValue.updateSearchTerm).toHaveBeenCalledWith('testValue');
    const newcontextValue = { ...contextValue };
    newcontextValue.searchTerm = 'testValue';
    rerender(
      <MemoryRouter initialEntries={['/']}>
        <SearchFormContext.Provider value={newcontextValue}>
          <SearchForm submitTitle="search" />
        </SearchFormContext.Provider>
      </MemoryRouter>
    );
    console.log(newcontextValue.searchTerm);

    await waitFor(() => fireEvent.submit(searchFormElement));

    expect(localStorageSetItemMock).toHaveBeenCalledWith('searchTerm', 'testValue');
  });

  it('retrieves the value from local storage upon mounting', async () => {
    const localStorageGetItemMock = jest.spyOn(Storage.prototype, 'getItem');

    render(
      <MemoryRouter initialEntries={['/']}>
        <SearchFormContext.Provider value={contextValue}>
          <SearchForm submitTitle="search" />
        </SearchFormContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => expect(localStorageGetItemMock).toHaveBeenCalledWith('searchTerm'));
  });
});
