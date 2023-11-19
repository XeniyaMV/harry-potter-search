import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MainSection from '../pages/mainPage/components/MainSection';
import { SearchResponse } from '../types';
import { MemoryRouter } from 'react-router-dom';
import mockGetSearchResult from './__mock__/mockGetSearchResult';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('../api/helpers/getSearchResult', () => require('./__mock__/mockGetSearchResult'));
jest.mock('../assets/search.svg', (): void => require('./__mock__/image-search'));
jest.mock('../assets/card-picture.jpg', (): void => require('./__mock__/image-card-picture'));

const mockStore = configureStore([]);

describe('MainSection', () => {
  it('renders MainSection component', async () => {
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
          <MainSection />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const selectElement: HTMLSelectElement | null = screen.getByTestId('select-component').querySelector('select');
      if (selectElement) {
        fireEvent.change(selectElement, { target: { value: 'value' } });
      }
    });

    const mainSectionElement = screen.getByTestId('main-section-component');
    expect(mainSectionElement).toBeInTheDocument();
  });

  it('should set hasNext and hasPrev based on API result', async () => {
    const resultData: SearchResponse = {
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
        current: '/1',
        first: '/1',
        last: '/1',
        self: '/1',
      },
      meta: {
        copyright: '',
        generated_at: '',
        pagination: {
          current: 1,
          first: 1,
          last: 1,
          records: 1,
        },
      },
    };
    mockGetSearchResult.mockReturnValue(resultData);
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
          <MainSection />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const selectElement: HTMLSelectElement | null = screen.getByTestId('select-component').querySelector('select');
      if (selectElement) {
        fireEvent.change(selectElement, { target: { value: 'value' } });
      }
    });

    await waitFor(() => {
      expect(mockGetSearchResult).toHaveBeenCalled();
    });

    expect(screen.getByTestId('pagination-next')).toHaveClass('button_disabled');
    expect(screen.getByTestId('pagination-prev')).toHaveClass('button_disabled');
  });
});
