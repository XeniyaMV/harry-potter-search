import { screen, render, waitFor, fireEvent } from '@testing-library/react';

import SearchInput from '../modules/searchForm/components/SearchInput';
import SearchFormContext from '../contexts/searchFormContext/SearchFormContext';
import { SearchFormContextType } from '../types';

jest.mock('../assets/search.svg', (): void => require('./__mock__/image-search'));

const contextValue: SearchFormContextType = {
  searchTerm: 'harry',
  updateSearchTerm: jest.fn(() => {}),
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

describe('SearchInput', () => {
  it('renders SearchInput component', () => {
    render(
      <SearchFormContext.Provider value={contextValue}>
        <SearchInput />
      </SearchFormContext.Provider>
    );
    expect(screen.getByTestId('search-input-component')).toBeInTheDocument();
  });

  it('calls updateSearchTerm when input value changes', async () => {
    render(
      <SearchFormContext.Provider value={contextValue}>
        <SearchInput />
      </SearchFormContext.Provider>
    );
    await waitFor(() =>
      fireEvent.change(screen.getByTestId('input-text'), {
        target: { value: 'testValue' },
      })
    );

    expect(contextValue.updateSearchTerm).toHaveBeenCalledWith('testValue');
  });
});
