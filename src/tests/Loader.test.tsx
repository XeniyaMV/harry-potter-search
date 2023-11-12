import { render, screen } from '@testing-library/react';
import Loader from '../UI/loader/Loader';

describe('Loader', () => {
  it('renders Loader component', () => {
    render(<Loader additionalClassName="custom-class" />);
    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toHaveClass('loader custom-class');
  });
});
