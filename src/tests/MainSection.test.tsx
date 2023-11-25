import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from './utils/test-utils';
import apiBase from '../api/constants/apiBase';
import { MemoryRouter } from 'react-router-dom';
import MainSection from '../pages/mainPage/components/MainSection';
import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';

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

describe('MainSection', () => {
  it('renders MainSection component', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    renderWithProviders(
      <MemoryRouter>
        <MainSection />
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
});
