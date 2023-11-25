import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import SearchInput from '../modules/searchForm/components/SearchInput';

jest.mock('../assets/search.svg', (): void => require('./__mock__/image-search'));

describe('SearchInput', () => {
  it('renders SearchInput component', () => {
    render(<SearchInput />);
    expect(screen.getByTestId('search-input-component')).toBeInTheDocument();
  });

  it('changes input value changes', async () => {
    render(<SearchInput />);
    await waitFor(() =>
      fireEvent.change(screen.getByTestId('input-text'), {
        target: { value: 'testValue' },
      })
    );
    await waitFor(() => expect(screen.getByTestId('input-text').getAttribute('value')).toBe('testValue'));
  });
});
