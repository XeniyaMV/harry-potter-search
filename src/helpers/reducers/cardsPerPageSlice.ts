import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import limitsPerPage from '../../api/constants/limitsPerPage';

interface CardsPerPageState {
  value: number;
}

const initialState: CardsPerPageState = {
  value: limitsPerPage.opt1,
};

const cardsPerPageSlice = createSlice({
  name: 'cardsPerPage',
  initialState,
  reducers: {
    updated(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
  },
});

export const { updated: cardsPerPageUpdated } = cardsPerPageSlice.actions;
export default cardsPerPageSlice.reducer;
