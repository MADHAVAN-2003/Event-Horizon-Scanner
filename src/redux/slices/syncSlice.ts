import { RootState } from '../store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  isSync: boolean;
};

const initialState: InitialState = {
  isSync: false,
};

export const syncSlice = createSlice({
  initialState,
  name: 'sync',
  reducers: {
    setIsSync: (state, action: PayloadAction<boolean>) => {
      state.isSync = action.payload;
    },
  },
});

export const { setIsSync } = syncSlice.actions;

export const selectSyncState = createSelector(
  [(state: RootState) => state.sync],
  sync => sync.isSync,
);

export default syncSlice.reducer;
