import { ITrack, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { addTrack, deleteTrack, fetchTracks } from '../thunks/tracksThunk.ts';
import { RootState } from '../../app/store.ts';

interface TracksState {
  tracks: ITrack[];
  track: ITrack | null;
  tracksLoading: boolean;
  tracksError: boolean;
  trackCreating: boolean;
  trackError: ValidationError | null;
}

const initialState: TracksState = {
  tracks: [],
  track: null,
  tracksLoading: false,
  tracksError: false,
  trackCreating: false,
  trackError: null,
};

export const selectAllTracks = (state: RootState) => state.tracks.tracks;
export const selectTrackCreating = (state: RootState) => state.tracks.trackCreating;
export const selectTrackError = (state: RootState) => state.tracks.trackError;
export const selectTracksLoading = (state: RootState) => state.tracks.tracksLoading;

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.tracksLoading = true;
        state.tracksError = false;
      })
      .addCase(fetchTracks.fulfilled, (state, {payload: tracks}) => {
        state.tracksLoading = false;
        state.tracks = tracks;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.tracksLoading = false;
        state.tracksError = true;
      })
      .addCase(addTrack.pending, (state) => {
        state.trackCreating = true;
        state.trackError = null;
      })
      .addCase(addTrack.fulfilled, (state, {payload: track}) => {
        state.trackCreating = false;
        state.track = track;
      })
      .addCase(addTrack.rejected, (state, {payload: error}) => {
        state.trackCreating = false;
        state.trackError = error || null;
      })
      .addCase(deleteTrack.pending, (state) => {
        state.tracksLoading = true;
        state.tracksError = false;
      })
      .addCase(deleteTrack.fulfilled, (state) => {
        state.tracksLoading = false;
      })
      .addCase(deleteTrack.rejected, (state) => {
        state.tracksLoading = false;
        state.tracksError = true;
      });
  }
});

export const tracksReducer = tracksSlice.reducer;