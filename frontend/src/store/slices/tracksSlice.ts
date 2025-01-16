import { ITrack } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTracks } from '../thunks/tracksThunk.ts';
import { RootState } from '../../app/store.ts';

interface TracksState {
  tracks: ITrack[];
  tracksLoading: boolean;
  tracksError: boolean;
}

const initialState: TracksState = {
  tracks: [],
  tracksLoading: false,
  tracksError: false,
};

export const selectAllTracks = (state: RootState) => state.tracks.tracks;
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
      });
  }
});

export const tracksReducer = tracksSlice.reducer;