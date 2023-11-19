import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import MainPage from '../pages/mainPage/components/MainPage';
import { MemoryRouter } from 'react-router-dom';
import SearchFormContext from '../contexts/searchFormContext/SearchFormContext';
import { SearchFormContextType } from '../types';
import { Provider } from 'react-redux';
import { store } from '../app/store.ts';

jest.mock('../api/helpers/getSearchResult', () => require('./__mock__/mockGetSearchResult'));
jest.mock('../assets/search.svg', (): void => require('./__mock__/image-search'));
jest.mock('../assets/card-picture.jpg', (): void => require('./__mock__/image-card-picture'));

const contextValue: SearchFormContextType = {
  searchTerm: 'mockedSearchTerm',
  updateSearchTerm: jest.fn(),
  cardInfos: [],
  updateCardInfos: jest.fn(),
};

describe('MainPage', () => {
  it('renders MainPage component', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchFormContext.Provider value={contextValue}>
            <MainPage />
          </SearchFormContext.Provider>
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const selectElement: HTMLSelectElement | null = screen.getByTestId('select-component').querySelector('select');
      if (selectElement) {
        fireEvent.change(selectElement, { target: { value: 'value' } });
      }
    });

    const mainSection = screen.getByTestId('main-section-component');
    const startScreenSection = screen.getByTestId('start-screen-component');

    expect(mainSection).toBeInTheDocument();
    expect(startScreenSection).toBeInTheDocument();
  });
});
