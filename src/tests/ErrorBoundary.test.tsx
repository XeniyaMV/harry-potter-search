import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../modules/errorBoundary';

jest.mock('../assets/alarm-light.svg', (): void => require('./__mock__/image-alarm-light'));

const MockErrorComponent = (): JSX.Element => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child-component">Child Component</div>
      </ErrorBoundary>
    );

    const childComponent = screen.getByTestId('child-component');
    expect(childComponent).toBeInTheDocument();
  });

  it('renders error message and reload button when an error occurs', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <MockErrorComponent />
      </ErrorBoundary>
    );

    const errorMessage = screen.getByText(/Oops... Something went wrong/i);
    const reloadButton = screen.getByText(/Reload page/i);

    expect(errorMessage).toBeInTheDocument();
    expect(reloadButton).toBeInTheDocument();
  });

  it('reloads the page when the reload button is clicked', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <MockErrorComponent />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByText(/Reload page/i);

    fireEvent.click(reloadButton);

    expect(reloadButton).not.toBeInTheDocument();
  });

  it('renders custom error message component when provided', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <MockErrorComponent />
      </ErrorBoundary>
    );

    const customErrorMessage = screen.getByTestId('error-message-component');

    expect(customErrorMessage).toBeInTheDocument();
  });

  it('renders <> when there are no children', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<ErrorBoundary />);

    expect(screen.queryByText(/Oops... Something went wrong/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Reload page/i)).not.toBeInTheDocument();
  });
});
