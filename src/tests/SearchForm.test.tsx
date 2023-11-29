import { screen, waitFor, fireEvent } from '@testing-library/react';

import { renderWithProviders } from './utils/test-utils';
import apiBase from '../api/constants/apiBase';

import { MemoryRouter } from 'react-router-dom';

import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';

import SearchForm from '../modules/searchForm';

jest.mock('../assets/search.svg', (): void => require('./__mock__/image-search'));

const handlers = [
  http.get(`${apiBase.baseUrl}${apiBase.path}`, async () => {
    await delay(150);
    return HttpResponse.json();
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('SearchForm', () => {
  it('renders SearchForm component', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <SearchForm submitTitle="search" />
      </MemoryRouter>
    );
    const searchFormElement = await screen.findByTestId('search-form-component');

    expect(searchFormElement).toBeInTheDocument();
  });

  it('saves entered value to local storage when clicking the Search button', async () => {
    const localStorageSetItemMock = jest.spyOn(Storage.prototype, 'setItem');

    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <SearchForm submitTitle="search" />
      </MemoryRouter>
    );

    const searchFormElement = await screen.findByTestId('search-form-component');
    await waitFor(() =>
      fireEvent.change(screen.getByTestId('input-text'), {
        target: { value: 'testValue' },
      })
    );

    await waitFor(() => fireEvent.submit(searchFormElement));

    expect(localStorageSetItemMock).toHaveBeenCalledWith('searchTerm', 'testValue');
  });

  it('retrieves the value from local storage upon mounting', async () => {
    const localStorageGetItemMock = jest.spyOn(Storage.prototype, 'getItem');

    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <SearchForm submitTitle="search" />
      </MemoryRouter>
    );

    await waitFor(() => expect(localStorageGetItemMock).toHaveBeenCalledWith('searchTerm'));
  });
});
