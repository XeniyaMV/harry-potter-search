import { render, screen } from '@testing-library/react';
import Logo from '../UI/logo/Logo';
import { MemoryRouter } from 'react-router-dom';

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
});
