import { screen, render, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from '../modules/details';
import mockGetCharacterResult from './__mock__/mockGetCharacterResult';

jest.mock('../assets/card-picture.jpg', (): void => require('./__mock__/image-card-picture'));
jest.mock('../api/helpers/getCharacterResult', () => require('./__mock__/mockGetCharacterResult'));

describe('Details', () => {
  it('renders Details component', async () => {
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    const detailsComponent = await screen.findByTestId('details-component');
    expect(detailsComponent).toBeInTheDocument();
  });

  it('displays a loading indicator while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/details/?page=1&details=1']}>
        <Details />
      </MemoryRouter>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    const detailsComponent = await screen.findByTestId('details-component');
    expect(detailsComponent).toBeInTheDocument();
  });

  it('correctly displays the detailed card data', async () => {
    render(
      <MemoryRouter initialEntries={['/details/?page=1&details=1']}>
        <Details />
      </MemoryRouter>
    );
    const detailsComponent = await screen.findByTestId('details-component');
    expect(detailsComponent).toBeInTheDocument();

    expect(screen.getByText('name:')).toBeInTheDocument();
    expect(screen.getByText('height:')).toBeInTheDocument();
    expect(screen.getByText('weight:')).toBeInTheDocument();
    expect(screen.getByText('gender:')).toBeInTheDocument();
    expect(screen.getByText('born:')).toBeInTheDocument();
    expect(screen.getByText('died:')).toBeInTheDocument();
    expect(screen.getByText('hair color:')).toBeInTheDocument();
    expect(screen.getByText('skin color:')).toBeInTheDocument();
    expect(screen.getByText('eye color:')).toBeInTheDocument();
    expect(screen.getByText('marital status:')).toBeInTheDocument();
    expect(screen.getByText('blood status:')).toBeInTheDocument();
    expect(screen.getByText('patronus:')).toBeInTheDocument();
    expect(screen.getByText('species:')).toBeInTheDocument();
    expect(screen.getByText('jobs:')).toBeInTheDocument();
  });

  it('hides when close button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/details/?page=1&details=1']}>
        <Routes>
          <Route path="details" element={<Details />} />
          <Route path="/" element={<main>Test page</main>} />
        </Routes>
      </MemoryRouter>
    );
    const closeElement = await screen.findByTestId('close');
    await waitFor(() => userEvent.click(closeElement));
    expect(screen.queryByTestId('details-component')).toBeNull();
  });

  it('displays message when data not found', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mockGetCharacterResult.mockImplementation(() => {
      throw Error('Error');
    });
    render(
      <MemoryRouter initialEntries={['/details/?page=1&details=1']}>
        <Details />
      </MemoryRouter>
    );
    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });
});
