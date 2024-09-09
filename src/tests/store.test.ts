import { pageUpdated } from '../helpers/reducers/currentPageSlice';
import { cardsPerPageUpdated } from '../helpers/reducers/cardsPerPageSlice';
import { searchTermUpdated } from '../helpers/reducers/searchTermSlice';
import { pageInfoUpdated } from '../helpers/reducers/pageInfoSlice';
import { detailsIdUpdated } from '../helpers/reducers/detailsSlice';
import { detailsIsOpenUpdated } from '../helpers/reducers/detailsSlice';

import { store } from '../app/store';
import limitsPerPage from '../api/constants/limitsPerPage';

describe('Redux Store', () => {
  it('initial store state', () => {
    expect(store.getState().searchTerm).toEqual({
      value: '',
    });
    expect(store.getState().cardsPerPage).toEqual({
      value: limitsPerPage.opt1,
    });
    expect(store.getState().page).toEqual({
      value: 1,
    });
    expect(store.getState().pageInfo).toEqual({
      value: {
        hasNextPage: false,
        hasPrevPage: false,
      },
    });
  });

  it('dispatch action to update search term', () => {
    store.dispatch(searchTermUpdated('Test Search Term'));
    expect(store.getState().searchTerm).toEqual({
      value: 'Test Search Term',
    });
  });

  it('dispatch action to update page', () => {
    store.dispatch(pageUpdated(2));
    expect(store.getState().page).toEqual({
      value: 2,
    });
  });

  it('dispatch action to update details id', () => {
    store.dispatch(detailsIdUpdated('id'));
    expect(store.getState().details.value.id).toBe('id');
  });

  it('dispatch action to update is details open', () => {
    store.dispatch(detailsIsOpenUpdated(true));
    expect(store.getState().details.value.isOpen).toBe(true);
  });

  it('dispatch action to update pageInfo', () => {
    store.dispatch(
      pageInfoUpdated({
        hasNextPage: true,
        hasPrevPage: true,
      })
    );
    expect(store.getState().pageInfo).toEqual({
      value: {
        hasNextPage: true,
        hasPrevPage: true,
      },
    });
  });

  it('dispatch action to update number of cards per page', () => {
    store.dispatch(cardsPerPageUpdated(limitsPerPage.opt2));
    expect(store.getState().cardsPerPage).toEqual({
      value: limitsPerPage.opt2,
    });
  });
});
