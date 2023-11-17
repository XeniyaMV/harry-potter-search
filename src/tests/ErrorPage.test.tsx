import { fireEvent, render, screen } from '@testing-library/react';
import ErrorPage from '../pages/errorPage/components/ErrorPage';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

jest.mock('../assets/alarm-light.svg', (): void => require('./__mock__/image-alarm-light'));

describe('ErrorPage', () => {
  it('renders ErrorPage', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('error-page-component')).toBeInTheDocument();
  });

  it('renders ErrorPage with a message and a link to the homepage', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location.pathname} navigator={history}>
        <ErrorPage />
      </Router>
    );

    const errorMessage = screen.getByText(/Oops... Something went wrong/i);
    const backToHomepageLink = screen.getByText(/Back to the homepage/i);

    expect(errorMessage).toBeInTheDocument();
    expect(backToHomepageLink).toBeInTheDocument();
  });

  it('navigates to the homepage when the link is clicked', () => {
    const history = createMemoryHistory({ initialEntries: ['/error'] });

    render(
      <Router location={history.location.pathname} navigator={history}>
        <ErrorPage />
      </Router>
    );

    const backToHomepageLink = screen.getByText(/Back to the homepage/i);
    expect(history.location.pathname).not.toBe('/');

    fireEvent.click(backToHomepageLink);

    expect(history.location.pathname).toBe('/');
  });
});
