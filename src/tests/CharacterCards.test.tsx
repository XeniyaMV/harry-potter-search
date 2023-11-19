import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterCards from '../modules/characterCards';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('../assets/card-picture.jpg', (): void => require('./__mock__/image-card-picture'));

const mockStore = configureStore([]);

describe('CharacterCards component', () => {
  it('should render the component onto the screen', () => {
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
          <CharacterCards />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('character-cards-component')).toBeInTheDocument();
  });

  it('renders the correct number of cards when cardInfos are present', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const cards = [
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
    ];

    const store = mockStore({
      searchTerm: {
        value: 'Mocked Search Term',
      },
      cardsPerPage: {
        value: cards,
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <CharacterCards />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByTestId('character-card')).toHaveLength(cards.length);
  });

  it('displays an appropriate message if no cards are present', () => {
    const store = mockStore({
      searchTerm: {
        value: 'Mocked Search Term',
      },
      cardsPerPage: {
        value: [],
      },
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CharacterCards />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.queryByTestId('character-card')).toBeNull();
    expect(screen.getByText("We couldn't find any results for your request. Please try again with different keywords"));
  });

  it('displays a loading indicator while fetching data', async () => {
    const store = mockStore({
      searchTerm: {
        value: 'Mocked Search Term',
      },
      cardsPerPage: {
        value: [],
      },
    });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <CharacterCards loader={true} />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
