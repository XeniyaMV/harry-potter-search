import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardInfoResponse } from '../../types';

interface CardsPerPageState {
  value: CardInfoResponse[];
}

const initialState: CardsPerPageState = {
  value: [],
};

const cardsPerPageSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    updated(state, action: PayloadAction<CardInfoResponse[]>) {
      state.value = action.payload;
    },
  },
});

export const { updated: cardsPerPageUpdated } = cardsPerPageSlice.actions;
export default cardsPerPageSlice.reducer;
