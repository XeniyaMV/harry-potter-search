import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from '../pages/mainPage/components/ErrorButton';

describe('ErrorButton', () => {
  it('renders without errors', () => {
    render(<ErrorButton />);
    const buttonElement = screen.getByText(/See Error/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('throws an error when clicked', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<ErrorButton />);

    expect(() => fireEvent.click(screen.getByText(/See Error/i))).toThrow('This is a test error');
  });
});
