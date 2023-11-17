import { render, screen } from '@testing-library/react';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';

jest.mock('../assets/alarm-light.svg', (): void => require('./__mock__/image-alarm-light'));

describe('ErrorMessage', () => {
  it('renders ErrorMessage component', () => {
    const errorMessageProps = {
      additionalClassName: 'custom-class',
      errorMessage: 'Error',
    };

    render(<ErrorMessage {...errorMessageProps} />);

    const errorMessageComponent = screen.getByTestId('error-message-component');
    expect(errorMessageComponent).toBeInTheDocument();
  });

  it('renders ErrorMessage component with provided props', () => {
    const errorMessageProps = {
      additionalClassName: 'custom-class',
      errorMessage: 'Error',
    };

    render(<ErrorMessage {...errorMessageProps} />);

    const errorMessageComponent = screen.getByTestId('error-message-component');
    const errorMessage = screen.getByText('Error');

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessageComponent).toHaveClass('error custom-class');
    expect(errorMessage).toHaveTextContent('Error');
  });
});
