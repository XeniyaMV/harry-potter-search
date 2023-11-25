import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';

import { renderWithProviders } from './utils/test-utils';
import apiBase from '../api/constants/apiBase';

import MainPage from '../pages/mainPage/components/MainPage';

jest.mock('../assets/search.svg', (): void => require('./__mock__/image-search'));
jest.mock('../assets/card-picture.jpg', (): void => require('./__mock__/image-card-picture'));

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

describe('MainPage', () => {
  it('renders MainPage component', async () => {
    // jest.spyOn(console, 'error').mockImplementation(() => {});

    renderWithProviders(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    const mainSection = screen.getByTestId('main-section-component');
    const startScreenSection = screen.getByTestId('start-screen-component');

    expect(mainSection).toBeInTheDocument();
    expect(startScreenSection).toBeInTheDocument();
  });
});
