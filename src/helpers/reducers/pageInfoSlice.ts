import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PageInfo {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface PageState {
  value: PageInfo;
}

const initialState: PageState = {
  value: {
    hasNextPage: false,
    hasPrevPage: false,
  },
};

const pageSlice = createSlice({
  name: 'pageInfo',
  initialState,
  reducers: {
    pageInfoUpdated(state, action: PayloadAction<PageInfo>) {
      state.value = action.payload;
    },
  },
});

export const { pageInfoUpdated } = pageSlice.actions;
export default pageSlice.reducer;
