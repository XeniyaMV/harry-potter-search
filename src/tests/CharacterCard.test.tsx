import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import CharacterCard from '../components/characterCard/CharacterCard';
import Details from '../modules/details';
import mockGetCharacterResult from './mockGetCharacterResult';
jest.mock('../assets/card-picture.jpg', (): void => require('./image-card-picture'));

jest.mock('../api/helpers/getCharacterResult', () => require('./mockGetCharacterResult'));

describe('CharacterCard component', () => {
  const cardInfo = {
    id: '1',
    name: 'Harry James Potter',
    height: '6',
    weight: '170',
    gender: 'male',
    born: '31 july',
    died: null,
    image: null,
  };

  it('should render the component onto the screen', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CharacterCard cardInfo={cardInfo} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('character-card')).toBeInTheDocument();
    expect(screen.getByTestId('card-info-list')).toBeInTheDocument();
    expect(screen.getByTestId('card-image')).toBeInTheDocument();
  });

  it('renders CharacterCard component with relevant data', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CharacterCard cardInfo={cardInfo} />
      </MemoryRouter>
    );
    expect(screen.getByText('name:')).toBeInTheDocument();
    expect(screen.getByText('height:')).toBeInTheDocument();
    expect(screen.getByText('weight:')).toBeInTheDocument();
    expect(screen.getByText('gender:')).toBeInTheDocument();
    expect(screen.getByText('born:')).toBeInTheDocument();
    expect(screen.getByText('died:')).toBeInTheDocument();
  });

  it('by clicking on CharacterCard changes url', async () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    render(
      <Router location={history.location} navigator={history}>
        <CharacterCard cardInfo={cardInfo} />
      </Router>
    );
    fireEvent.click(screen.getByTestId('character-card'));
    expect(history.location.pathname).toBe('/details/');
    expect(history.location.search).toBe('?page=1&details=1');
  });

  it('by clicking on CharacterCard opens a detailed card component and triggers API call', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route index element={<CharacterCard cardInfo={cardInfo} />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => userEvent.click(screen.getByTestId('character-card')));

    const detailsComponent = await screen.findByTestId('details-component');
    expect(detailsComponent).toBeInTheDocument();
    expect(mockGetCharacterResult).toHaveBeenCalledTimes(1);
  });
});
