import { createSlice } from '@reduxjs/toolkit';
import { GlobalError, ITrackHistory } from '../../types';
import { addTrackToHistory, fetchTrackHistory } from '../thunks/trackHistoryThunk.ts';
import { RootState } from '../../app/store.ts';

interface TrackHistoryState {
  trackHistory: ITrackHistory[];
  historyLoading: boolean;
  historyError: GlobalError | null;
  addLoading: boolean;
  addError: GlobalError | null;
}

const initialState: TrackHistoryState = {
  trackHistory: [],
  historyLoading: false,
  historyError: null,
  addLoading: false,
  addError: null,
};

export const selectTrackHistory = (state: RootState) => state.history.trackHistory;
export const selectHistoryLoading = (state: RootState) => state.history.historyLoading;

const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackHistory.pending, (state) => {
        state.historyLoading = true;
        state.historyError = null;
      })
      .addCase(fetchTrackHistory.fulfilled, (state, {payload: track_history}) => {
        state.historyLoading = false;
        state.trackHistory = track_history;
      })
      .addCase(fetchTrackHistory.rejected, (state, {payload: error}) => {
        state.historyLoading = false;
        state.historyError = error || null;
      })
      .addCase(addTrackToHistory.pending, (state) => {
        state.addLoading = true;
        state.addError = null;
      })
      .addCase(addTrackToHistory.fulfilled, (state) => {
        state.addLoading = false;
      })
      .addCase(addTrackToHistory.rejected, (state, {payload: error}) => {
        state.addLoading = false;
        state.addError = error || null;
      })
  }
});

export const trackHistoryReducer = trackHistorySlice.reducer;