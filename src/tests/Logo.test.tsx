import { fireEvent, render, screen } from '@testing-library/react';
import Logo from '../UI/logo/Logo';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('Logo', () => {
  it('renders Logo component', () => {
    const link = '/';
    render(
      <MemoryRouter initialEntries={['/']}>
        <Logo link={link} />
      </MemoryRouter>
    );
    const logoElement = screen.getByTestId('logo-component');
    expect(logoElement).toBeInTheDocument();
  });

  it('renders Logo component witn additional class name', () => {
    const link = '/';
    render(
      <MemoryRouter initialEntries={['/']}>
        <Logo link={link} additionalClassName="custom-class" />
      </MemoryRouter>
    );
    const logoElement = screen.getByTestId('logo-component');
    expect(logoElement).toHaveClass('logo custom-class');
  });

  it('renders the Logo component with provided props', () => {
    const logoProps = {
      link: '/',
      title: 'Home',
      iconUrl: 'path-to-icon.png',
    };

    render(
      <MemoryRouter>
        <Logo {...logoProps} />
      </MemoryRouter>
    );

    const titleElement = screen.getByText('Home');
    const iconElement = screen.getByAltText('logo icon');

    expect(titleElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();

    expect(titleElement).toHaveTextContent('Home');
    expect(iconElement).toHaveAttribute('src', 'path-to-icon.png');
    expect(iconElement).toHaveAttribute('alt', 'logo icon');
  });

  it('navigates to the correct link when clicked', () => {
    const history = createMemoryHistory();

    const logoProps = {
      title: 'My Logo',
      link: '/home',
    };

    render(
      <Router location={history.location} navigator={history}>
        <Logo {...logoProps} />
      </Router>
    );

    const logoElement = screen.getByTestId('logo-component');
    fireEvent.click(logoElement);

    expect(history.location.pathname).toBe('/home');
  });
});
