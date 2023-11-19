import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store.ts';

import SearchInput from '../modules/searchForm/components/SearchInput';
jest.mock('../assets/search.svg', (): void => require('./__mock__/image-search'));

describe('SearchInput', () => {
  it('renders SearchInput component', () => {
    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );
    expect(screen.getByTestId('search-input-component')).toBeInTheDocument();
  });

  it('calls updateSearchTerm when input value changes', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );
    await waitFor(() =>
      fireEvent.change(screen.getByTestId('input-text'), {
        target: { value: 'testValue' },
      })
    );
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'searchTerm/updated',
      payload: 'testValue',
    });

    dispatchSpy.mockRestore();
  });
});
