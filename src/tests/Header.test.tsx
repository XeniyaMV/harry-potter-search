import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../modules/header';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

jest.mock('../assets/snitch.png', () => require('./__mock__/image-logo-header'));

describe('Header', () => {
  it('renders Header component', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByTestId('header-component')).toBeInTheDocument();
  });

  it('renders Header component with additional class name', () => {
    const additionalClassName = 'custom-class';
    render(
      <MemoryRouter>
        <Header additionalClassName={additionalClassName} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('header-component')).toHaveClass('header custom-class');
  });

  it('navigates to the homepage when logo clicked', () => {
    const history = createMemoryHistory({ initialEntries: ['/details'] });

    render(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>
    );

    const logoElement = screen.getByTestId('logo-component');
    expect(logoElement).toBeInTheDocument();

    fireEvent.click(logoElement);

    expect(history.location.pathname).toBe('/');
  });
});
