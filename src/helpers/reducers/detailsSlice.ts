import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DetailsState {
  value: {
    isOpen: boolean;
    id: string;
  };
}

const initialState: DetailsState = {
  value: {
    isOpen: false,
    id: '',
  },
};

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    detailsIdUpdated(state, action: PayloadAction<string>) {
      state.value = {
        id: action.payload,
        isOpen: state.value.isOpen,
      };
    },
    detailsIsOpenUpdated(state, action: PayloadAction<boolean>) {
      state.value = {
        id: state.value.id,
        isOpen: action.payload,
      };
    },
  },
});

export const { detailsIdUpdated, detailsIsOpenUpdated } = detailsSlice.actions;
export default detailsSlice.reducer;
