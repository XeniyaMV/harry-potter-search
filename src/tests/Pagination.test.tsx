import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import Pagination from '../modules/pagination';
import SearchFormContext from '../contexts/searchFormContext/SearchFormContext';
import { SearchFormContextType } from '../types';

jest.mock('../api/helpers/getSearchResult', () => require('./__mock__/mockGetSearchResult'));

jest.mock('../assets/left-double-arrow.svg', (): void => require('./__mock__/image-pagination'));

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

describe('Pagination', () => {
  it('renders Pagination component', async () => {
    const props = {
      hasNext: true,
      hasPrev: false,
      cardPerPage: '10',
      setHasNext: (value: boolean): void => {
        props.hasNext = value;
      },
      setHasPrev: (value: boolean): void => {
        props.hasPrev = value;
      },
    };
    render(
      <MemoryRouter initialEntries={['/']}>
        <SearchFormContext.Provider value={contextValue}>
          <Pagination
            hasNext={props.hasNext}
            hasPrev={props.hasPrev}
            cardsPerPage={props.cardPerPage}
            setHasNext={props.setHasNext}
            setHasPrev={props.setHasPrev}
          />
        </SearchFormContext.Provider>
      </MemoryRouter>
    );
    const paginationElement = await screen.findByTestId('pagination-component');
    expect(paginationElement).toBeInTheDocument();
  });

  it('updates URL query parameter', async () => {
    const history = createMemoryHistory({ initialEntries: ['/?page=2'] });

    const props = {
      hasNext: true,
      hasPrev: true,
      cardPerPage: '10',
      setHasNext: (value: boolean): void => {
        props.hasNext = value;
      },
      setHasPrev: (value: boolean): void => {
        props.hasPrev = value;
      },
    };
    render(
      <Router location={history.location} navigator={history}>
        <SearchFormContext.Provider value={contextValue}>
          <Pagination
            hasNext={props.hasNext}
            hasPrev={props.hasPrev}
            cardsPerPage={props.cardPerPage}
            setHasNext={props.setHasNext}
            setHasPrev={props.setHasPrev}
          />
        </SearchFormContext.Provider>
      </Router>
    );
    const paginationPrev = await screen.findByTestId('pagination-prev');
    await waitFor(() => userEvent.click(paginationPrev));
    expect(history.location.search).toBe('?page=1');

    const paginationNext = await screen.findByTestId('pagination-next');
    await waitFor(() => userEvent.click(paginationNext));
    expect(history.location.search).toBe('?page=2');
  });
});
