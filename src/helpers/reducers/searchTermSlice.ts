import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchTermState {
  value: string;
}

const initialState: SearchTermState = {
  value: '',
};

const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState,
  reducers: {
    updated(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { updated: searchTermUpdated } = searchTermSlice.actions;
export default searchTermSlice.reducer;
