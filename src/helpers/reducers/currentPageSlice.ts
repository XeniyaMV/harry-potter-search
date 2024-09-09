import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PageState {
  value: number;
}

const initialState: PageState = {
  value: 1,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    pageUpdated(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
  },
});

export const { pageUpdated } = pageSlice.actions;
export default pageSlice.reducer;
