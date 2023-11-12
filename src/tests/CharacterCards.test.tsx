import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterCards from '../modules/characterCards';
import SearchFormContext from '../contexts/searchFormContext/SearchFormContext';
import { SearchFormContextType } from '../types';

jest.mock('../assets/card-picture.jpg', (): void => require('./__mock__/image-card-picture'));

const contextValue: SearchFormContextType = {
  searchTerm: 'harry',
  updateSearchTerm: () => {},
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
  updateCardInfos: () => {},
};
const contextValueEmpty: SearchFormContextType = {
  searchTerm: ' ',
  updateSearchTerm: () => {},
  cardInfos: [],
  updateCardInfos: () => {},
};

describe('CharacterCards component', () => {
  it('should render the component onto the screen', () => {
    render(
      <MemoryRouter>
        <SearchFormContext.Provider value={contextValue}>
          <CharacterCards />
        </SearchFormContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('character-cards-component')).toBeInTheDocument();
  });

  it('renders the correct number of cards when cardInfos are present', () => {
    render(
      <MemoryRouter>
        <SearchFormContext.Provider value={contextValue}>
          <CharacterCards />
        </SearchFormContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByTestId('character-card')).toHaveLength(contextValue.cardInfos.length);
  });

  it('displays an appropriate message if no cards are present', () => {
    render(
      <MemoryRouter>
        <SearchFormContext.Provider value={contextValueEmpty}>
          <CharacterCards />
        </SearchFormContext.Provider>
      </MemoryRouter>
    );
    expect(screen.queryByTestId('character-card')).toBeNull();
    expect(screen.getByText("We couldn't find any results for your request. Please try again with different keywords"));
  });
});
